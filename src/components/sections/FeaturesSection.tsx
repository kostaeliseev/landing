import React from 'react';
import { Check, Star, Zap, Shield, Target, Award } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface FeaturesSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  const getFeatureIcon = (index: number) => {
    const icons = [Check, Star, Zap, Shield, Target, Award];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features?.map((feature: any, index: number) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center group"
            >
              {/* Icon */}
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: `${currentPage?.brandSettings.colors.primary || '#3b82f6'}20`,
                  color: currentPage?.brandSettings.colors.primary || '#3b82f6',
                }}
              >
                {feature.icon ? (
                  <img src={feature.icon} alt="" className="w-8 h-8" />
                ) : (
                  getFeatureIcon(index)
                )}
              </div>

              {/* Title */}
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ 
                  color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                  fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
                }}
              >
                {feature.title || `Feature ${index + 1}`}
              </h3>

              {/* Description */}
              <p 
                className="opacity-80 leading-relaxed"
                style={{ 
                  color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                  fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
                }}
              >
                {feature.description || 'Feature description goes here.'}
              </p>

              {/* Optional CTA */}
              {feature.cta && (
                <div className="mt-6">
                  <button
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    style={{
                      color: currentPage?.brandSettings.colors.primary || '#3b82f6',
                      backgroundColor: `${currentPage?.brandSettings.colors.primary || '#3b82f6'}10`,
                    }}
                  >
                    {feature.cta}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {data.cta && (
          <div className="text-center mt-16">
            <button
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
              style={{
                backgroundColor: currentPage?.brandSettings.colors.primary || '#3b82f6',
                color: '#ffffff',
              }}
            >
              {data.cta}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};