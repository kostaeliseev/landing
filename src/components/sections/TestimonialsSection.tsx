import React from 'react';
import { Star, Quote } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface TestimonialsSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials?.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div 
                className="absolute top-4 right-4 opacity-20"
                style={{ color: currentPage?.brandSettings.colors.primary || '#3b82f6' }}
              >
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Content */}
              <blockquote 
                className="text-lg mb-6 leading-relaxed"
                style={{ 
                  color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                  fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
                }}
              >
                "{testimonial.content || 'This service has been amazing for our business.'}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <div 
                    className="font-semibold"
                    style={{ 
                      color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                      fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
                    }}
                  >
                    {testimonial.name || 'Customer Name'}
                  </div>
                  <div 
                    className="text-sm opacity-70"
                    style={{ 
                      color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937'
                    }}
                  >
                    {testimonial.role || 'Customer'}
                    {testimonial.company && `, ${testimonial.company}`}
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              {testimonial.verified && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Verified
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall Rating Summary */}
        {data.overallRating && (
          <div className="text-center mt-16 p-8 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold mr-4" style={{ color: currentPage?.brandSettings.colors.primary || '#3b82f6' }}>
                {data.overallRating.score}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  {renderStars(Math.round(data.overallRating.score))}
                </div>
                <div className="text-sm text-gray-600">
                  Based on {data.overallRating.count} reviews
                </div>
              </div>
            </div>
            {data.overallRating.source && (
              <p className="text-sm text-gray-600">
                Reviews from {data.overallRating.source}
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        {data.cta && (
          <div className="text-center mt-12">
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