import React, { useState } from 'react';
import { Check, Palette, X } from 'lucide-react';
import { professionalThemes, type LandingPageTheme } from '../themes/professionalThemes';
import { useLandingPageStore } from '../stores/landingPageStore';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { currentPage, updateBrandSettings } = useLandingPageStore();
  const [selectedThemeId, setSelectedThemeId] = useState<string>('');

  if (!isOpen) return null;

  const applyTheme = (theme: LandingPageTheme) => {
    updateBrandSettings({
      ...theme.brandSettings,
      themeId: theme.id,
      designStyle: theme.designStyle,
    });
    setSelectedThemeId(theme.id);
  };

  const confirmTheme = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Palette className="w-6 h-6 mr-3" />
                Professional Themes
              </h2>
              <p className="text-purple-100 text-sm">Choose a theme that matches your brand</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative border-2 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-lg ${
                    selectedThemeId === theme.id
                      ? 'border-purple-500 shadow-lg ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => applyTheme(theme)}
                >
                  {/* Theme Preview */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Hero Section Preview */}
                    <div 
                      className="h-20 flex items-center justify-center text-white relative"
                      style={{
                        background: `linear-gradient(to right, ${theme.brandSettings.colors.primary}, ${theme.brandSettings.colors.secondary})`
                      }}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ fontFamily: theme.brandSettings.fonts.heading }}>
                          {theme.preview} {theme.name}
                        </div>
                        <div className="text-xs opacity-80">Hero Section</div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="p-4 bg-white space-y-3">
                      <div className="flex space-x-2">
                        <div className="w-12 h-8 rounded" style={{ backgroundColor: theme.brandSettings.colors.primary }}></div>
                        <div className="w-16 h-8 rounded" style={{ backgroundColor: theme.brandSettings.colors.secondary }}></div>
                        <div className="w-10 h-8 rounded" style={{ backgroundColor: theme.brandSettings.colors.accent }}></div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-100 rounded w-full"></div>
                        <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                      </div>

                      <div 
                        className="inline-block px-3 py-1 rounded text-white text-xs font-medium"
                        style={{ backgroundColor: theme.brandSettings.colors.primary }}
                      >
                        Button Style
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedThemeId === theme.id && (
                      <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="p-4 bg-gray-50 border-t">
                    <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: theme.brandSettings.fonts.heading }}>
                      {theme.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: theme.brandSettings.fonts.body }}>
                      {theme.description}
                    </p>
                    
                    {/* Font Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Heading: {theme.brandSettings.fonts.heading}</span>
                      <span>Body: {theme.brandSettings.fonts.body}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Theme Info */}
            {selectedThemeId && (
              <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Theme Applied Successfully! 🎉</h3>
                <p className="text-purple-700 mb-4">
                  Your landing page has been updated with the "{professionalThemes.find(t => t.id === selectedThemeId)?.name}" theme.
                  You can further customize colors and fonts in the Brand Settings panel.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={confirmTheme}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Continue Building
                  </button>
                  <button
                    onClick={() => setSelectedThemeId('')}
                    className="bg-white text-purple-600 border border-purple-300 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                  >
                    Try Another Theme
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}