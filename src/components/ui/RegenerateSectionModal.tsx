import React, { useState } from 'react';
import { X, Wand2, RefreshCw } from 'lucide-react';
import { LandingPageSection, SectionType } from '../../types';
import { geminiService } from '../../services/geminiService';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface RegenerateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: LandingPageSection | null;
}

export const RegenerateSectionModal: React.FC<RegenerateSectionModalProps> = ({
  isOpen,
  onClose,
  section,
}) => {
  const { updateSection, currentPage } = useLandingPageStore();
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationOption, setGenerationOption] = useState<'improve' | 'rewrite' | 'custom'>('improve');

  if (!isOpen || !section) return null;

  const handleRegenerate = async () => {
    if (!geminiService.isInitialized()) {
      alert('Please configure your Gemini API key first');
      return;
    }

    setIsGenerating(true);
    
    try {
      let prompt = '';
      const campaignData = currentPage?.brandSettings.campaignData;
      
      switch (generationOption) {
        case 'improve':
          prompt = `Improve this ${section.type} section content while keeping the same structure and key points. Make it more compelling and conversion-focused.`;
          break;
        case 'rewrite':
          prompt = `Completely rewrite this ${section.type} section with fresh content while maintaining the same purpose and conversion goals.`;
          break;
        case 'custom':
          prompt = customPrompt || 'Regenerate this section with fresh content';
          break;
      }

      const regeneratedContent = await geminiService.regenerateSection(
        section.id,
        section.type,
        prompt,
        {
          brandInfo: campaignData?.productOffer,
          targetAudience: campaignData?.targetAudience,
          campaignGoal: campaignData?.campaignGoal,
          funnelStage: campaignData?.funnelStage,
        }
      );

      // Update the section with new content
      updateSection(section.id, {
        data: { ...section.data, ...regeneratedContent },
      });

      onClose();
      alert('Section regenerated successfully! 🎉');
    } catch (error) {
      console.error('Failed to regenerate section:', error);
      alert('Failed to regenerate section. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getSectionTypeLabel = (type: SectionType) => {
    const labels: Record<SectionType, string> = {
      hero: 'Hero Section',
      features: 'Features Section',
      testimonials: 'Testimonials Section',
      faq: 'FAQ Section',
      cta: 'Call-to-Action Section',
      'how-it-works': 'How It Works Section',
      pricing: 'Pricing Section',
      credibility: 'Credibility Section',
      header: 'Header Section',
      footer: 'Footer Section',
      carousel: 'Carousel Section',
      leadform: 'Lead Form Section',
      quiz: 'Quiz Section',
      video: 'Video Section',
      comparison: 'Comparison Section',
    };
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full">
          {/* Header */}
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wand2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Regenerate Section</h2>
                <p className="text-sm text-gray-600">{getSectionTypeLabel(section.type)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Generation Options */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">How would you like to regenerate?</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="generation-option"
                    value="improve"
                    checked={generationOption === 'improve'}
                    onChange={(e) => setGenerationOption(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Improve Current Content</div>
                    <div className="text-sm text-gray-600">Enhance the existing content while keeping the same structure</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="generation-option"
                    value="rewrite"
                    checked={generationOption === 'rewrite'}
                    onChange={(e) => setGenerationOption(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Complete Rewrite</div>
                    <div className="text-sm text-gray-600">Generate completely new content for this section</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="generation-option"
                    value="custom"
                    checked={generationOption === 'custom'}
                    onChange={(e) => setGenerationOption(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Custom Instructions</div>
                    <div className="text-sm text-gray-600">Provide specific instructions for how to regenerate</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Prompt */}
            {generationOption === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Custom Instructions
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="input-field h-32 resize-none"
                  placeholder="Describe how you want this section to be regenerated. For example: 'Make it more urgent and include a limited-time offer' or 'Focus on the benefits for small business owners'"
                />
              </div>
            )}

            {/* Current Content Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Current Content</h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                {section.data.headline && (
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Headline:</span>
                    <div className="font-medium">{section.data.headline}</div>
                  </div>
                )}
                {section.data.subheadline && (
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Subheadline:</span>
                    <div className="text-sm text-gray-700">{section.data.subheadline}</div>
                  </div>
                )}
                {section.data.body && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Body:</span>
                    <div className="text-sm text-gray-700 line-clamp-3">{section.data.body}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-amber-600">⚠️</div>
                <div className="text-sm text-amber-800">
                  <div className="font-medium mb-1">This will replace your current content</div>
                  <div>The AI will generate new content based on your selection. Make sure to review the results before saving your page.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            
            <button
              onClick={handleRegenerate}
              disabled={isGenerating || (generationOption === 'custom' && !customPrompt.trim())}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              <span>{isGenerating ? 'Regenerating...' : 'Regenerate Section'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};