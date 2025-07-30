import React from 'react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface CarouselSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{data.headline || 'Carousel Section'}</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-600">Carousel component will be implemented here</p>
        </div>
      </div>
    </div>
  );
};