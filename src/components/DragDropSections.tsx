import React from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2, Copy } from 'lucide-react';
import { useLandingPageStore, type LandingPageSection } from '../stores/landingPageStore';

interface SortableSectionProps {
  section: LandingPageSection;
  renderContent: (section: LandingPageSection) => React.ReactNode;
  onEdit: (section: LandingPageSection) => void;
  onDelete: (sectionId: string) => void;
  onDuplicate: (section: LandingPageSection) => void;
}

function SortableSection({ section, renderContent, onEdit, onDelete, onDuplicate }: SortableSectionProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group border-2 border-transparent hover:border-blue-300 rounded-lg transition-all duration-200 ${
        isDragging ? 'z-50 shadow-2xl' : ''
      }`}
    >
      {/* Section Controls Overlay */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center space-x-1 bg-white shadow-lg rounded-lg p-1 border">
          <button
            {...attributes}
            {...listeners}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded cursor-grab active:cursor-grabbing transition-colors"
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(section)}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Edit section"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDuplicate(section)}
            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
            title="Duplicate section"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(section.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section Content */}
      <div className="relative">
        {renderContent(section)}
        
        {/* Section Type Badge */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium capitalize">
            {section.type} Section
          </span>
        </div>
      </div>
    </div>
  );
}

interface DragDropSectionsProps {
  sections: LandingPageSection[];
  renderSection: (section: LandingPageSection) => React.ReactNode;
  onEdit: (section: LandingPageSection) => void;
  onDelete: (sectionId: string) => void;
  onDuplicate: (section: LandingPageSection) => void;
}

export function DragDropSections({ 
  sections, 
  renderSection, 
  onEdit, 
  onDelete, 
  onDuplicate 
}: DragDropSectionsProps) {
  const { reorderSections } = useLandingPageStore();
  const [activeSection, setActiveSection] = React.useState<LandingPageSection | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const activeSection = sections.find(section => section.id === event.active.id);
    setActiveSection(activeSection || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveSection(null);

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id);
      const newIndex = sections.findIndex(section => section.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSections(oldIndex, newIndex);
      }
    }
  };

  const sortedSections = sections.sort((a, b) => a.order - b.order);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedSections.map(section => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {sortedSections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              renderContent={renderSection}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeSection ? (
          <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-400 opacity-90 transform rotate-3">
            {renderSection(activeSection)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}