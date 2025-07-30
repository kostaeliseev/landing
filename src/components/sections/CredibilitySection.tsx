import React from 'react';
import { Award, Shield, Users, Star } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface CredibilitySectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

// High-quality placeholder company logos for credibility
const defaultCredibilityLogos = [
  { name: 'TechCorp', logo: '🏢', color: '#3B82F6' },
  { name: 'InnovateLab', logo: '⚡', color: '#10B981' },
  { name: 'DataFlow', logo: '📊', color: '#8B5CF6' },
  { name: 'CloudMax', logo: '☁️', color: '#F59E0B' },
  { name: 'SecureNet', logo: '🔒', color: '#EF4444' },
  { name: 'GrowthHub', logo: '📈', color: '#06B6D4' },
];

export const CredibilitySection: React.FC<CredibilitySectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  const logos = data.logos || defaultCredibilityLogos;
  const stats = data.stats || [
    { number: '10,000+', label: 'Happy Customers', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '4.9★', label: 'Rating', icon: Star },
    { number: '5 Years', label: 'Experience', icon: Award },
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {data.headline && (
          <div className="text-center mb-12">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ 
                color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
              }}
            >
              {data.headline}
            </h2>
            {data.subheadline && (
              <p 
                className="text-lg opacity-80 max-w-2xl mx-auto"
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

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat: any, index: number) => {
            const IconComponent = stat.icon || Users;
            return (
              <div key={index} className="text-center">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{
                    backgroundColor: `${currentPage?.brandSettings.colors.primary || '#3b82f6'}20`,
                    color: currentPage?.brandSettings.colors.primary || '#3b82f6',
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div 
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ 
                    color: currentPage?.brandSettings.colors.primary || '#3b82f6',
                    fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
                  }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-sm text-gray-600"
                  style={{ 
                    fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Logo Cloud */}
        <div className="text-center mb-8">
          <p 
            className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider"
            style={{ 
              fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
            }}
          >
            {data.logoCloudLabel || 'Trusted by leading companies'}
          </p>
          
          {/* Scrolling Logo Animation */}
          <div className="relative overflow-hidden">
            <div className="flex space-x-12 animate-scroll">
              {/* First set of logos */}
              {logos.concat(logos).map((company: any, index: number) => (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 w-32 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  {company.logo && company.logo.startsWith('http') ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div
                      className="flex items-center space-x-2 font-bold text-xl"
                      style={{ color: company.color || '#6B7280' }}
                    >
                      <span className="text-2xl">{company.logo || '🏢'}</span>
                      <span className="hidden sm:inline">{company.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Awards */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-200">
            {data.certifications.map((cert: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm border"
              >
                <div className="text-2xl">{cert.icon || '🏆'}</div>
                <div>
                  <div 
                    className="font-semibold text-sm"
                    style={{ 
                      color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                      fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
                    }}
                  >
                    {cert.name}
                  </div>
                  {cert.year && (
                    <div className="text-xs text-gray-500">{cert.year}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Badges */}
        {data.showSecurityBadges && (
          <div className="flex justify-center items-center space-x-6 mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Award className="w-4 h-4 text-yellow-600" />
              <span>ISO 27001</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};