import React, { useEffect, useState } from 'react';
import { 
  Plus, Settings, Eye, Download, Save, Palette, Wand2, 
  Layers, Monitor, Smartphone, Tablet,
  Search, ChevronDown, Grid,
  Zap, Sparkles
} from 'lucide-react';
import { DragDropCanvas } from './components/editor/DragDropCanvas';
import { CampaignSetupForm } from './components/forms/CampaignSetupForm';
import { BrandCustomizationPanel } from './components/ui/BrandCustomizationPanel';
import WorkingSettingsPanel from './components/WorkingSettingsPanel';
import { StickyCTA, defaultStickyCTAConfig } from './components/StickyCTA';
import { useLandingPageStore } from './stores/landingPageStore';
import { geminiService } from './services/geminiService';
import { HTMLExportService } from './services/htmlExportService';

function App() {
  const {
    currentPage,
    pages,
    createNewPage,
    loadAllPages,
    savePage,
  } = useLandingPageStore();

  const [isSetupFormOpen, setIsSetupFormOpen] = useState(false);
  const [isBrandPanelOpen, setIsBrandPanelOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stickyCTAConfig, setStickyCTAConfig] = useState(() => {
    const saved = localStorage.getItem('stickyCTAConfig');
    return saved ? JSON.parse(saved) : defaultStickyCTAConfig;
  });
  const [geminiApiKey, setGeminiApiKey] = useState(
    localStorage.getItem('geminiApiKey') || ''
  );

  useEffect(() => {
    loadAllPages();
  }, [loadAllPages]);

  useEffect(() => {
    if (geminiApiKey) {
      geminiService.initialize(geminiApiKey);
      localStorage.setItem('geminiApiKey', geminiApiKey);
    }
  }, [geminiApiKey]);

  useEffect(() => {
    localStorage.setItem('stickyCTAConfig', JSON.stringify(stickyCTAConfig));
  }, [stickyCTAConfig]);

  const handleCreateNewPage = () => {
    const pageName = prompt('Enter landing page name:');
    if (pageName) {
      createNewPage(pageName.trim());
    }
  };

  const handleCampaignSetup = async (campaignData: any) => {
    if (!geminiService.isInitialized()) {
      alert('Please configure your Gemini API key first');
      return;
    }

    if (!currentPage) {
      const pageName = `${campaignData.productOffer.split(' ').slice(0, 3).join(' ')} Landing Page`;
      createNewPage(pageName);
    }

    try {
      await generateLandingPageWithAI(campaignData);
    } catch (error) {
      console.error('Failed to generate landing page:', error);
      alert('Failed to generate landing page. Please check your API key and try again.');
    }
  };

  const generateLandingPageWithAI = async (campaignData: any) => {
    const { addSection } = useLandingPageStore.getState();
    
    try {
      const heroContent = await geminiService.generateContent({
        prompt: `Create a compelling hero section for a ${campaignData.funnelStage} stage landing page`,
        sectionType: 'hero',
        brandInfo: campaignData.productOffer,
        targetAudience: campaignData.targetAudience,
        campaignGoal: campaignData.campaignGoal,
        funnelStage: campaignData.funnelStage,
      });
      addSection('hero', heroContent);
    } catch (error) {
      console.error('Failed to generate hero section:', error);
    }

    setTimeout(() => {
      savePage();
    }, 1000);

    alert('Landing page generated successfully! 🎉');
  };

  const handleSave = async () => {
    if (currentPage) {
      await savePage();
      alert('Page saved successfully!');
    }
  };

  const handleExport = () => {
    if (!currentPage) {
      alert('Please create a landing page first');
      return;
    }
    
    try {
      HTMLExportService.downloadHTML(currentPage);
      alert('HTML file downloaded successfully! 🎉');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export HTML. Please try again.');
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const apiKey = formData.get('apiKey') as string;
    setGeminiApiKey(apiKey);
  };

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Premium Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-xl`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-purple-600">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Landing Builder
                  </h1>
                  <span className="text-xs text-blue-100">Professional</span>
                </div>
              </div>
              <p className="text-blue-100 text-sm">
                AI-powered landing pages that convert
              </p>
            </>
          ) : (
            <div className="flex justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Premium API Key Setup */}
        {!geminiApiKey && !sidebarCollapsed && (
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="font-semibold text-amber-900 text-sm">AI Setup Required</h3>
            </div>
            <form onSubmit={handleApiKeySubmit} className="space-y-3">
              <input
                name="apiKey"
                type="password"
                placeholder="Enter Gemini API Key"
                className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
              <button 
                type="submit" 
                className="w-full px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Activate AI ✨
              </button>
            </form>
          </div>
        )}

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Pages List */}
        <div className="flex-1 overflow-y-auto">
          {!sidebarCollapsed ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900 flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>Your Pages</span>
                </h2>
                <button
                  onClick={handleCreateNewPage}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="Create new page"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentPage?.id === page.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'hover:bg-slate-50 border border-slate-100'
                    }`}
                    onClick={() => useLandingPageStore.getState().loadPage(page.id)}
                  >
                    <div className="font-medium truncate">{page.name}</div>
                    <div className={`text-sm flex items-center space-x-2 ${
                      currentPage?.id === page.id ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      <Grid className="w-3 h-3" />
                      <span>{page.sections.length} sections</span>
                      {page.sections.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <div className="w-1 h-1 bg-current rounded-full"></div>
                          <span className="text-xs">Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredPages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-500 mb-4">No landing pages yet</p>
                    <button
                      onClick={handleCreateNewPage}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                    >
                      Create Your First Page
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              <button
                onClick={handleCreateNewPage}
                className="w-full p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                title="Create new page"
              >
                <Plus className="w-5 h-5 mx-auto" />
              </button>
            </div>
          )}
        </div>

        {/* AI Generation */}
        <div className="p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          {!sidebarCollapsed ? (
            <>
              <button
                onClick={() => setIsSetupFormOpen(true)}
                disabled={!geminiApiKey}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Generate with AI</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                Create personalized landing pages with AI
              </p>
            </>
          ) : (
            <button
              onClick={() => setIsSetupFormOpen(true)}
              disabled={!geminiApiKey}
              className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
              title="Generate with AI"
            >
              <Wand2 className="w-5 h-5 mx-auto" />
            </button>
          )}
        </div>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-slate-200">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
          >
            <ChevronDown className={`w-4 h-4 mx-auto transition-transform ${sidebarCollapsed ? 'rotate-90' : '-rotate-90'}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Premium Toolbar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="font-semibold text-slate-900 flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                <span>{currentPage?.name || 'No Page Selected'}</span>
              </h2>
              {currentPage && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Live</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  title="Desktop view"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  title="Tablet view"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                  title="Mobile view"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  disabled={!currentPage}
                  className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50"
                  title="Save page"
                >
                  <Save className="w-5 h-5" />
                </button>
                
                <button
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="Preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleExport}
                  disabled={!currentPage}
                  className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all disabled:opacity-50"
                  title="Export HTML"
                >
                  <Download className="w-5 h-5" />
                </button>
                
                <div className="w-px h-6 bg-slate-200"></div>
                
                <button
                  onClick={() => setIsBrandPanelOpen(true)}
                  className="p-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all relative group"
                  title="Theme & Branding"
                >
                  <Palette className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Theme & Branding
                  </span>
                </button>
                
                <button
                  onClick={() => setIsSettingsPanelOpen(true)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className={`flex-1 bg-slate-50 transition-all duration-300 ${
          viewMode === 'mobile' ? 'px-4' : viewMode === 'tablet' ? 'px-8' : 'px-0'
        }`}>
          <div className={`h-full transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-sm mx-auto' : 
            viewMode === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'
          }`}>
            <DragDropCanvas className="h-full" />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CampaignSetupForm
        isOpen={isSetupFormOpen}
        onClose={() => setIsSetupFormOpen(false)}
        onSubmit={handleCampaignSetup}
      />

      <BrandCustomizationPanel
        isOpen={isBrandPanelOpen}
        onClose={() => setIsBrandPanelOpen(false)}
      />

      <WorkingSettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        stickyCTAConfig={stickyCTAConfig}
        onStickyCTAConfigChange={setStickyCTAConfig}
      />

      <StickyCTA config={stickyCTAConfig} />
    </div>
  );
}

export default App;