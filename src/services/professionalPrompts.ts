// Professional AI prompts based on copywriting best practices and funnel stages

export interface CampaignConfig {
  targetAudience: string;
  productOffer: string;
  funnelStage: 'awareness' | 'consideration' | 'conversion' | 'retention';
  campaignGoal: string;
  keyBenefits: string;
  painPoints: string;
  copywritingStrategy: 'direct-response' | 'story-driven' | 'problem-solution' | 'benefit-focused' | 'social-proof';
  brandVoice: 'professional' | 'friendly' | 'urgent' | 'casual' | 'authoritative';
}

const getFunnelStageGuidelines = (stage: string) => {
  switch (stage) {
    case 'awareness':
      return {
        focus: 'Education and problem identification',
        tone: 'Informative, helpful, non-pushy',
        cta: 'Learn more, discover, explore',
        length: 'Detailed explanations, comprehensive coverage'
      };
    case 'consideration':
      return {
        focus: 'Solution comparison and evaluation',
        tone: 'Trustworthy, expert, comparative',
        cta: 'Compare, try, demo, evaluate',
        length: 'Detailed features, comparisons, case studies'
      };
    case 'conversion':
      return {
        focus: 'Decision making and action',
        tone: 'Confident, clear, urgent',
        cta: 'Buy now, get started, sign up, purchase',
        length: 'Concise value propositions, clear benefits'
      };
    case 'retention':
      return {
        focus: 'Maximizing value and satisfaction',
        tone: 'Supportive, encouraging, loyal',
        cta: 'Upgrade, refer, maximize, optimize',
        length: 'Value-focused, relationship building'
      };
    default:
      return {
        focus: 'Decision making and action',
        tone: 'Confident, clear, urgent',
        cta: 'Get started, sign up, try now',
        length: 'Concise value propositions, clear benefits'
      };
  }
};

const getCopywritingStrategyGuidelines = (strategy: string) => {
  switch (strategy) {
    case 'direct-response':
      return 'Use clear, action-oriented language. Focus on immediate benefits and create urgency. Include specific numbers and results.';
    case 'story-driven':
      return 'Tell a compelling narrative. Use customer journey stories. Connect emotionally before presenting solutions.';
    case 'problem-solution':
      return 'Start with pain points. Agitate the problem. Present your solution as the perfect answer.';
    case 'benefit-focused':
      return 'Lead with outcomes. Focus on what customers gain. Translate features into meaningful benefits.';
    case 'social-proof':
      return 'Use testimonials and case studies. Include numbers and statistics. Show peer validation and success stories.';
    default:
      return 'Use clear, benefit-focused language that drives action.';
  }
};

export const generateHeroPrompt = (config: CampaignConfig) => {
  const guidelines = getFunnelStageGuidelines(config.funnelStage);
  const copyStrategy = getCopywritingStrategyGuidelines(config.copywritingStrategy);
  
  return `Create a high-converting hero section following ${config.funnelStage} stage best practices.

CAMPAIGN DETAILS:
- Target Audience: ${config.targetAudience}
- Product/Offer: ${config.productOffer}
- Funnel Stage: ${config.funnelStage}
- Goal: ${config.campaignGoal}
- Brand Voice: ${config.brandVoice}
- Key Benefits: ${config.keyBenefits}
- Pain Points: ${config.painPoints}

COPYWRITING STRATEGY: ${copyStrategy}

HERO SECTION REQUIREMENTS:
- Headline: Maximum 8 words, clear value proposition, ${guidelines.tone}
- Subheadline: 12-15 words, expand on headline, address main benefit
- Body: 25-35 words maximum, focus on ${guidelines.focus}
- CTA: 2-3 words, action-oriented: ${guidelines.cta}

FOCUS: ${guidelines.focus}
TONE: ${guidelines.tone}

Return JSON format:
{
  "headline": "Clear 5-8 word value proposition",
  "subheadline": "12-15 word benefit statement",
  "body": "25-35 word description focused on outcome",
  "cta": "2-3 word action button"
}`;
};

