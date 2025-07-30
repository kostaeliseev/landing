import React, { useState } from 'react';
import { Edit, Save, X, Settings } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface EditableSectionProps {
  section: LandingPageSection;
  children: React.ReactNode;
  isPreview?: boolean;
  onEdit?: (field: string, value: any) => void;
}

export const EditableSection: React.FC<EditableSectionProps> = ({ 
  section, 
  children, 
  isPreview = false,
  onEdit 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const { updateSection, selectedSectionId, selectSection } = useLandingPageStore();

  const isSelected = selectedSectionId === section.id;

  const handleEdit = (field: string, value: any) => {
    if (onEdit) {
      onEdit(field, value);
    } else {
      // Default edit behavior - update the section data
      updateSection(section.id, {
        ...section,
        data: {
          ...section.data,
          [field]: value
        }
      });
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      selectSection(section.id);
    }
  };

  const handleTextEdit = (field: string, element: HTMLElement) => {
    const value = element.textContent || '';
    handleEdit(field, value);
  };

  // Enhanced children with editing capabilities
  const enhancedChildren = React.cloneElement(children as React.ReactElement, {
    onEdit: handleEdit,
    isEditing: isEditing,
    section: section
  });

  if (isPreview) {
    return <>{children}</>;
  }

  return (
    <div className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Edit Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Selection Border */}
        {isSelected && (
          <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none" />
        )}
        
        {/* Edit Controls */}
        <div className={`absolute top-4 right-4 flex items-center space-x-2 transition-opacity duration-200 ${
          isSelected || isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <button
            onClick={toggleEdit}
            className={`pointer-events-auto px-3 py-2 rounded-lg text-white text-sm font-medium shadow-lg transition-all duration-200 ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isEditing ? (
              <div className="flex items-center space-x-1">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </div>
            )}
          </button>
        </div>

        {/* Section Type Badge */}
        {isSelected && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium pointer-events-none">
            {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
          </div>
        )}
      </div>

      {/* Section Content */}
      <div 
        className={`${isEditing ? 'relative z-20' : ''}`}
        onClick={() => !isSelected && selectSection(section.id)}
      >
        {enhancedChildren}
      </div>

      {/* Inline Editing Styles */}
      {isEditing && (
        <style jsx global>{`
          [contenteditable="true"] {
            outline: 2px dashed #3b82f6 !important;
            outline-offset: 2px;
            background-color: rgba(59, 130, 246, 0.05) !important;
            border-radius: 4px;
            padding: 2px 4px;
            transition: all 0.2s ease;
          }
          
          [contenteditable="true"]:hover {
            background-color: rgba(59, 130, 246, 0.1) !important;
          }
          
          [contenteditable="true"]:focus {
            outline: 2px solid #3b82f6 !important;
            background-color: rgba(59, 130, 246, 0.1) !important;
          }
        `}</style>
      )}
    </div>
  );
};

// Higher-order component to wrap any section with editing capabilities
export const withEditing = <P extends object>(
  Component: React.ComponentType<P>,
  sectionType: string
) => {
  return React.forwardRef<any, P & { section: LandingPageSection; isPreview?: boolean }>((props, ref) => {
    const { section, isPreview, ...componentProps } = props;
    
    return (
      <EditableSection section={section} isPreview={isPreview}>
        <Component ref={ref} {...(componentProps as P)} />
      </EditableSection>
    );
  });
};

// Hook for making any text element editable
export const useEditableText = (
  field: string, 
  value: string, 
  onEdit: (field: string, value: string) => void,
  isEditing: boolean = false
) => {
  return {
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (isEditing) {
        onEdit(field, e.target.textContent || '');
      }
    },
    children: value
  };
};