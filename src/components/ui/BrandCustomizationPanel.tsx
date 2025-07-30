import React, { useState } from 'react';
import { X, Upload, Palette, Type, Image, Save } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface BrandCustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandCustomizationPanel: React.FC<BrandCustomizationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentPage, updateBrandSettings, savePage } = useLandingPageStore();
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'logo'>('colors');
  const [activeColorType, setActiveColorType] = useState<'primary' | 'secondary' | 'accent' | 'text' | 'background'>('primary');

  if (!isOpen || !currentPage) return null;

  const handleColorChange = (color: string) => {
    updateBrandSettings({
      colors: {
        ...currentPage.brandSettings.colors,
        [activeColorType]: color,
      },
    });
  };

  const handleFontChange = (type: 'heading' | 'body', font: string) => {
    updateBrandSettings({
      fonts: {
        ...currentPage.brandSettings.fonts,
        [type]: font,
      },
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateBrandSettings({
          logo: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await savePage();
    alert('Brand settings saved!');
  };

  const googleFonts = [
    'Inter',
    'Roboto',
    'Poppins',
    'Montserrat',
    'Open Sans',
    'Lato',
    'Source Sans Pro',
    'Nunito',
    'Raleway',
    'Merriweather',
    'Playfair Display',
    'Crimson Text',
  ];

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#5B21B6', accent: '#A78BFA' },
    { name: 'Green', primary: '#10B981', secondary: '#047857', accent: '#34D399' },
    { name: 'Red', primary: '#EF4444', secondary: '#B91C1C', accent: '#F87171' },
    { name: 'Orange', primary: '#F59E0B', secondary: '#D97706', accent: '#FCD34D' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#0F766E', accent: '#5EEAD4' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-start justify-end">
        <div className="relative bg-white h-screen w-96 shadow-2xl overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Brand Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex border-b">
            {[
              { id: 'colors', label: 'Colors', icon: Palette },
              { id: 'fonts', label: 'Fonts', icon: Type },
              { id: 'logo', label: 'Logo', icon: Image },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Presets</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          updateBrandSettings({
                            colors: {
                              ...currentPage.brandSettings.colors,
                              primary: preset.primary,
                              secondary: preset.secondary,
                              accent: preset.accent,
                            },
                          });
                        }}
                        className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }} />
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }} />
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }} />
                        </div>
                        <span className="text-sm">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Customize Colors</h3>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { key: 'primary', label: 'Primary' },
                      { key: 'secondary', label: 'Secondary' },
                      { key: 'accent', label: 'Accent' },
                      { key: 'text', label: 'Text' },
                      { key: 'background', label: 'Background' },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setActiveColorType(key as any)}
                        className={`flex items-center space-x-2 p-2 rounded-lg border text-sm transition-colors ${
                          activeColorType === key
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded border"
                          style={{
                            backgroundColor: currentPage.brandSettings.colors[key as keyof typeof currentPage.brandSettings.colors],
                          }}
                        />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <HexColorPicker
                      color={currentPage.brandSettings.colors[activeColorType]}
                      onChange={handleColorChange}
                    />
                    <input
                      type="text"
                      value={currentPage.brandSettings.colors[activeColorType]}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="input-field font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Heading Font</h3>
                  <select
                    value={currentPage.brandSettings.fonts.heading}
                    onChange={(e) => handleFontChange('heading', e.target.value)}
                    className="input-field"
                  >
                    {googleFonts.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <h4
                      className="text-xl font-bold"
                      style={{ fontFamily: currentPage.brandSettings.fonts.heading }}
                    >
                      Sample Heading Text
                    </h4>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Body Font</h3>
                  <select
                    value={currentPage.brandSettings.fonts.body}
                    onChange={(e) => handleFontChange('body', e.target.value)}
                    className="input-field"
                  >
                    {googleFonts.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p
                      style={{ fontFamily: currentPage.brandSettings.fonts.body }}
                    >
                      This is sample body text to preview how your content will look with the selected font.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'logo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Upload Logo</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {currentPage.brandSettings.logo ? (
                      <div className="space-y-3">
                        <img
                          src={currentPage.brandSettings.logo}
                          alt="Logo"
                          className="max-h-20 mx-auto"
                        />
                        <button
                          onClick={() => updateBrandSettings({ logo: '' })}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Logo
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-3">
                          Drop your logo here or click to upload
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-block cursor-pointer btn-secondary"
                    >
                      Choose File
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: PNG or SVG, max 2MB
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t p-6">
            <button
              onClick={handleSave}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};