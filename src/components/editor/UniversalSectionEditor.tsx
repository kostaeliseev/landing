import React, { useState } from 'react';
import { Edit2, Save, X, Type, Image, Link, Palette, Settings } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface UniversalSectionEditorProps {
  section: LandingPageSection;
  children: React.ReactNode;
  isPreview?: boolean;
}

interface EditableField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'color' | 'number' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const UniversalSectionEditor: React.FC<UniversalSectionEditorProps> = ({ 
  section, 
  children, 
  isPreview = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { updateSection, selectedSectionId, selectSection } = useLandingPageStore();

  const isSelected = selectedSectionId === section.id;

  const handleFieldUpdate = (field: string, value: any) => {
    updateSection(section.id, {
      ...section,
      data: {
        ...section.data,
        [field]: value
      }
    });
  };

  const handleStyleUpdate = (styleField: string, value: any) => {
    updateSection(section.id, {
      ...section,
      style: {
        ...section.style,
        [styleField]: value
      }
    });
  };

  const getEditableFields = (): EditableField[] => {
    const fields: EditableField[] = [];
    const data = section.data;

    // Common fields based on section type
    switch (section.type) {
      case 'hero':
        fields.push(
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Your compelling headline...' },
          { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Supporting text...' },
          { key: 'cta', label: 'CTA Button', type: 'text', placeholder: 'Get Started' },
          { key: 'backgroundImage', label: 'Background Image', type: 'url', placeholder: 'https://...' }
        );
        break;
      case 'features':
        fields.push(
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Key Features' },
          { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Description...' }
        );
        break;
      case 'testimonials':
        fields.push(
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'What Customers Say' },
          { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Social proof description...' }
        );
        break;
      case 'faq':
        fields.push(
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Frequently Asked Questions' },
          { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Get answers to common questions...' }
        );
        break;
      case 'cta':
        fields.push(
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Ready to get started?' },
          { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Join thousands of satisfied customers...' },
          { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Get Started Now' },
          { key: 'buttonLink', label: 'Button Link', type: 'url', placeholder: '#' }
        );
        break;
      case 'video':
        fields.push(
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Watch How It Works' },
          { key: 'videoUrl', label: 'Video URL', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Video description...' }
        );
        break;
      default:
        // Generic fields for unknown section types
        if (data.headline) fields.push({ key: 'headline', label: 'Headline', type: 'text' });
        if (data.subheadline) fields.push({ key: 'subheadline', label: 'Subheadline', type: 'textarea' });
        if (data.description) fields.push({ key: 'description', label: 'Description', type: 'textarea' });
        if (data.cta) fields.push({ key: 'cta', label: 'CTA Button', type: 'text' });
    }

    return fields;
  };

  const renderFieldEditor = (field: EditableField) => {
    const value = section.data[field.key] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
              className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  const editableFields = getEditableFields();

  if (isPreview) {
    return <>{children}</>;
  }

  return (
    <div className={`relative group ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
      {/* Selection Click Area */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={() => !isSelected && selectSection(section.id)}
      />

      {/* Edit Controls */}
      <div className={`absolute top-4 right-4 z-20 flex items-center space-x-2 transition-opacity duration-200 ${
        isSelected || isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-3 py-2 rounded-lg text-white text-sm font-medium shadow-lg transition-all duration-200 ${
            isEditing 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isEditing ? (
            <div className="flex items-center space-x-1">
              <Save className="w-4 h-4" />
              <span>Done</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </div>
          )}
        </button>
      </div>

      {/* Section Type Badge */}
      {isSelected && (
        <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
        </div>
      )}

      {/* Section Content */}
      <div className={isEditing ? 'relative z-10' : ''}>
        {children}
      </div>

      {/* Editing Panel */}
      {isEditing && (
        <div className="fixed right-4 top-4 bottom-4 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Basic Fields */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Type className="w-4 h-4 mr-2" />
                  Content
                </h4>
                <div className="space-y-4">
                  {editableFields.map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {renderFieldEditor(field)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Style Options */}
              <div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3"
                >
                  <div className="flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Style Options
                  </div>
                  <span className="text-gray-500">{showAdvanced ? '−' : '+'}</span>
                </button>
                
                {showAdvanced && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Background Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={section.style.backgroundColor || '#ffffff'}
                          onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={section.style.backgroundColor || '#ffffff'}
                          onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                          placeholder="#ffffff"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Text Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={section.style.textColor || '#1f2937'}
                          onChange={(e) => handleStyleUpdate('textColor', e.target.value)}
                          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={section.style.textColor || '#1f2937'}
                          onChange={(e) => handleStyleUpdate('textColor', e.target.value)}
                          placeholder="#1f2937"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to prevent interaction when editing */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40" />
      )}
    </div>
  );
};