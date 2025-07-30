import React from 'react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface QuizSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{data.headline || 'Find Your Perfect Solution'}</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-600">Interactive quiz component will be implemented here</p>
        </div>
      </div>
    </div>
  );
};