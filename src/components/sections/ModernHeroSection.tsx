import React, { useState } from 'react';
import { Play, ArrowRight, Check, Star, Shield, Award, TrendingUp, Users } from 'lucide-react';

interface HeroData {
  headline: string;
  subheadline?: string;
  body?: string;
  cta: string;
  ctaLink?: string;
  heroImage?: string;
  videoUrl?: string;
  credibilityIcons?: string[];
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

interface ModernHeroSectionProps {
  data: HeroData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
  brandSettings?: any;
}

export const ModernHeroSection: React.FC<ModernHeroSectionProps> = ({
  data,
  designStyle = 'modern',
  onEdit,
  isEditing = false,
  brandSettings
}) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const handleCTAClick = () => {
    if (data.ctaLink) {
      if (data.ctaLink.startsWith('#')) {
        const element = document.querySelector(data.ctaLink);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(data.ctaLink, '_blank');
      }
    }
  };

  const handleVideoClick = () => {
    if (data.videoUrl) {
      window.open(data.videoUrl, '_blank');
    }
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden',
          headline: 'text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight',
          subheadline: 'text-xl lg:text-2xl text-gray-600 leading-relaxed',
          body: 'text-lg text-gray-600 leading-relaxed',
          cta: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/25',
          playButton: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          imageContainer: 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-purple-200'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50 relative overflow-hidden',
          headline: 'text-5xl lg:text-7xl font-bold text-gray-900 leading-tight',
          subheadline: 'text-xl lg:text-2xl text-gray-600 leading-relaxed',
          body: 'text-lg text-gray-600 leading-relaxed',
          cta: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-blue-500/25',
          playButton: 'bg-blue-600 text-white',
          imageContainer: 'bg-blue-50 border-blue-200'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden',
          headline: 'text-5xl lg:text-7xl font-bold text-gray-900 leading-tight',
          subheadline: 'text-xl lg:text-2xl text-gray-600 leading-relaxed',
          body: 'text-lg text-gray-600 leading-relaxed',
          cta: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-cyan-500/25',
          playButton: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
          imageContainer: 'bg-gradient-to-br from-blue-100/50 to-cyan-100/50 border-cyan-200'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden',
          headline: 'text-5xl lg:text-7xl font-bold text-white leading-tight',
          subheadline: 'text-xl lg:text-2xl text-gray-300 leading-relaxed',
          body: 'text-lg text-gray-300 leading-relaxed',
          cta: 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black shadow-2xl hover:shadow-amber-500/25',
          playButton: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black',
          imageContainer: 'bg-gray-800/50 border-amber-500/30'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden',
          headline: 'text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight',
          subheadline: 'text-xl lg:text-2xl text-gray-700 leading-relaxed',
          body: 'text-lg text-gray-700 leading-relaxed',
          cta: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl hover:shadow-orange-500/25',
          playButton: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
          imageContainer: 'bg-gradient-to-br from-orange-100/50 to-red-100/50 border-orange-200'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-b from-gray-50 to-white relative overflow-hidden',
          headline: 'text-5xl lg:text-7xl font-bold text-gray-900 leading-tight',
          subheadline: 'text-xl lg:text-2xl text-gray-600 leading-relaxed',
          body: 'text-lg text-gray-600 leading-relaxed',
          cta: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-indigo-500/25',
          playButton: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white',
          imageContainer: 'bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-indigo-200'
        };
    }
  };

  const classes = getDesignClasses();

  return (
    <section className={`py-16 lg:py-24 px-4 ${classes.container} transition-all duration-300`} id="hero">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Headline */}
            <h1 
              className={classes.headline}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextEdit('headline', e.target.textContent || '')}
            >
              {data.headline || 'Transform Your Business with Our Solution'}
            </h1>

            {/* Subheadline */}
            {data.subheadline && (
              <h2 
                className={classes.subheadline}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('subheadline', e.target.textContent || '')}
              >
                {data.subheadline}
              </h2>
            )}

            {/* Body Text */}
            {data.body && (
              <p 
                className={classes.body}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('body', e.target.textContent || '')}
              >
                {data.body}
              </p>
            )}

            {/* Features List */}
            {data.features && data.features.length > 0 && (
              <div className="space-y-3">
                {data.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span 
                      className="text-gray-700"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onEdit) {
                          const newFeatures = [...(data.features || [])];
                          newFeatures[index] = e.target.textContent || '';
                          onEdit('features', newFeatures);
                        }
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <div className="space-y-6">
              <button
                onClick={handleCTAClick}
                className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${classes.cta}`}
              >
                <span 
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleTextEdit('cta', e.target.textContent || '')}
                >
                  {data.cta || 'Get Started Now'}
                </span>
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>

              {/* Credibility Icons */}
              {data.credibilityIcons && data.credibilityIcons.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 font-medium">Trusted by leading companies:</p>
                  <div className="flex flex-wrap items-center gap-6">
                    {data.credibilityIcons.map((icon, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={icon}
                          alt={`Credibility ${index + 1}`}
                          className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200 filter grayscale hover:grayscale-0"
                        />
                        {isEditing && (
                          <button
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              if (onEdit) {
                                const newIcons = data.credibilityIcons?.filter((_, i) => i !== index) || [];
                                onEdit('credibilityIcons', newIcons);
                              }
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        className="h-8 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 transition-colors"
                        onClick={() => {
                          const url = prompt('Enter credibility icon URL:');
                          if (url && onEdit) {
                            const newIcons = [...(data.credibilityIcons || []), url];
                            onEdit('credibilityIcons', newIcons);
                          }
                        }}
                      >
                        + Add Icon
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              {data.stats && data.stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                  {data.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Image/Video */}
          <div className="relative">
            <div className={`relative rounded-3xl overflow-hidden border-2 ${classes.imageContainer}`}>
              {data.heroImage ? (
                <div className="relative group">
                  <img
                    src={data.heroImage}
                    alt="Hero"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  
                  {/* Video Play Button Overlay */}
                  {data.videoUrl && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={handleVideoClick}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ${classes.playButton}`}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </button>
                    </div>
                  )}

                  {/* Edit overlay */}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
                        onClick={() => {
                          const url = prompt('Enter image URL:', data.heroImage);
                          if (url !== null && onEdit) {
                            onEdit('heroImage', url);
                          }
                        }}
                      >
                        Change Image
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 lg:h-[500px] bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=500&fit=crop"
                      alt="Default hero"
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <button
                          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
                          onClick={() => {
                            const url = prompt('Enter image URL:');
                            if (url && onEdit) {
                              onEdit('heroImage', url);
                            }
                          }}
                        >
                          Add Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default hero data
export const defaultHeroData: HeroData = {
  headline: 'Transform Your Business with Our Solution',
  subheadline: 'Join thousands of companies that trust our platform to grow their business faster',
  body: 'Get started in minutes with our easy-to-use platform designed for modern businesses.',
  cta: 'Get Started Now',
  ctaLink: '#cta',
  heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=500&fit=crop',
  credibilityIcons: [
    'https://logo.clearbit.com/google.com',
    'https://logo.clearbit.com/microsoft.com',
    'https://logo.clearbit.com/amazon.com',
    'https://logo.clearbit.com/apple.com'
  ],
  features: [
    'No setup fees or hidden costs',
    '24/7 customer support',
    'Easy integration with existing tools'
  ],
  stats: [
    { value: '10K+', label: 'Happy Customers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ]
};