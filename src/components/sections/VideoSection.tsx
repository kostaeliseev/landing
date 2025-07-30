import React from 'react';
import { Play } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface VideoSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{data.headline || 'Watch How It Works'}</h2>
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="w-16 h-16 text-white" />
          </div>
          <p className="absolute bottom-4 left-4 text-white text-sm">Video placeholder</p>
        </div>
      </div>
    </div>
  );
};