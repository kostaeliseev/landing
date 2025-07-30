import React, { useState } from 'react';
import { X, Settings, Target, Smartphone, Monitor, Eye, EyeOff } from 'lucide-react';
import { StickyCTA, defaultStickyCTAConfig } from '../StickyCTA';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stickyCTAConfig?: any;
  onStickyCTAConfigChange?: (config: any) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  stickyCTAConfig = defaultStickyCTAConfig,
  onStickyCTAConfigChange
}) => {
  const [activeTab, setActiveTab] = useState('sticky-cta');

  if (!isOpen) return null;

  const handleConfigChange = (config: any) => {
    if (onStickyCTAConfigChange) {
      onStickyCTAConfigChange(config);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6" />
              <h2 className="text-xl font-bold">Landing Page Settings</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex h-[calc(90vh-80px)]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('sticky-cta')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'sticky-cta'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Sticky CTA</span>
                </button>

                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'mobile'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Mobile Settings</span>
                </button>

                <button
                  onClick={() => setActiveTab('desktop')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'desktop'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="font-medium">Desktop Settings</span>
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'sticky-cta' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sticky CTA Configuration</h3>
                    <p className="text-gray-600">Configure a floating call-to-action button that follows users as they scroll.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Enable/Disable */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={stickyCTAConfig.enabled}
                          onChange={(e) => handleConfigChange({ ...stickyCTAConfig, enabled: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div>
                          <span className="text-lg font-semibold text-gray-900">Enable Sticky CTA</span>
                          <p className="text-sm text-gray-600 mt-1">Show a floating call-to-action button on your landing page</p>
                        </div>
                      </label>
                    </div>

                    {stickyCTAConfig.enabled && (
                      <>
                        {/* Basic Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                            <input
                              type="text"
                              value={stickyCTAConfig.text}
                              onChange={(e) => handleConfigChange({ ...stickyCTAConfig, text: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Get Started"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link/Action</label>
                            <input
                              type="text"
                              value={stickyCTAConfig.link}
                              onChange={(e) => handleConfigChange({ ...stickyCTAConfig, link: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="#cta or https://..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Type</label>
                            <select
                              value={stickyCTAConfig.type}
                              onChange={(e) => handleConfigChange({ ...stickyCTAConfig, type: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="button">Regular Button</option>
                              <option value="phone">Phone Call</option>
                              <option value="email">Email</option>
                              <option value="message">Message/WhatsApp</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <select
                              value={stickyCTAConfig.position}
                              onChange={(e) => handleConfigChange({ ...stickyCTAConfig, position: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="bottom-right">Bottom Right</option>
                              <option value="bottom-left">Bottom Left</option>
                              <option value="bottom-center">Bottom Center</option>
                            </select>
                          </div>
                        </div>

                        {/* Appearance */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                              <select
                                value={stickyCTAConfig.style}
                                onChange={(e) => handleConfigChange({ ...stickyCTAConfig, style: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="pill">Pill Shape</option>
                                <option value="square">Square/Rounded</option>
                                <option value="circle">Circle (Icon Only)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                              <select
                                value={stickyCTAConfig.size}
                                onChange={(e) => handleConfigChange({ ...stickyCTAConfig, size: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="color"
                                  value={stickyCTAConfig.color}
                                  onChange={(e) => handleConfigChange({ ...stickyCTAConfig, color: e.target.value })}
                                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={stickyCTAConfig.color}
                                  onChange={(e) => handleConfigChange({ ...stickyCTAConfig, color: e.target.value })}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Visibility Settings */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Visibility</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Smartphone className="w-5 h-5 text-gray-600" />
                                <div>
                                  <span className="font-medium text-gray-900">Show on Mobile</span>
                                  <p className="text-sm text-gray-600">Display the sticky CTA on mobile devices</p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={stickyCTAConfig.showOnMobile}
                                  onChange={(e) => handleConfigChange({ ...stickyCTAConfig, showOnMobile: e.target.checked })}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Monitor className="w-5 h-5 text-gray-600" />
                                <div>
                                  <span className="font-medium text-gray-900">Show on Desktop</span>
                                  <p className="text-sm text-gray-600">Display the sticky CTA on desktop devices</p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={stickyCTAConfig.showOnDesktop}
                                  onChange={(e) => handleConfigChange({ ...stickyCTAConfig, showOnDesktop: e.target.checked })}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <EyeOff className="w-5 h-5 text-gray-600" />
                                <div>
                                  <span className="font-medium text-gray-900">Allow Dismiss</span>
                                  <p className="text-sm text-gray-600">Users can close the sticky CTA</p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={stickyCTAConfig.dismissible}
                                  onChange={(e) => handleConfigChange({ ...stickyCTAConfig, dismissible: e.target.checked })}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Advanced Settings */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Show After Scrolling ({stickyCTAConfig.showAfterScroll}px)
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="1000"
                              step="50"
                              value={stickyCTAConfig.showAfterScroll}
                              onChange={(e) => handleConfigChange({ ...stickyCTAConfig, showAfterScroll: parseInt(e.target.value) })}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0px (Immediately)</span>
                              <span>1000px</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'mobile' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Mobile Settings</h3>
                  <div className="text-gray-600">
                    <p>Mobile-specific settings will be available in a future update.</p>
                  </div>
                </div>
              )}

              {activeTab === 'desktop' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Desktop Settings</h3>
                  <div className="text-gray-600">
                    <p>Desktop-specific settings will be available in a future update.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview of Sticky CTA */}
      {stickyCTAConfig.enabled && (
        <StickyCTA config={stickyCTAConfig} />
      )}
    </div>
  );
};