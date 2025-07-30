import React from 'react';
import { ArrowRight, Clock, Users, CheckCircle } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface CTASectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  const handleCTAClick = () => {
    if (!isPreview) return;
    
    // GTM tracking
    if (window.gtag && currentPage?.gtmSettings.containerId) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'CTA Section',
        section_id: section.id,
        cta_text: data.cta,
      });
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h2 
          className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          style={{ 
            color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
            fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
          }}
        >
          {data.headline || 'Ready to Get Started?'}
        </h2>

        {/* Supporting Text */}
        {data.body && (
          <p 
            className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed"
            style={{ 
              color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
              fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
            }}
          >
            {data.body}
          </p>
        )}

        {/* Urgency Elements */}
        {data.urgency && (
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm">
            {data.urgency.limited_time && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                <Clock className="w-4 h-4" />
                <span>Limited Time Offer</span>
              </div>
            )}
            {data.urgency.limited_spots && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
                <Users className="w-4 h-4" />
                <span>Only {data.urgency.spots_left || 'Few'} Spots Left</span>
              </div>
            )}
            {data.urgency.guarantee && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span>{data.urgency.guarantee}</span>
              </div>
            )}
          </div>
        )}

        {/* CTA Button(s) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button
            onClick={handleCTAClick}
            className="group px-10 py-5 text-xl font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3"
            style={{
              backgroundColor: currentPage?.brandSettings.colors.primary || '#3b82f6',
              color: '#ffffff',
            }}
          >
            <span>{data.cta || 'Get Started Now'}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Secondary CTA */}
          {data.secondaryCta && (
            <button
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-200 hover:bg-opacity-10"
              style={{
                borderColor: currentPage?.brandSettings.colors.primary || '#3b82f6',
                color: currentPage?.brandSettings.colors.primary || '#3b82f6',
                backgroundColor: 'transparent',
              }}
            >
              {data.secondaryCta}
            </button>
          )}
        </div>

        {/* Social Proof Numbers */}
        {data.socialProof && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-gray-200">
            {data.socialProof.customers && (
              <div className="text-center">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: currentPage?.brandSettings.colors.primary || '#3b82f6' }}
                >
                  {data.socialProof.customers}+
                </div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            )}
            {data.socialProof.rating && (
              <div className="text-center">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: currentPage?.brandSettings.colors.primary || '#3b82f6' }}
                >
                  {data.socialProof.rating}⭐
                </div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            )}
            {data.socialProof.years && (
              <div className="text-center">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: currentPage?.brandSettings.colors.primary || '#3b82f6' }}
                >
                  {data.socialProof.years}+
                </div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            )}
          </div>
        )}

        {/* Risk Reversal */}
        {data.riskReversal && (
          <div className="mt-8">
            <p className="text-sm text-gray-600 flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{data.riskReversal}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};