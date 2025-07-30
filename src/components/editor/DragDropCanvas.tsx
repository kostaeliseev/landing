import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useLandingPageStore } from '../../stores/landingPageStore';
import { SortableSection } from './SortableSection';
import { SectionRenderer } from './SectionRenderer';
import { AddSectionButton } from './AddSectionButton';
import { LandingPageSection } from '../../types';

interface DragDropCanvasProps {
  className?: string;
}

export const DragDropCanvas: React.FC<DragDropCanvasProps> = ({ className = '' }) => {
  const {
    currentPage,
    selectedSectionId,
    isDragging,
    reorderSections,
    selectSection,
    setDragging,
  } = useLandingPageStore();

  const [activeSection, setActiveSection] = React.useState<LandingPageSection | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setDragging(true);
    const activeSection = currentPage?.sections.find(
      section => section.id === event.active.id
    );
    setActiveSection(activeSection || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDragging(false);
    setActiveSection(null);

    if (!currentPage || !over || active.id === over.id) {
      return;
    }

    const oldIndex = currentPage.sections.findIndex(section => section.id === active.id);
    const newIndex = currentPage.sections.findIndex(section => section.id === over.id);

    if (oldIndex !== newIndex) {
      reorderSections(oldIndex, newIndex);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    selectSection(selectedSectionId === sectionId ? null : sectionId);
  };

  if (!currentPage) {
    return (
      <div className={`flex items-center justify-center h-full bg-gray-50 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Landing Page Selected</h3>
          <p className="text-gray-600">Create a new landing page to get started.</p>
        </div>
      </div>
    );
  }

  const sectionIds = currentPage.sections
    .sort((a, b) => a.order - b.order)
    .map(section => section.id);

  return (
    <div className={`h-full overflow-y-auto bg-gray-50 ${className}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentPage.name}
            </h1>
            <p className="text-gray-600">
              {currentPage.sections.length} section{currentPage.sections.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Sections */}
          <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {currentPage.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <SectionRenderer section={section} />
                  </SortableSection>
                ))}
            </div>
          </SortableContext>

          {/* Add Section Button */}
          <div className="mt-8">
            <AddSectionButton />
          </div>

          {/* Empty State */}
          {currentPage.sections.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start Building Your Landing Page
              </h3>
              <p className="text-gray-600 mb-6">
                Add sections to create your high-converting PPC landing page.
              </p>
              <AddSectionButton variant="primary" />
            </div>
          )}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeSection && (
            <div className="bg-white border-2 border-blue-500 rounded-lg shadow-lg opacity-90 transform rotate-3">
              <SectionRenderer section={activeSection} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};