export const generateFeaturesPrompt = (config: CampaignConfig) => {
  const guidelines = getFunnelStageGuidelines(config.funnelStage);
  const copyStrategy = getCopywritingStrategyGuidelines(config.copywritingStrategy);
  
  return `Create a professional features section for ${config.funnelStage} stage landing page.

CAMPAIGN CONTEXT:
- Target Audience: ${config.targetAudience}
- Product: ${config.productOffer}
- Key Benefits: ${config.keyBenefits}
- Brand Voice: ${config.brandVoice}

COPYWRITING STRATEGY: ${copyStrategy}

REQUIREMENTS:
- Headline: 4-6 words, benefit-focused
- Exactly 3 features
- Each feature title: 3-4 words maximum
- Each description: 15-20 words, benefit-focused
- Focus on ${guidelines.focus}

Return JSON:
{
  "headline": "Short benefit headline",
  "features": [
    {"title": "Benefit 1", "description": "15-20 word benefit description"},
    {"title": "Benefit 2", "description": "15-20 word benefit description"},
    {"title": "Benefit 3", "description": "15-20 word benefit description"}
  ]
}`;
};

export const generateHowItWorksPrompt = (config: CampaignConfig) => {
  const guidelines = getFunnelStageGuidelines(config.funnelStage);
  
  return `Create a sophisticated "How It Works" section with exactly 3 steps.

CAMPAIGN CONTEXT:
- Product: ${config.productOffer}
- Target Audience: ${config.targetAudience}
- Funnel Stage: ${config.funnelStage}
- Copywriting Strategy: ${getCopywritingStrategyGuidelines(config.copywritingStrategy)}

STRICT REQUIREMENTS:
- Headline: "How It Works" or similar (3-4 words maximum)
- EXACTLY 3 steps only, numbered 1-3
- Each step title: 3-4 words maximum, action-oriented
- Each description: EXACTLY 18-22 words (count carefully for consistency)
- Focus on process simplicity and clear outcomes
- Use strong action verbs (Start, Configure, Launch, Get, Receive, etc.)
- Make each step feel achievable and sequential
- Tone: ${guidelines.tone}

WORD COUNT VALIDATION:
- Step 1 description: 18-22 words exactly
- Step 2 description: 18-22 words exactly  
- Step 3 description: 18-22 words exactly

Return JSON:
{
  "headline": "How It Works",
  "subheadline": "Simple process, powerful results in just three easy steps",
  "steps": [
    {"title": "Get Started", "description": "Exactly 18-22 word description explaining the first step clearly and simply", "number": 1},
    {"title": "Configure Setup", "description": "Exactly 18-22 word description explaining the second step process and benefits", "number": 2},
    {"title": "Launch Results", "description": "Exactly 18-22 word description explaining the final step and expected outcomes", "number": 3}
  ]
}`;
};

export const generateTestimonialsPrompt = (config: CampaignConfig) => {
  return `Create 3 customer testimonials for ${config.productOffer}.

TARGET AUDIENCE: ${config.targetAudience}
BENEFITS TO HIGHLIGHT: ${config.keyBenefits}
COPYWRITING STRATEGY: ${getCopywritingStrategyGuidelines(config.copywritingStrategy)}

REQUIREMENTS:
- Headline: 4-5 words, compelling and trust-building
- Subheadline: Optional 8-12 word supporting statement
- 3 testimonials with realistic names and job titles
- Each testimonial: 25-35 words with specific results/outcomes
- Mix of different customer types within target audience
- All 5-star ratings
- MUST include realistic face avatars from different demographics
- Include measurable results when possible (%, $, time saved, etc.)

Return JSON:
{
  "headline": "What Customers Say",
  "subheadline": "Join thousands of satisfied customers worldwide",
  "testimonials": [
    {
      "name": "Sarah Johnson",
      "role": "Marketing Director",
      "company": "TechStart Solutions",
      "content": "25-35 word testimonial highlighting specific measurable results and positive outcomes",
      "rating": 5,
      "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      "name": "Michael Chen",
      "role": "Small Business Owner", 
      "company": "Local Services Co",
      "content": "25-35 word testimonial focusing on transformation and business impact with numbers",
      "rating": 5,
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      "name": "Emma Rodriguez",
      "role": "Operations Manager",
      "company": "Growth Industries",
      "content": "25-35 word testimonial emphasizing ease of use and time savings with specific metrics",
      "rating": 5,
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]
}`;
};

