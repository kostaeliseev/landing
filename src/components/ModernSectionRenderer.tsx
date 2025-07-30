import React from 'react';
import type { LandingPageSection, BrandSettings } from '../stores/landingPageStore';
import { ModernFAQ } from './sections/ModernFAQ';
import { ComparisonSection } from './sections/ComparisonSection';
import { HowItWorksSection } from './sections/HowItWorksSection';

interface ModernSectionRendererProps {
  section: LandingPageSection;
  brandSettings: BrandSettings;
  onEdit?: (sectionId: string, field: string, value: any) => void;
  isEditing?: boolean;
}

export function ModernSectionRenderer({ section, brandSettings, onEdit, isEditing = false }: ModernSectionRendererProps) {
  const designStyle = brandSettings.designStyle || 'modern';

  const handleEdit = (field: string, value: any) => {
    if (onEdit) {
      onEdit(section.id, field, value);
    }
  };

  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div 
            className="bg-gradient-to-r text-white p-12 text-center"
            style={{
              background: `linear-gradient(to right, ${brandSettings.colors.primary}, ${brandSettings.colors.secondary})`
            }}
          >
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: brandSettings.fonts.heading }}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleEdit('headline', e.target.textContent || '')}
            >
              {section.data.headline || 'Your Amazing Headline'}
            </h1>
            {section.data.subheadline && (
              <h2 
                className="text-xl mb-6 opacity-90"
                style={{ fontFamily: brandSettings.fonts.heading }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEdit('subheadline', e.target.textContent || '')}
              >
                {section.data.subheadline}
              </h2>
            )}
            {section.data.body && (
              <p 
                className="text-lg mb-8 opacity-80 max-w-2xl mx-auto"
                style={{ fontFamily: brandSettings.fonts.body }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEdit('body', e.target.textContent || '')}
              >
                {section.data.body}
              </p>
            )}
            {section.data.cta && (
              <button 
                className="bg-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                style={{ 
                  color: brandSettings.colors.primary,
                  fontFamily: brandSettings.fonts.body 
                }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEdit('cta', e.target.textContent || '')}
              >
                {section.data.cta}
              </button>
            )}
          </div>
        );
      
      case 'features':
        return (
          <div className={getBackgroundClass()} style={{ fontFamily: brandSettings.fonts.body }}>
            <div className="p-12">
              {section.data.headline && (
                <h2 
                  className="text-3xl font-bold text-center mb-12"
                  style={{ 
                    color: brandSettings.colors.text,
                    fontFamily: brandSettings.fonts.heading 
                  }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleEdit('headline', e.target.textContent || '')}
                >
                  {section.data.headline}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {section.data.features?.map((feature: any, index: number) => (
                  <div key={index} className={getCardClass()}>
                    <div className="text-3xl mb-4">⭐</div>
                    <h3 
                      className="text-xl font-semibold mb-4"
                      style={{ 
                        color: brandSettings.colors.text,
                        fontFamily: brandSettings.fonts.heading 
                      }}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newFeatures = [...(section.data.features || [])];
                        newFeatures[index] = { ...newFeatures[index], title: e.target.textContent || '' };
                        handleEdit('features', newFeatures);
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-gray-600"
                      style={{ fontFamily: brandSettings.fonts.body }}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newFeatures = [...(section.data.features || [])];
                        newFeatures[index] = { ...newFeatures[index], description: e.target.textContent || '' };
                        handleEdit('features', newFeatures);
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                )) || (
                  <div className="col-span-3 text-center text-gray-500">No features defined</div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'cta':
        return (
          <div 
            className="text-white p-12 text-center"
            style={{ 
              backgroundColor: brandSettings.colors.secondary,
              fontFamily: brandSettings.fonts.body 
            }}
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: brandSettings.fonts.heading }}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleEdit('headline', e.target.textContent || '')}
            >
              {section.data.headline || 'Ready to Get Started?'}
            </h2>
            {section.data.body && (
              <p 
                className="text-xl mb-8 opacity-90"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEdit('body', e.target.textContent || '')}
              >
                {section.data.body}
              </p>
            )}
            {section.data.cta && (
              <button 
                className="px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors"
                style={{ 
                  backgroundColor: brandSettings.colors.primary,
                  color: 'white',
                  fontFamily: brandSettings.fonts.body 
                }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEdit('cta', e.target.textContent || '')}
              >
                {section.data.cta}
              </button>
            )}
          </div>
        );

      case 'testimonials':
        return (
          <div className={getBackgroundClass()} style={{ fontFamily: brandSettings.fonts.body }}>
            <div className="p-12">
              {section.data.headline && (
                <h2 
                  className="text-3xl font-bold text-center mb-12"
                  style={{ 
                    color: brandSettings.colors.text,
                    fontFamily: brandSettings.fonts.heading 
                  }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleEdit('headline', e.target.textContent || '')}
                >
                  {section.data.headline}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {section.data.testimonials?.map((testimonial: any, index: number) => (
                  <div key={index} className={getCardClass()}>
                    <div className="flex mb-4">
                      {'⭐'.repeat(testimonial.rating || 5)}
                    </div>
                    <blockquote 
                      className="text-gray-700 mb-4 italic"
                      style={{ fontFamily: brandSettings.fonts.body }}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newTestimonials = [...(section.data.testimonials || [])];
                        newTestimonials[index] = { ...newTestimonials[index], content: e.target.textContent || '' };
                        handleEdit('testimonials', newTestimonials);
                      }}
                    >
                      "{testimonial.content || 'Great service and results!'}"
                    </blockquote>
                    <div>
                      <div 
                        className="font-semibold"
                        style={{ 
                          color: brandSettings.colors.text,
                          fontFamily: brandSettings.fonts.heading 
                        }}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          const newTestimonials = [...(section.data.testimonials || [])];
                          newTestimonials[index] = { ...newTestimonials[index], name: e.target.textContent || '' };
                          handleEdit('testimonials', newTestimonials);
                        }}
                      >
                        {testimonial.name || 'Customer Name'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role || 'Customer'}{testimonial.company ? `, ${testimonial.company}` : ''}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="col-span-3 text-center text-gray-500">No testimonials defined</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <ModernFAQ
            data={section.data}
            designStyle={designStyle}
            onEdit={handleEdit}
            isEditing={isEditing}
          />
        );

      case 'comparison':
        return (
          <ComparisonSection
            data={section.data}
            designStyle={designStyle}
            onEdit={handleEdit}
            isEditing={isEditing}
          />
        );

      case 'how-it-works':
        return (
          <HowItWorksSection
            data={section.data}
            designStyle={designStyle}
            onEdit={handleEdit}
            isEditing={isEditing}
          />
        );

      case 'pricing':
        return (
          <div className={getBackgroundClass()} style={{ fontFamily: brandSettings.fonts.body }}>
            <div className="p-12">
              {section.data.headline && (
                <h2 
                  className="text-3xl font-bold text-center mb-12"
                  style={{ 
                    color: brandSettings.colors.text,
                    fontFamily: brandSettings.fonts.heading 
                  }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleEdit('headline', e.target.textContent || '')}
                >
                  {section.data.headline}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {section.data.plans?.map((plan: any, index: number) => (
                  <div 
                    key={index} 
                    className={`relative rounded-2xl shadow-lg border-2 p-8 ${
                      plan.popular ? 'scale-105 shadow-xl' : ''
                    }`}
                    style={{
                      backgroundColor: 'white',
                      borderColor: plan.popular ? brandSettings.colors.primary : '#e5e7eb'
                    }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span 
                          className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: brandSettings.colors.primary }}
                        >
                          Most Popular
                        </span>
                      </div>
                    )}
                    <h3 
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: brandSettings.colors.text,
                        fontFamily: brandSettings.fonts.heading 
                      }}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newPlans = [...(section.data.plans || [])];
                        newPlans[index] = { ...newPlans[index], name: e.target.textContent || '' };
                        handleEdit('plans', newPlans);
                      }}
                    >
                      {plan.name || `Plan ${index + 1}`}
                    </h3>
                    <div className="mb-6">
                      <span 
                        className="text-4xl font-bold"
                        style={{ color: brandSettings.colors.primary }}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          const newPlans = [...(section.data.plans || [])];
                          newPlans[index] = { ...newPlans[index], price: e.target.textContent || '' };
                          handleEdit('plans', newPlans);
                        }}
                      >
                        {plan.price || '$0'}
                      </span>
                      <span className="text-gray-600 ml-2">{plan.period || '/month'}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {(plan.features || []).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-3">✓</span>
                          <span 
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {
                              const newPlans = [...(section.data.plans || [])];
                              const newFeatures = [...newPlans[index].features];
                              newFeatures[featureIndex] = e.target.textContent || '';
                              newPlans[index] = { ...newPlans[index], features: newFeatures };
                              handleEdit('plans', newPlans);
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="w-full py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                      style={{ 
                        backgroundColor: brandSettings.colors.primary,
                        color: 'white',
                        fontFamily: brandSettings.fonts.body 
                      }}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newPlans = [...(section.data.plans || [])];
                        newPlans[index] = { ...newPlans[index], cta: e.target.textContent || '' };
                        handleEdit('plans', newPlans);
                      }}
                    >
                      {plan.cta || 'Get Started'}
                    </button>
                  </div>
                )) || (
                  <div className="col-span-3 text-center text-gray-500">No pricing plans defined</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className={getBackgroundClass()} style={{ fontFamily: brandSettings.fonts.body }}>
            <div className="p-12">
              {section.data.headline && (
                <h2 
                  className="text-3xl font-bold text-center mb-8"
                  style={{ 
                    color: brandSettings.colors.text,
                    fontFamily: brandSettings.fonts.heading 
                  }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleEdit('headline', e.target.textContent || '')}
                >
                  {section.data.headline}
                </h2>
              )}
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
                  {section.data.videoUrl ? (
                    <iframe
                      src={section.data.videoUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">▶</span>
                        </div>
                        <p className="text-lg">Video Preview</p>
                      </div>
                    </div>
                  )}
                </div>
                {section.data.description && (
                  <p 
                    className="text-center text-lg max-w-2xl mx-auto"
                    style={{ 
                      color: brandSettings.colors.text,
                      fontFamily: brandSettings.fonts.body 
                    }}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleEdit('description', e.target.textContent || '')}
                  >
                    {section.data.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-700 capitalize">{section.type} Section</h3>
            <p className="text-gray-500 mt-2">Preview not available</p>
          </div>
        );
    }
  };

  const getBackgroundClass = () => {
    switch (designStyle) {
      case 'creative':
        return 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50';
      case 'corporate':
        return 'bg-gray-50';
      case 'startup':
        return 'bg-gradient-to-br from-blue-50 to-cyan-50';
      case 'luxury':
        return 'bg-gradient-to-br from-gray-900 to-gray-800 text-white';
      case 'playful':
        return 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50';
      default:
        return 'bg-white';
    }
  };

  const getCardClass = () => {
    switch (designStyle) {
      case 'creative':
        return 'text-center p-6 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200';
      case 'corporate':
        return 'text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200';
      case 'startup':
        return 'text-center p-6 bg-white border border-cyan-100 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200';
      case 'luxury':
        return 'text-center p-6 bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur-sm transition-all duration-200';
      case 'playful':
        return 'text-center p-6 bg-white border-2 border-orange-200 rounded-2xl shadow-lg hover:shadow-xl transform hover:rotate-1 transition-all duration-200';
      default:
        return 'text-center p-6 bg-gray-50 rounded-lg transition-all duration-200';
    }
  };

  return <div>{renderSection()}</div>;
}