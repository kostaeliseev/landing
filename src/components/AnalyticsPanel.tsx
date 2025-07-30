import React, { useState } from 'react';
import { X, BarChart3, Target, Code, Settings, Save } from 'lucide-react';
import { useLandingPageStore } from '../stores/landingPageStore';

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsPanel({ isOpen, onClose }: AnalyticsPanelProps) {
  const { currentPage, updatePage } = useLandingPageStore();
  const [config, setConfig] = useState({
    googleAnalytics: currentPage?.analytics?.googleAnalytics || '',
    gtmContainer: currentPage?.analytics?.gtmContainer || '',
    pixelId: currentPage?.analytics?.pixelId || '',
    customEvents: currentPage?.analytics?.customEvents || {
      pageView: true,
      formSubmit: true,
      buttonClick: true,
      videoWatch: false,
      scrollDepth: true,
    },
    conversionGoals: currentPage?.analytics?.conversionGoals || [
      { name: 'Form Submission', selector: '.lead-form', action: 'submit' },
      { name: 'CTA Click', selector: '.btn-primary', action: 'click' },
    ],
  });

  if (!isOpen || !currentPage) return null;

  const handleSave = () => {
    if (updatePage) {
      updatePage(currentPage.id, {
        analytics: config,
      });
    }
    onClose();
  };

  const addConversionGoal = () => {
    setConfig(prev => ({
      ...prev,
      conversionGoals: [
        ...prev.conversionGoals,
        { name: 'New Goal', selector: '', action: 'click' }
      ]
    }));
  };

  const removeConversionGoal = (index: number) => {
    setConfig(prev => ({
      ...prev,
      conversionGoals: prev.conversionGoals.filter((_, i) => i !== index)
    }));
  };

  const updateConversionGoal = (index: number, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      conversionGoals: prev.conversionGoals.map((goal, i) => 
        i === index ? { ...goal, [field]: value } : goal
      )
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-start justify-end">
        <div className="relative bg-white h-screen w-96 shadow-2xl overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Analytics & Tracking</h2>
                <p className="text-blue-100 text-sm">Configure tracking and conversions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Google Analytics */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Google Analytics</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Measurement ID (GA4)
                  </label>
                  <input
                    type="text"
                    value={config.googleAnalytics}
                    onChange={(e) => setConfig(prev => ({ ...prev, googleAnalytics: e.target.value }))}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Find this in Google Analytics → Admin → Data Streams
                  </p>
                </div>
              </div>
            </div>

            {/* Google Tag Manager */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Google Tag Manager</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Container ID
                </label>
                <input
                  type="text"
                  value={config.gtmContainer}
                  onChange={(e) => setConfig(prev => ({ ...prev, gtmContainer: e.target.value }))}
                  placeholder="GTM-XXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Find this in Google Tag Manager workspace
                </p>
              </div>
            </div>

            {/* Facebook Pixel */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Facebook Pixel</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pixel ID
                </label>
                <input
                  type="text"
                  value={config.pixelId}
                  onChange={(e) => setConfig(prev => ({ ...prev, pixelId: e.target.value }))}
                  placeholder="123456789012345"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Find this in Facebook Events Manager
                </p>
              </div>
            </div>

            {/* Event Tracking */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Event Tracking</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(config.customEvents).map(([key, enabled]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        customEvents: {
                          ...prev.customEvents,
                          [key]: e.target.checked
                        }
                      }))}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Conversion Goals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Conversion Goals</h3>
                </div>
                <button
                  onClick={addConversionGoal}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Goal
                </button>
              </div>
              <div className="space-y-4">
                {config.conversionGoals.map((goal, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Goal name"
                        value={goal.name}
                        onChange={(e) => updateConversionGoal(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="CSS selector"
                          value={goal.selector}
                          onChange={(e) => updateConversionGoal(index, 'selector', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <select
                          value={goal.action}
                          onChange={(e) => updateConversionGoal(index, 'action', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="click">Click</option>
                          <option value="submit">Submit</option>
                          <option value="view">View</option>
                        </select>
                      </div>
                      <button
                        onClick={() => removeConversionGoal(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Goal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Analytics Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}