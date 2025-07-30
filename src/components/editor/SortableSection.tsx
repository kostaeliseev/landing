import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Trash2, Settings, RefreshCw } from 'lucide-react';
import { useLandingPageStore } from '../../stores/landingPageStore';
import { LandingPageSection } from '../../types';
import { RegenerateSectionModal } from '../ui/RegenerateSectionModal';

interface SortableSectionProps {
  section: LandingPageSection;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const SortableSection: React.FC<SortableSectionProps> = ({
  section,
  isSelected,
  onClick,
  children,
}) => {
  const {
    removeSection,
    duplicateSection,
    isGenerating,
  } = useLandingPageStore();

  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this section?')) {
      removeSection(section.id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateSection(section.id);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRegenerateModalOpen(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-white rounded-lg border-2 transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
        }
        ${isDragging ? 'opacity-50 shadow-2xl' : ''}
      `}
      onClick={onClick}
    >
      {/* Section Controls Overlay */}
      <div
        className={`
          absolute inset-0 bg-blue-500/10 rounded-lg z-10 transition-opacity duration-200
          ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
      >
        {/* Top Controls Bar */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing"
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Section Type Badge */}
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 shadow-sm capitalize">
              {section.type}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 disabled:opacity-50"
              title="Regenerate with AI"
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${isGenerating ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={handleDuplicate}
              className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
              title="Duplicate section"
            >
              <Copy className="w-4 h-4 text-gray-600" />
            </button>
            
            <button
              className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
              title="Section settings"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            
            <button
              onClick={handleDelete}
              className="p-1 bg-white rounded shadow-sm hover:bg-red-50 hover:text-red-600"
              title="Delete section"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Border Indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t"></div>
      </div>

      {/* Section Content */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Selection Ring */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-400 rounded-lg pointer-events-none animate-pulse"></div>
      )}

      {/* Regenerate Modal */}
      <RegenerateSectionModal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        section={section}
      />
    </div>
  );
};