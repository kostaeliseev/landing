import React from 'react';
import { LandingPageSection } from '../../types';
import { UniversalSectionEditor } from './UniversalSectionEditor';
import { HeroSection } from '../sections/HeroSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { FAQSection } from '../sections/FAQSection';
import { CTASection } from '../sections/CTASection';
import { HeaderSection } from '../sections/HeaderSection';
import { FooterSection } from '../sections/FooterSection';
import { CarouselSection } from '../sections/CarouselSection';
import { LeadFormSection } from '../sections/LeadFormSection';
import { QuizSection } from '../sections/QuizSection';
import { VideoSection } from '../sections/VideoSection';
import { CredibilitySection } from '../sections/CredibilitySection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { PricingSection } from '../sections/PricingSection';
import { ComparisonSection } from '../sections/ComparisonSection';
import { ModernVideoSection } from '../sections/ModernVideoSection';
import { ModernTestimonialsSection } from '../sections/ModernTestimonialsSection';
import { ModernLeadFormSection } from '../sections/ModernLeadFormSection';
import { ModernHeroSection } from '../sections/ModernHeroSection';

interface SectionRendererProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ 
  section, 
  isPreview = false 
}) => {
  const commonProps = {
    section,
    isPreview,
  };

  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return <ModernHeroSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
          brandSettings={section.data.brandSettings}
        />;
      case 'features':
        return <FeaturesSection {...commonProps} />;
      case 'testimonials':
        return <ModernTestimonialsSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
          brandSettings={section.data.brandSettings}
        />;
      case 'faq':
        return <FAQSection {...commonProps} />;
      case 'cta':
        return <CTASection {...commonProps} />;
      case 'header':
        return <HeaderSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
          brandSettings={section.data.brandSettings}
        />;
      case 'footer':
        return <FooterSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
          brandSettings={section.data.brandSettings}
        />;
      case 'carousel':
        return <CarouselSection {...commonProps} />;
      case 'leadform':
        return <ModernLeadFormSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
        />;
      case 'quiz':
        return <QuizSection {...commonProps} />;
      case 'video':
        // Use modern video section for better functionality
        return <ModernVideoSection 
          data={section.data} 
          designStyle={section.data.designStyle || 'modern'} 
          isExport={false}
        />;
      case 'credibility':
        return <CredibilitySection {...commonProps} />;
      case 'how-it-works':
        return <HowItWorksSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
        />;
      case 'comparison':
        return <ComparisonSection 
          data={section.data}
          designStyle={section.data.designStyle || 'modern'}
        />;
      case 'pricing':
        return <PricingSection {...commonProps} />;
      default:
        return <DefaultSection {...commonProps} />;
    }
  };

  return (
    <UniversalSectionEditor section={section} isPreview={isPreview}>
      <div 
        className="min-h-[100px]"
        style={{
          backgroundColor: section.style.backgroundColor,
          backgroundImage: section.style.backgroundImage,
          color: section.style.textColor,
          padding: section.style.padding ? 
            `${section.style.padding.top}px ${section.style.padding.right}px ${section.style.padding.bottom}px ${section.style.padding.left}px` :
            '20px',
          margin: section.style.margin ?
            `${section.style.margin.top}px 0 ${section.style.margin.bottom}px 0` :
            '0',
          borderRadius: section.style.borderRadius ? `${section.style.borderRadius}px` : '0',
          boxShadow: section.style.shadow,
        }}
      >
        {renderSection()}
      </div>
    </UniversalSectionEditor>
  );
};

// Default fallback section for unknown types
const DefaultSection: React.FC<{ section: LandingPageSection }> = ({ section }) => {
  return (
    <div className="p-8 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Unknown Section Type: {section.type}
      </h3>
      <p className="text-gray-600">
        This section type is not yet implemented.
      </p>
    </div>
  );
};