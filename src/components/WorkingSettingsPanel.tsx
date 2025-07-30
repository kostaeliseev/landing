import React, { useState, useEffect } from 'react';
import { 
  X, Settings, Palette, Monitor, Database, 
  Zap, Sun, Moon, CheckCircle, Info,
  Eye, EyeOff, ChevronRight
} from 'lucide-react';

interface WorkingSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stickyCTAConfig: any;
  onStickyCTAConfigChange: (config: any) => void;
}

interface AppSettings {
  darkMode: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
  notifications: boolean;
  themeColor: string;
  geminiApiKey: string;
}

export function WorkingSettingsPanel({ 
  isOpen, 
  onClose, 
  stickyCTAConfig, 
  onStickyCTAConfigChange 
}: WorkingSettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Load settings from localStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : {
      darkMode: false,
      autoSave: true,
      autoSaveInterval: 30,
      notifications: true,
      themeColor: '#3b82f6',
      geminiApiKey: localStorage.getItem('geminiApiKey') || '',
    };
  });

  // Apply dark mode to document
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Save API key separately
    if (settings.geminiApiKey) {
      localStorage.setItem('geminiApiKey', settings.geminiApiKey);
    }
    
    // Apply theme color to CSS custom properties
    document.documentElement.style.setProperty('--primary-color', settings.themeColor);
    
    setHasChanges(false);
    
    // Show success feedback
    const originalText = 'Settings saved successfully!';
    alert(originalText);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings: AppSettings = {
        darkMode: false,
        autoSave: true,
        autoSaveInterval: 30,
        notifications: true,
        themeColor: '#3b82f6',
        geminiApiKey: '',
      };
      setSettings(defaultSettings);
      setHasChanges(true);
    }
  };

  const clearCache = () => {
    if (confirm('This will clear all cached data. Continue?')) {
      // Clear various cache keys
      const keysToKeep = ['appSettings', 'geminiApiKey', 'landing-page-storage'];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      alert('Cache cleared successfully!');
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'performance', label: 'Performance', icon: Zap },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-blue-600" />
        General Settings
      </h3>
      
      {/* Auto Save */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <div>
          <label className="font-medium text-slate-900">Auto Save</label>
          <p className="text-sm text-slate-600">Automatically save changes</p>
        </div>
        <button
          onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.autoSave ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.autoSave ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Auto Save Interval */}
      {settings.autoSave && (
        <div className="p-4 bg-slate-50 rounded-xl">
          <label className="font-medium text-slate-900 mb-3 block">Auto-save Interval</label>
          <select 
            value={settings.autoSaveInterval}
            onChange={(e) => handleSettingChange('autoSaveInterval', parseInt(e.target.value))}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </div>
      )}

      {/* Notifications */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <div>
          <label className="font-medium text-slate-900">Notifications</label>
          <p className="text-sm text-slate-600">Show success/error messages</p>
        </div>
        <button
          onClick={() => handleSettingChange('notifications', !settings.notifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* API Key */}
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
              value={settings.geminiApiKey}
              onChange={(e) => handleSettingChange('geminiApiKey', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
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
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2 text-purple-600" />
        Appearance
      </h3>
      
      {/* Dark Mode */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <div className="flex items-center space-x-3">
          {settings.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <div>
            <label className="font-medium text-slate-900">Dark Mode</label>
            <p className="text-sm text-slate-600">Switch to dark theme</p>
          </div>
        </div>
        <button
          onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.darkMode ? 'bg-purple-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Theme Color */}
      <div className="p-4 bg-slate-50 rounded-xl">
        <label className="font-medium text-slate-900 mb-3 block">Theme Color</label>
        <div className="grid grid-cols-8 gap-3">
          {[
            { name: 'Blue', color: '#3b82f6' },
            { name: 'Purple', color: '#8b5cf6' },
            { name: 'Pink', color: '#ec4899' },
            { name: 'Green', color: '#10b981' },
            { name: 'Orange', color: '#f59e0b' },
            { name: 'Red', color: '#ef4444' },
            { name: 'Indigo', color: '#6366f1' },
            { name: 'Teal', color: '#14b8a6' },
          ].map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleSettingChange('themeColor', theme.color)}
              className={`w-10 h-10 rounded-xl hover:scale-110 transition-transform shadow-lg relative ${
                settings.themeColor === theme.color ? 'ring-2 ring-slate-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
            >
              {settings.themeColor === theme.color && (
                <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-yellow-600" />
        Performance & Storage
      </h3>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center space-x-2 mb-2">
          <Database className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-900">Local Storage</span>
        </div>
        <div className="text-sm text-blue-700 mb-3">
          Your landing pages are saved locally in your browser
        </div>
        <div className="flex space-x-2">
          <button
            onClick={clearCache}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Clear Cache
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Reset Settings
          </button>
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
            {hasChanges && (
              <span className="text-amber-600 font-medium">You have unsaved changes</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={!hasChanges}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkingSettingsPanel;