import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Trash2, Settings, RefreshCw, Edit3 } from 'lucide-react';
import { useLandingPageStore } from '../../stores/landingPageStore';
import { LandingPageSection } from '../../types';
import { RegenerateSectionModal } from '../ui/RegenerateSectionModal';

interface FixedSortableSectionProps {
  section: LandingPageSection;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const FixedSortableSection: React.FC<FixedSortableSectionProps> = ({
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
  const [showControls, setShowControls] = useState(false);

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
        group relative bg-white rounded-xl border-2 transition-all duration-200 overflow-hidden
        ${isSelected 
          ? 'border-blue-500 shadow-lg ring-4 ring-blue-100' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
        }
        ${isDragging ? 'opacity-50 shadow-2xl scale-105' : ''}
      `}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={onClick}
    >
      {/* Section Content */}
      <div className="relative">
        {children}
      </div>

      {/* Floating Controls - Only show on hover or selection */}
      {(showControls || isSelected) && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-1 flex items-center space-x-1">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-2 hover:bg-slate-100 rounded-md cursor-grab active:cursor-grabbing transition-colors"
              title="Drag to reorder"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="w-4 h-4 text-slate-600" />
            </button>
            
            {/* Edit Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="p-2 hover:bg-blue-100 rounded-md transition-colors"
              title="Edit section"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
            </button>
            
            {/* Regenerate Button */}
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="p-2 hover:bg-purple-100 rounded-md transition-colors disabled:opacity-50"
              title="Regenerate with AI"
            >
              <RefreshCw className={`w-4 h-4 text-purple-600 ${isGenerating ? 'animate-spin' : ''}`} />
            </button>
            
            {/* Duplicate Button */}
            <button
              onClick={handleDuplicate}
              className="p-2 hover:bg-green-100 rounded-md transition-colors"
              title="Duplicate section"
            >
              <Copy className="w-4 h-4 text-green-600" />
            </button>
            
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-100 rounded-md transition-colors"
              title="Delete section"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      )}

      {/* Section Type Badge - Bottom Left */}
      {(showControls || isSelected) && (
        <div className="absolute bottom-4 left-4 z-20">
          <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700 shadow-md border border-slate-200 capitalize">
            {section.type.replace('-', ' ')}
          </span>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none">
          <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
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