import React from 'react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface LeadFormSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{data.headline || 'Get Your Free Quote'}</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="tel" placeholder="Phone" className="input-field" />
            <button type="submit" className="btn-primary w-full">{data.cta || 'Send Request'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};