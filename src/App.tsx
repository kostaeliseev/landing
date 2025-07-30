import React, { useEffect, useState } from 'react';
import { Plus, Settings, Eye, Download, Save, Palette, Wand2 } from 'lucide-react';
import { DragDropCanvas } from './components/editor/DragDropCanvas';
import { CampaignSetupForm } from './components/forms/CampaignSetupForm';
import { BrandCustomizationPanel } from './components/ui/BrandCustomizationPanel';
import { SettingsPanel } from './components/settings/SettingsPanel';
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
  const [stickyCTAConfig, setStickyCTAConfig] = useState(() => {
    const saved = localStorage.getItem('stickyCTAConfig');
    return saved ? JSON.parse(saved) : defaultStickyCTAConfig;
  });
  const [geminiApiKey, setGeminiApiKey] = useState(
    localStorage.getItem('geminiApiKey') || ''
  );

  useEffect(() => {
    // Load saved pages on app start
    loadAllPages();
  }, [loadAllPages]);

  useEffect(() => {
    // Initialize Gemini service if API key exists
    if (geminiApiKey) {
      geminiService.initialize(geminiApiKey);
      localStorage.setItem('geminiApiKey', geminiApiKey);
    }
  }, [geminiApiKey]);

  useEffect(() => {
    // Save sticky CTA config to localStorage
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

    // Create a new landing page if none exists
    if (!currentPage) {
      const pageName = `${campaignData.productOffer.split(' ').slice(0, 3).join(' ')} Landing Page`;
      createNewPage(pageName);
    }

    try {
      // Generate sections based on campaign data
      await generateLandingPageWithAI(campaignData);
    } catch (error) {
      console.error('Failed to generate landing page:', error);
      alert('Failed to generate landing page. Please check your API key and try again.');
    }
  };

  const generateLandingPageWithAI = async (campaignData: any) => {
    const { addSection } = useLandingPageStore.getState();
    
    // Generate Hero Section
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

    // Generate Features Section
    try {
      const featuresContent = await geminiService.generateContent({
        prompt: `Create a features section highlighting the key benefits and value propositions: ${campaignData.keyBenefits}`,
        sectionType: 'features',
        brandInfo: campaignData.productOffer,
        targetAudience: campaignData.targetAudience,
        campaignGoal: campaignData.campaignGoal,
        funnelStage: campaignData.funnelStage,
      });
      
      addSection('features', featuresContent);
    } catch (error) {
      console.error('Failed to generate features section:', error);
    }

    // Generate How It Works Section
    addSection('how-it-works', {
      headline: 'How It Works',
      subheadline: 'Get started in just a few simple steps',
      steps: [
        {
          number: 1,
          title: 'Sign Up',
          description: 'Create your account in under 60 seconds',
          icon: 'Users',
          color: '#3B82F6',
          time: '1 min'
        },
        {
          number: 2,
          title: 'Setup',
          description: 'Configure your preferences with our guided setup',
          icon: 'Settings',
          color: '#10B981',
          time: '5 mins'
        },
        {
          number: 3,
          title: 'Launch',
          description: 'Go live and start seeing results immediately',
          icon: 'Play',
          color: '#8B5CF6',
          time: '1 hour'
        }
      ]
    });

    // Generate Testimonials Section
    try {
      const testimonialsContent = await geminiService.generateContent({
        prompt: `Create authentic testimonials for ${campaignData.targetAudience} who have used this ${campaignData.productOffer}`,
        sectionType: 'testimonials',
        brandInfo: campaignData.productOffer,
        targetAudience: campaignData.targetAudience,
        campaignGoal: campaignData.campaignGoal,
        funnelStage: campaignData.funnelStage,
      });
      
      addSection('testimonials', testimonialsContent);
    } catch (error) {
      console.error('Failed to generate testimonials section:', error);
    }

    // Generate FAQ Section
    try {
      const faqContent = await geminiService.generateContent({
        prompt: `Create FAQs that address common concerns for ${campaignData.targetAudience} about ${campaignData.productOffer}. Address these pain points: ${campaignData.painPoints}`,
        sectionType: 'faq',
        brandInfo: campaignData.productOffer,
        targetAudience: campaignData.targetAudience,
        campaignGoal: campaignData.campaignGoal,
        funnelStage: campaignData.funnelStage,
      });
      
      addSection('faq', faqContent);
    } catch (error) {
      console.error('Failed to generate FAQ section:', error);
    }

    // Generate CTA Section
    try {
      const ctaContent = await geminiService.generateContent({
        prompt: `Create a compelling final call-to-action section that drives ${campaignData.campaignGoal}. Use ${campaignData.copywritingStrategy} approach with ${campaignData.brandVoice} tone.`,
        sectionType: 'cta',
        brandInfo: campaignData.productOffer,
        targetAudience: campaignData.targetAudience,
        campaignGoal: campaignData.campaignGoal,
        funnelStage: campaignData.funnelStage,
      });
      
      addSection('cta', ctaContent);
    } catch (error) {
      console.error('Failed to generate CTA section:', error);
    }

    // Auto-save the generated page
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            PPC Landing Builder
          </h1>
          <p className="text-gray-600 text-sm">
            Create high-converting landing pages with AI
          </p>
        </div>

        {/* Gemini API Key Setup */}
        {!geminiApiKey && (
          <div className="p-4 bg-yellow-50 border-b border-yellow-200">
            <h3 className="font-medium text-yellow-900 mb-2">Setup Required</h3>
            <form onSubmit={handleApiKeySubmit} className="space-y-2">
              <input
                name="apiKey"
                type="password"
                placeholder="Enter Gemini API Key"
                className="input-field text-sm"
                required
              />
              <button type="submit" className="btn-primary text-sm w-full">
                Save API Key
              </button>
            </form>
          </div>
        )}

        {/* Pages List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Your Pages</h2>
            <button
              onClick={handleCreateNewPage}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Create new page"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentPage?.id === page.id
                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => useLandingPageStore.getState().loadPage(page.id)}
              >
                <div className="font-medium truncate">{page.name}</div>
                <div className="text-sm text-gray-500">
                  {page.sections.length} sections
                </div>
              </div>
            ))}

            {pages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No landing pages yet</p>
                <button
                  onClick={handleCreateNewPage}
                  className="btn-primary"
                >
                  Create Your First Page
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AI Generation */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsSetupFormOpen(true)}
            disabled={!geminiApiKey}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className="w-4 h-4" />
            <span>Generate with AI</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Create personalized landing pages with AI
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-semibold text-gray-900">
              {currentPage?.name || 'No Page Selected'}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={!currentPage}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="Save page"
            >
              <Save className="w-5 h-5" />
            </button>
            
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Preview"
            >
              <Eye className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleExport}
              disabled={!currentPage}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="Export HTML"
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsBrandPanelOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Theme & Branding"
            >
              <Palette className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsSettingsPanelOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <DragDropCanvas className="flex-1" />
      </div>

      {/* Campaign Setup Modal */}
      <CampaignSetupForm
        isOpen={isSetupFormOpen}
        onClose={() => setIsSetupFormOpen(false)}
        onSubmit={handleCampaignSetup}
      />

      {/* Brand Customization Panel */}
      <BrandCustomizationPanel
        isOpen={isBrandPanelOpen}
        onClose={() => setIsBrandPanelOpen(false)}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
        stickyCTAConfig={stickyCTAConfig}
        onStickyCTAConfigChange={setStickyCTAConfig}
      />

      {/* Sticky CTA */}
      <StickyCTA config={stickyCTAConfig} />
    </div>
  );
}

export default App;