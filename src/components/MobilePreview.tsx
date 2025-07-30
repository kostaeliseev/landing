import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, X, RotateCcw } from 'lucide-react';
import type { LandingPage } from '../stores/landingPageStore';

interface MobilePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  page: LandingPage;
  renderSection: (section: any) => React.ReactNode;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const deviceConfigs = {
  desktop: {
    name: 'Desktop',
    icon: Monitor,
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    className: '',
  },
  tablet: {
    name: 'Tablet',
    icon: Tablet,
    width: '768px',
    height: '1024px',
    maxWidth: '768px',
    className: 'mx-auto border-8 border-gray-800 rounded-xl shadow-2xl bg-gray-900',
  },
  mobile: {
    name: 'Mobile',
    icon: Smartphone,
    width: '375px',
    height: '667px',
    maxWidth: '375px',
    className: 'mx-auto border-8 border-gray-800 rounded-3xl shadow-2xl bg-gray-900',
  },
};

export function MobilePreview({ isOpen, onClose, page, renderSection }: MobilePreviewProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  if (!isOpen) return null;

  const device = deviceConfigs[selectedDevice];
  const isLandscape = orientation === 'landscape' && selectedDevice !== 'desktop';
  
  const previewStyles = {
    width: isLandscape ? device.height : device.width,
    height: isLandscape ? device.width : device.height,
    maxWidth: selectedDevice === 'desktop' ? 'none' : (isLandscape ? device.height : device.maxWidth),
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full flex flex-col bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">Mobile Preview</h2>
            <span className="bg-blue-500 bg-opacity-30 px-3 py-1 rounded-full text-sm">
              {page.name}
            </span>
          </div>
          
          {/* Device Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-1">
              {Object.entries(deviceConfigs).map(([key, config]) => {
                const IconComponent = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key as DeviceType)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      selectedDevice === key
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-white hover:bg-white hover:bg-opacity-20'
                    }`}
                    title={config.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>

            {selectedDevice !== 'desktop' && (
              <button
                onClick={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Rotate device"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Device Info Bar */}
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{device.name}</span>
              <span>
                {isLandscape ? `${device.height} × ${device.width}` : `${device.width} × ${device.height}`}
              </span>
              {selectedDevice !== 'desktop' && (
                <span className="capitalize bg-gray-200 px-2 py-1 rounded text-xs">
                  {orientation}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              Preview Mode • All interactions disabled
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div 
            className={`${device.className} overflow-hidden transition-all duration-300`}
            style={previewStyles}
          >
            <div className="w-full h-full overflow-y-auto bg-white">
              {selectedDevice !== 'desktop' && (
                <div className="h-6 bg-black"></div>
              )}
              
              <div className="min-h-full">
                {page.sections.length === 0 ? (
                  <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Content</h3>
                      <p className="text-gray-600 text-sm">
                        Add sections to see how they look on {device.name.toLowerCase()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {page.sections
                      .sort((a, b) => a.order - b.order)
                      .map((section) => (
                        <div key={section.id} className="relative">
                          {renderSection(section)}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              {selectedDevice !== 'desktop' && (
                <div className="h-6 bg-black"></div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Tip:</span> Test your forms and CTAs on different screen sizes to ensure optimal conversion rates.
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Responsive Design Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}