export const generateFAQPrompt = (config: CampaignConfig) => {
  const guidelines = getFunnelStageGuidelines(config.funnelStage);
  
  return `Create 5 frequently asked questions for ${config.productOffer}.

TARGET AUDIENCE: ${config.targetAudience}
PAIN POINTS TO ADDRESS: ${config.painPoints}
FUNNEL STAGE: ${config.funnelStage}

REQUIREMENTS:
- Headline: "Frequently Asked Questions" or similar
- 5 questions addressing common concerns
- Questions: 6-10 words each
- Answers: 30-40 words each, ${guidelines.tone}
- Address objections and concerns
- Focus on ${guidelines.focus}

Return JSON:
{
  "headline": "Frequently Asked Questions",
  "faqs": [
    {"question": "6-10 word question", "answer": "30-40 word helpful answer"},
    {"question": "6-10 word question", "answer": "30-40 word helpful answer"},
    {"question": "6-10 word question", "answer": "30-40 word helpful answer"},
    {"question": "6-10 word question", "answer": "30-40 word helpful answer"},
    {"question": "6-10 word question", "answer": "30-40 word helpful answer"}
  ]
}`;
};

export const generateComparisonPrompt = (config: CampaignConfig) => {
  return `Create a professional comparison for ${config.productOffer} vs competitors.

TARGET AUDIENCE: ${config.targetAudience}
KEY BENEFITS: ${config.keyBenefits}
COPYWRITING STRATEGY: ${getCopywritingStrategyGuidelines(config.copywritingStrategy)}

REQUIREMENTS:
- Headline: 4-5 words, competitive and confident
- Subheadline: 8-12 words showing clear advantage
- Your brand vs 2 realistic competitors
- 5-6 meaningful comparison features that matter to ${config.targetAudience}
- Highlight clear advantages for your solution
- Use boolean true/false or specific descriptive values
- Make your solution clearly superior but realistic
- Focus on benefits that align with ${config.keyBenefits}

Return JSON:
{
  "headline": "How We Compare",
  "subheadline": "See why customers choose us over the competition",
  "ourBrand": "${config.productOffer}",
  "competitor1": "Industry Leader A",
  "competitor2": "Popular Alternative B",
  "features": [
    {"name": "Setup Time", "us": "5 minutes", "competitor1": "2-3 days", "competitor2": "1 week"},
    {"name": "24/7 Support", "us": true, "competitor1": false, "competitor2": true},
    {"name": "Mobile App", "us": true, "competitor1": true, "competitor2": false},
    {"name": "Price Point", "us": "Affordable", "competitor1": "Expensive", "competitor2": "Mid-range"},
    {"name": "Free Trial", "us": true, "competitor1": false, "competitor2": false},
    {"name": "Integration", "us": "100+ apps", "competitor1": "50+ apps", "competitor2": "20+ apps"}
  ],
  "highlight": "us"
}`;
};

export const generateCTAPrompt = (config: CampaignConfig) => {
  const guidelines = getFunnelStageGuidelines(config.funnelStage);
  
  return `Create a compelling call-to-action section for ${config.funnelStage} stage.

CAMPAIGN GOAL: ${config.campaignGoal}
PRODUCT: ${config.productOffer}
TARGET AUDIENCE: ${config.targetAudience}

REQUIREMENTS:
- Headline: 4-6 words, urgency and value
- Body: 20-30 words, reinforce benefit
- CTA Button: 2-3 words, ${guidelines.cta}
- Tone: ${guidelines.tone}

Return JSON:
{
  "headline": "Ready to Get Started?",
  "body": "20-30 word compelling reason to take action now",
  "cta": "${guidelines.cta.split(',')[0].trim()}"
}`;
};