import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface FAQSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        {data.headline && (
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ 
                color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
              }}
            >
              {data.headline}
            </h2>
            {data.subheadline && (
              <p 
                className="text-xl opacity-80 max-w-3xl mx-auto"
                style={{ 
                  color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                  fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
                }}
              >
                {data.subheadline}
              </p>
            )}
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.faqs?.map((faq: any, index: number) => {
            const isOpen = openItems.includes(index);
            
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 
                    className="text-lg font-semibold pr-8"
                    style={{ 
                      color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                      fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
                    }}
                  >
                    {faq.question || `Question ${index + 1}`}
                  </h3>
                  <div 
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{ 
                      color: currentPage?.brandSettings.colors.primary || '#3b82f6',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      style={{ 
                        color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                        fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: faq.answer || 'Answer goes here.' 
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        {data.contactCta && (
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ 
                color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
              }}
            >
              Still have questions?
            </h3>
            <p 
              className="text-gray-600 mb-6"
              style={{ 
                fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
              }}
            >
              We're here to help. Get in touch with our team.
            </p>
            <button
              className="px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: currentPage?.brandSettings.colors.primary || '#3b82f6',
                color: '#ffffff',
              }}
            >
              {data.contactCta}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};