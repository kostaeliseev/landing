import React, { useState } from 'react';
import { X, Save, RefreshCw, Wand2 } from 'lucide-react';
import type { LandingPageSection } from '../stores/landingPageStore';
import { simpleGeminiService } from '../services/geminiService.simple';

interface SectionEditorProps {
  section: LandingPageSection;
  isOpen: boolean;
  onClose: () => void;
  onSave: (sectionId: string, updates: any) => void;
}

export function SectionEditor({ section, isOpen, onClose, onSave }: SectionEditorProps) {
  const [data, setData] = useState(section.data);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(section.id, { data });
    onClose();
  };

  const handleRegenerate = async () => {
    const apiKey = localStorage.getItem('geminiApiKey');
    if (!apiKey) {
      alert('Please set up your Gemini API key first');
      return;
    }

    setIsRegenerating(true);
    try {
      simpleGeminiService.initialize(apiKey);
      
      let prompt = '';
      switch (section.type) {
        case 'hero':
          prompt = `Regenerate this hero section with fresh, compelling content. Make it conversion-focused.
          Return JSON: {"headline": "new headline", "subheadline": "new subheadline", "body": "new description", "cta": "new button text"}`;
          break;
        case 'features':
          prompt = `Create new features for this section. Make them compelling and benefit-focused.
          Return JSON: {"headline": "new features headline", "features": [{"title": "Feature 1", "description": "description"}, {"title": "Feature 2", "description": "description"}, {"title": "Feature 3", "description": "description"}]}`;
          break;
        case 'testimonials':
          prompt = `Generate new customer testimonials. Make them authentic and specific.
          Return JSON: {"headline": "testimonials headline", "testimonials": [{"name": "Customer Name", "role": "Job Title", "company": "Company", "content": "testimonial", "rating": 5}]}`;
          break;
        case 'faq':
          prompt = `Create new FAQ questions and answers. Address common customer concerns.
          Return JSON: {"headline": "FAQ headline", "faqs": [{"question": "question", "answer": "detailed answer"}]}`;
          break;
        case 'cta':
          prompt = `Create a compelling call-to-action section with urgency and value.
          Return JSON: {"headline": "CTA headline", "body": "urgency text", "cta": "action button"}`;
          break;
        case 'pricing':
          prompt = `Create pricing plans for this product/service. Make them compelling with clear value.
          Return JSON: {"headline": "pricing headline", "plans": [{"name": "Basic", "price": "$29", "period": "/month", "features": ["feature 1", "feature 2"], "cta": "Get Started", "popular": false}, {"name": "Pro", "price": "$79", "period": "/month", "features": ["everything in basic", "advanced features"], "cta": "Get Started", "popular": true}]}`;
          break;
        case 'video':
          prompt = `Create a video section with compelling headline and description.
          Return JSON: {"headline": "video section headline", "videoUrl": "https://www.youtube.com/embed/VIDEO_ID", "description": "compelling description of what viewers will learn"}`;
          break;
        case 'leadform':
          prompt = `Create a lead generation form with compelling headline and proper form fields.
          Return JSON: {"headline": "Get Started Today", "subheadline": "compelling subheadline", "fields": [{"id": "name", "type": "text", "label": "Full Name", "placeholder": "Enter your name", "required": true}, {"id": "email", "type": "email", "label": "Email", "placeholder": "Enter your email", "required": true}], "submitButton": "Get Started", "successMessage": "Thank you for your interest!", "style": {"layout": "single-column", "theme": "boxed"}}`;
          break;
        default:
          prompt = `Regenerate this ${section.type} section with improved content.`;
      }

      const newContent = await simpleGeminiService.generateContent(prompt);
      setData({ ...data, ...newContent });
      alert('Section regenerated successfully! 🎉');
    } catch (error) {
      console.error('Regeneration failed:', error);
      alert('Failed to regenerate content. Please try again.');
    }
    setIsRegenerating(false);
  };

  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your compelling headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Subheadline</label>
              <input
                type="text"
                value={data.subheadline || ''}
                onChange={(e) => setData({ ...data, subheadline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Supporting subheadline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Body Text</label>
              <textarea
                value={data.body || ''}
                onChange={(e) => setData({ ...data, body: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="Brief description or value proposition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Call-to-Action Button</label>
              <input
                type="text"
                value={data.cta || ''}
                onChange={(e) => setData({ ...data, cta: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Get Started"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Section Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Features headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Features</label>
              {(data.features || []).map((feature: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Feature title"
                      value={feature.title || ''}
                      onChange={(e) => {
                        const newFeatures = [...(data.features || [])];
                        newFeatures[index] = { ...feature, title: e.target.value };
                        setData({ ...data, features: newFeatures });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Feature description"
                      value={feature.description || ''}
                      onChange={(e) => {
                        const newFeatures = [...(data.features || [])];
                        newFeatures[index] = { ...feature, description: e.target.value };
                        setData({ ...data, features: newFeatures });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newFeatures = (data.features || []).filter((_: any, i: number) => i !== index);
                      setData({ ...data, features: newFeatures });
                    }}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove Feature
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newFeatures = [...(data.features || []), { title: '', description: '' }];
                  setData({ ...data, features: newFeatures });
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                + Add Feature
              </button>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Section Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Testimonials headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Testimonials</label>
              {(data.testimonials || []).map((testimonial: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Customer name"
                      value={testimonial.name || ''}
                      onChange={(e) => {
                        const newTestimonials = [...(data.testimonials || [])];
                        newTestimonials[index] = { ...testimonial, name: e.target.value };
                        setData({ ...data, testimonials: newTestimonials });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Job title"
                      value={testimonial.role || ''}
                      onChange={(e) => {
                        const newTestimonials = [...(data.testimonials || [])];
                        newTestimonials[index] = { ...testimonial, role: e.target.value };
                        setData({ ...data, testimonials: newTestimonials });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    placeholder="Testimonial content"
                    value={testimonial.content || ''}
                    onChange={(e) => {
                      const newTestimonials = [...(data.testimonials || [])];
                      newTestimonials[index] = { ...testimonial, content: e.target.value };
                      setData({ ...data, testimonials: newTestimonials });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  />
                  <button
                    onClick={() => {
                      const newTestimonials = (data.testimonials || []).filter((_: any, i: number) => i !== index);
                      setData({ ...data, testimonials: newTestimonials });
                    }}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove Testimonial
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newTestimonials = [...(data.testimonials || []), { name: '', role: '', content: '', rating: 5 }];
                  setData({ ...data, testimonials: newTestimonials });
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                + Add Testimonial
              </button>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Section Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="FAQ headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">FAQs</label>
              {(data.faqs || []).map((faq: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question || ''}
                    onChange={(e) => {
                      const newFaqs = [...(data.faqs || [])];
                      newFaqs[index] = { ...faq, question: e.target.value };
                      setData({ ...data, faqs: newFaqs });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                  />
                  <textarea
                    placeholder="Answer"
                    value={faq.answer || ''}
                    onChange={(e) => {
                      const newFaqs = [...(data.faqs || [])];
                      newFaqs[index] = { ...faq, answer: e.target.value };
                      setData({ ...data, faqs: newFaqs });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  />
                  <button
                    onClick={() => {
                      const newFaqs = (data.faqs || []).filter((_: any, i: number) => i !== index);
                      setData({ ...data, faqs: newFaqs });
                    }}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove FAQ
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newFaqs = [...(data.faqs || []), { question: '', answer: '' }];
                  setData({ ...data, faqs: newFaqs });
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                + Add FAQ
              </button>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Call-to-action headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Body Text</label>
              <textarea
                value={data.body || ''}
                onChange={(e) => setData({ ...data, body: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="Urgency or value text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Button Text</label>
              <input
                type="text"
                value={data.cta || ''}
                onChange={(e) => setData({ ...data, cta: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Get Started Now"
              />
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Section Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pricing headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Pricing Plans</label>
              {(data.plans || []).map((plan: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Plan name"
                      value={plan.name || ''}
                      onChange={(e) => {
                        const newPlans = [...(data.plans || [])];
                        newPlans[index] = { ...plan, name: e.target.value };
                        setData({ ...data, plans: newPlans });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="$29"
                        value={plan.price || ''}
                        onChange={(e) => {
                          const newPlans = [...(data.plans || [])];
                          newPlans[index] = { ...plan, price: e.target.value };
                          setData({ ...data, plans: newPlans });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
                      />
                      <input
                        type="text"
                        placeholder="/month"
                        value={plan.period || ''}
                        onChange={(e) => {
                          const newPlans = [...(data.plans || [])];
                          newPlans[index] = { ...plan, period: e.target.value };
                          setData({ ...data, plans: newPlans });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Features (one per line)</label>
                    <textarea
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      value={(plan.features || []).join('\n')}
                      onChange={(e) => {
                        const newPlans = [...(data.plans || [])];
                        newPlans[index] = { ...plan, features: e.target.value.split('\n').filter(f => f.trim()) };
                        setData({ ...data, plans: newPlans });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Button text"
                        value={plan.cta || ''}
                        onChange={(e) => {
                          const newPlans = [...(data.plans || [])];
                          newPlans[index] = { ...plan, cta: e.target.value };
                          setData({ ...data, plans: newPlans });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={plan.popular || false}
                          onChange={(e) => {
                            const newPlans = [...(data.plans || [])];
                            newPlans[index] = { ...plan, popular: e.target.checked };
                            setData({ ...data, plans: newPlans });
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">Popular</span>
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        const newPlans = (data.plans || []).filter((_: any, i: number) => i !== index);
                        setData({ ...data, plans: newPlans });
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove Plan
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPlans = [...(data.plans || []), { name: '', price: '', period: '/month', features: [], cta: 'Get Started', popular: false }];
                  setData({ ...data, plans: newPlans });
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                + Add Plan
              </button>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Section Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Video section headline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Video URL</label>
              <input
                type="url"
                value={data.videoUrl || ''}
                onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.youtube.com/embed/VIDEO_ID or https://vimeo.com/VIDEO_ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                For YouTube: Use embed URL format (youtube.com/embed/VIDEO_ID)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                value={data.description || ''}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="Describe what viewers will learn or see in this video..."
              />
            </div>
          </div>
        );

      case 'leadform':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Headline</label>
              <input
                type="text"
                value={data.headline || ''}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Form headline"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Subheadline (Optional)</label>
              <input
                type="text"
                value={data.subheadline || ''}
                onChange={(e) => setData({ ...data, subheadline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Form subheadline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Form Fields</label>
              {(data.fields || []).map((field: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Field Type</label>
                      <select
                        value={field.type || 'text'}
                        onChange={(e) => {
                          const newFields = [...(data.fields || [])];
                          newFields[index] = { ...field, type: e.target.value };
                          setData({ ...data, fields: newFields });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Field Label</label>
                      <input
                        type="text"
                        placeholder="Field label"
                        value={field.label || ''}
                        onChange={(e) => {
                          const newFields = [...(data.fields || [])];
                          newFields[index] = { ...field, label: e.target.value };
                          setData({ ...data, fields: newFields });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Placeholder</label>
                      <input
                        type="text"
                        placeholder="Field placeholder"
                        value={field.placeholder || ''}
                        onChange={(e) => {
                          const newFields = [...(data.fields || [])];
                          newFields[index] = { ...field, placeholder: e.target.value };
                          setData({ ...data, fields: newFields });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.required || false}
                          onChange={(e) => {
                            const newFields = [...(data.fields || [])];
                            newFields[index] = { ...field, required: e.target.checked };
                            setData({ ...data, fields: newFields });
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">Required</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        const newFields = (data.fields || []).filter((_: any, i: number) => i !== index);
                        setData({ ...data, fields: newFields });
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove Field
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const newFields = [...(data.fields || []), {
                    id: `field_${Date.now()}`,
                    type: 'text',
                    label: 'New Field',
                    placeholder: '',
                    required: false
                  }];
                  setData({ ...data, fields: newFields });
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                + Add Field
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Submit Button Text</label>
                <input
                  type="text"
                  value={data.submitButton || ''}
                  onChange={(e) => setData({ ...data, submitButton: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Submit button text"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Form Layout</label>
                <select
                  value={data.style?.layout || 'single-column'}
                  onChange={(e) => setData({
                    ...data,
                    style: { ...data.style, layout: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="single-column">Single Column</option>
                  <option value="two-column">Two Column</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Success Message</label>
              <textarea
                value={data.successMessage || ''}
                onChange={(e) => setData({ ...data, successMessage: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                placeholder="Thank you message after form submission"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p>Editor not available for {section.type} sections</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold capitalize">Edit {section.type} Section</h2>
              <p className="text-green-100 text-sm">Customize your content</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {renderEditor()}
          </div>

          <div className="border-t px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {isRegenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              <span>{isRegenerating ? 'Regenerating...' : 'Regenerate with AI'}</span>
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}