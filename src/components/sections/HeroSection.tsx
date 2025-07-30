import React from 'react';
import { Play } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface HeroSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  const handleCTAClick = () => {
    if (!isPreview) return;
    
    // GTM tracking
    if (window.gtag && currentPage?.gtmSettings.containerId) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Hero CTA',
        section_id: section.id,
        cta_text: data.cta,
      });
    }
  };

  const backgroundStyle = {
    backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div 
      className="relative py-20 px-6 text-center overflow-hidden"
      style={backgroundStyle}
    >
      {/* Background Overlay */}
      {data.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Video Background */}
        {data.videoUrl && (
          <div className="absolute inset-0 z-0">
            {data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be') ? (
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(data.videoUrl)}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={data.videoUrl} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-20">
          {/* Headline */}
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ 
              color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
              fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
            }}
          >
            {data.headline || 'Your Compelling Headline'}
          </h1>

          {/* Subheadline */}
          {data.subheadline && (
            <h2 
              className="text-xl md:text-2xl mb-8 opacity-90"
              style={{ 
                color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
              }}
            >
              {data.subheadline}
            </h2>
          )}

          {/* Body Text */}
          {data.body && (
            <p 
              className="text-lg mb-10 max-w-2xl mx-auto opacity-80"
              style={{ 
                color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
              }}
            >
              {data.body}
            </p>
          )}

          {/* CTA Button */}
          {data.cta && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleCTAClick}
                className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: currentPage?.brandSettings.colors.primary || '#3b82f6',
                  color: '#ffffff',
                }}
              >
                {data.cta}
              </button>
              
              {/* Secondary Action - Play Video */}
              {data.videoUrl && (
                <button
                  className="flex items-center space-x-2 px-6 py-3 text-lg font-medium rounded-lg border-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{
                    borderColor: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                    color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                  }}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </button>
              )}
            </div>
          )}

          {/* Trust Signals */}
          {data.trustSignals && (
            <div className="mt-12">
              <p className="text-sm opacity-70 mb-4">Trusted by</p>
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
                {data.trustSignals.map((signal: string, index: number) => (
                  <img
                    key={index}
                    src={signal}
                    alt="Trust signal"
                    className="h-8 filter grayscale hover:grayscale-0 transition-all duration-200"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function extractYouTubeId(url: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : '';
}