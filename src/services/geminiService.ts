import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiGenerationRequest, GeneratedContent, SectionType } from '../types';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string | null = null;

  initialize(apiKey: string) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  isInitialized(): boolean {
    return this.genAI !== null && this.apiKey !== null;
  }

  async generateContent(request: GeminiGenerationRequest): Promise<GeneratedContent> {
    if (!this.genAI) {
      throw new Error('Gemini API not initialized. Please provide an API key.');
    }

    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = this.buildPrompt(request);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeneratedContent(text, request.sectionType);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate content. Please check your API key and try again.');
    }
  }

  private buildPrompt(request: GeminiGenerationRequest): string {
    const {
      prompt,
      sectionType,
      brandInfo,
      targetAudience,
      campaignGoal,
      funnelStage
    } = request;

    let systemPrompt = `You are an expert copywriter for PPC landing pages. `;
    
    if (brandInfo) {
      systemPrompt += `Brand information: ${brandInfo}. `;
    }
    
    if (targetAudience) {
      systemPrompt += `Target audience: ${targetAudience}. `;
    }
    
    if (campaignGoal) {
      systemPrompt += `Campaign goal: ${campaignGoal}. `;
    }
    
    if (funnelStage) {
      systemPrompt += `Funnel stage: ${funnelStage}. `;
    }

    const sectionSpecificInstructions = this.getSectionInstructions(sectionType);
    
    return `${systemPrompt}

${sectionSpecificInstructions}

User request: ${prompt}

Please provide the content in a structured JSON format that matches the expected output for this section type. Be persuasive, compelling, and focus on conversion optimization.`;
  }

  private getSectionInstructions(sectionType: SectionType): string {
    const instructions = {
      hero: `Create a hero section with:
- A compelling headline (max 60 characters)
- A supporting subheadline (max 120 characters)
- A brief description/value proposition
- A strong call-to-action button text

Format as JSON: {"headline": "...", "subheadline": "...", "body": "...", "cta": "..."}`,

      features: `Create a features section with:
- A section headline
- 3-6 key features with brief descriptions
- Each feature should highlight a benefit

Format as JSON: {"headline": "...", "features": [{"title": "...", "description": "..."}]}`,

      testimonials: `Create testimonials with:
- A section headline
- 2-4 customer testimonials
- Each with customer name, role/company, and testimonial text

Format as JSON: {"headline": "...", "testimonials": [{"name": "...", "role": "...", "content": "..."}]}`,

      faq: `Create an FAQ section with:
- A section headline
- 4-8 frequently asked questions with answers
- Focus on common objections and concerns

Format as JSON: {"headline": "...", "faqs": [{"question": "...", "answer": "..."}]}`,

      cta: `Create a call-to-action section with:
- A compelling headline
- Supporting text that creates urgency
- A strong call-to-action button text

Format as JSON: {"headline": "...", "body": "...", "cta": "..."}`,

      credibility: `Create a credibility section with:
- A headline about trust/credibility
- Text highlighting awards, certifications, or social proof
- Suggested credibility elements

Format as JSON: {"headline": "...", "body": "...", "elements": ["Award 1", "Certification 2", "..."]}`,

      leadform: `Create a lead generation form with:
- A compelling headline
- Form description/value proposition
- Suggested form fields
- Submit button text

Format as JSON: {"headline": "...", "body": "...", "fields": ["Name", "Email", "..."], "cta": "..."}`,

      quiz: `Create a quiz funnel with:
- A compelling quiz title
- Introduction text
- 3-5 quiz questions with multiple choice answers
- Result categories

Format as JSON: {"headline": "...", "body": "...", "questions": [{"question": "...", "answers": ["A", "B", "C"]}]}`,
    };

    return instructions[sectionType] || instructions.hero;
  }

  private parseGeneratedContent(text: string, sectionType: SectionType): GeneratedContent {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
    } catch (error) {
      console.warn('Failed to parse JSON from Gemini response, using fallback parsing');
    }

    // Fallback parsing for non-JSON responses
    return this.fallbackParse(text, sectionType);
  }

  private fallbackParse(text: string, sectionType: SectionType): GeneratedContent {
    const lines = text.split('\n').filter(line => line.trim());
    
    switch (sectionType) {
      case 'hero':
        return {
          headline: lines[0] || 'Generated Headline',
          subheadline: lines[1] || 'Generated Subheadline',
          body: lines.slice(2, -1).join(' ') || 'Generated body text',
          cta: lines[lines.length - 1] || 'Get Started',
        };
      
      case 'faq':
        const faqs = [];
        for (let i = 0; i < lines.length - 1; i += 2) {
          if (lines[i] && lines[i + 1]) {
            faqs.push({
              question: lines[i].replace(/^Q:?\s*/, ''),
              answer: lines[i + 1].replace(/^A:?\s*/, ''),
            });
          }
        }
        return { faqs };
      
      default:
        return {
          headline: lines[0] || 'Generated Content',
          body: lines.slice(1).join(' ') || 'Generated body text',
        };
    }
  }

  async regenerateSection(
    sectionId: string,
    sectionType: SectionType,
    customPrompt?: string,
    context?: {
      brandInfo?: string;
      targetAudience?: string;
      campaignGoal?: string;
      funnelStage?: 'awareness' | 'consideration' | 'conversion' | 'retention';
    }
  ): Promise<GeneratedContent> {
    const defaultPrompt = `Regenerate content for a ${sectionType} section. Make it fresh and engaging while maintaining conversion focus.`;
    
    const request: GeminiGenerationRequest = {
      prompt: customPrompt || defaultPrompt,
      sectionType,
      ...context,
    };

    return this.generateContent(request);
  }

  async generateVariations(
    originalContent: GeneratedContent,
    sectionType: SectionType,
    count: number = 3
  ): Promise<GeneratedContent[]> {
    if (!this.genAI) {
      throw new Error('Gemini API not initialized');
    }

    const variations: GeneratedContent[] = [];
    const originalText = JSON.stringify(originalContent);

    for (let i = 0; i < count; i++) {
      const prompt = `Create a variation of this ${sectionType} content: ${originalText}. 
      Make it different but equally compelling for conversion. Maintain the same structure but change the messaging, tone, or approach.`;

      const request: GeminiGenerationRequest = {
        prompt,
        sectionType,
      };

      try {
        const variation = await this.generateContent(request);
        variations.push(variation);
      } catch (error) {
        console.error(`Failed to generate variation ${i + 1}:`, error);
      }
    }

    return variations;
  }
}

export const geminiService = new GeminiService();