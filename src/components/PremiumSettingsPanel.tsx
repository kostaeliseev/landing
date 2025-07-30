import React, { useState } from 'react';
import { 
  X, Settings, Palette, Monitor, Globe, Shield, 
  Zap, Bell, User, Key, Database, Download,
  Moon, Sun, Eye, EyeOff, Crown, Star,
  ChevronRight, Info, CheckCircle, AlertCircle
} from 'lucide-react';

interface PremiumSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stickyCTAConfig: any;
  onStickyCTAConfigChange: (config: any) => void;
}

export function PremiumSettingsPanel({ 
  isOpen, 
  onClose, 
  stickyCTAConfig, 
  onStickyCTAConfigChange 
}: PremiumSettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'performance', label: 'Performance', icon: Zap },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-blue-600" />
          General Settings
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <label className="font-medium text-slate-900">Auto Save</label>
              <p className="text-sm text-slate-600">Automatically save changes every 30 seconds</p>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSave ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <label className="font-medium text-slate-900">Notifications</label>
              <p className="text-sm text-slate-600">Receive updates about exports and AI generation</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span className="font-medium text-amber-900">AI API Configuration</span>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  defaultValue={localStorage.getItem('geminiApiKey') || ''}
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-3 text-amber-600 hover:text-amber-700"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-amber-700">
                Your API key is stored locally and never sent to our servers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-purple-600" />
          Appearance
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <label className="font-medium text-slate-900">Dark Mode</label>
              <p className="text-sm text-slate-600">Switch to dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <label className="font-medium text-slate-900 mb-3 block">Theme Color</label>
            <div className="grid grid-cols-6 gap-3">
              {[
                { name: 'Blue', color: 'bg-blue-500' },
                { name: 'Purple', color: 'bg-purple-500' },
                { name: 'Pink', color: 'bg-pink-500' },
                { name: 'Green', color: 'bg-green-500' },
                { name: 'Orange', color: 'bg-orange-500' },
                { name: 'Indigo', color: 'bg-indigo-500' },
              ].map((theme) => (
                <button
                  key={theme.name}
                  className={`w-12 h-12 rounded-xl ${theme.color} hover:scale-110 transition-transform shadow-lg`}
                  title={theme.name}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <label className="font-medium text-slate-900 mb-3 block">Canvas View</label>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-3 border border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Monitor className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                <div className="text-xs text-slate-600">Desktop</div>
              </button>
              <button className="p-3 border border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Globe className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                <div className="text-xs text-slate-600">Tablet</div>
              </button>
              <button className="p-3 border border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Monitor className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                <div className="text-xs text-slate-600">Mobile</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-600" />
          Performance & Storage
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <label className="font-medium text-slate-900">Auto-save Interval</label>
              <p className="text-sm text-slate-600">How often to save your work</p>
            </div>
            <select className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
              <option value="0">Manual only</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <label className="font-medium text-slate-900 mb-3 block">Storage Management</label>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="font-medium text-slate-900">Clear Browser Cache</div>
                <div className="text-sm text-slate-600">Clear stored images and assets</div>
              </button>
              <button className="w-full p-3 text-left border border-slate-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                <div className="font-medium text-slate-900">Reset All Settings</div>
                <div className="text-sm text-slate-600">Reset to default preferences</div>
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Local Storage</span>
            </div>
            <div className="text-sm text-blue-700">
              Your landing pages are saved locally in your browser
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'performance':
        return renderPerformanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Settings</h2>
              <p className="text-sm text-slate-600">Customize your landing page builder</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-blue-600 border border-blue-100'
                      : 'text-slate-600 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="text-sm text-slate-600">
            Last saved: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumSettingsPanel;