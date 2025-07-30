import React, { useState } from 'react';
import { X, Upload, Star, Check, Wand2, Image, Plus, Trash2 } from 'lucide-react';

interface ComprehensiveSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (config: any) => void;
  isGenerating: boolean;
}

interface SectionOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  required?: boolean;
}

const availableSections: SectionOption[] = [
  { id: 'header', name: 'Header/Navigation', description: 'Navigation menu with logo and links', icon: '🔝', required: true },
  { id: 'hero', name: 'Hero Section', description: 'Main headline and call-to-action', icon: '🚀', required: true },
  { id: 'features', name: 'Features', description: 'Product features and benefits', icon: '⭐' },
  { id: 'how-it-works', name: 'How It Works', description: 'Step-by-step process explanation', icon: '🔄' },
  { id: 'testimonials', name: 'Testimonials', description: 'Customer reviews and social proof', icon: '💬' },
  { id: 'pricing', name: 'Pricing', description: 'Pricing plans and packages', icon: '💰' },
  { id: 'comparison', name: 'Comparison Table', description: 'Feature comparison vs competitors', icon: '📊' },
  { id: 'faq', name: 'FAQ', description: 'Frequently asked questions', icon: '❓' },
  { id: 'video', name: 'Video Section', description: 'Product demo or testimonial video', icon: '🎥' },
  { id: 'leadform', name: 'Lead Form', description: 'Contact form for lead generation', icon: '📝' },
  { id: 'cta', name: 'Call-to-Action', description: 'Final conversion section', icon: '🎯' },
  { id: 'footer', name: 'Footer', description: 'Links, contact info, and legal', icon: '🔚', required: true },
];

export function ComprehensiveSetup({ isOpen, onClose, onGenerate, isGenerating }: ComprehensiveSetupProps) {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    targetAudience: '',
    productOffer: '',
    funnelStage: 'conversion',
    campaignGoal: '',
    keyBenefits: '',
    painPoints: '',
    copywritingStrategy: 'direct-response',
    brandVoice: 'professional'
  });
  
  const [brandAssets, setBrandAssets] = useState({
    logo: '',
    credibilityIcons: [] as string[],
    brandColors: {
      primary: '#2563eb',
      secondary: '#1e293b',
      accent: '#f59e0b'
    }
  });
  
  const [selectedSections, setSelectedSections] = useState<string[]>(['header', 'hero', 'features', 'cta', 'footer']);
  const [designStyle, setDesignStyle] = useState('modern');

  if (!isOpen) return null;

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandAssets(prev => ({ ...prev, logo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCredibilityIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandAssets(prev => ({
          ...prev,
          credibilityIcons: [...prev.credibilityIcons, e.target?.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeCredibilityIcon = (index: number) => {
    setBrandAssets(prev => ({
      ...prev,
      credibilityIcons: prev.credibilityIcons.filter((_, i) => i !== index)
    }));
  };

  const toggleSection = (sectionId: string) => {
    const section = availableSections.find(s => s.id === sectionId);
    if (section?.required) return; // Can't toggle required sections
    
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleGenerate = () => {
    const config = {
      campaign: campaignData,
      brandAssets,
      selectedSections,
      designStyle
    };
    onGenerate(config);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Campaign Setup</h3>
        <p className="text-gray-600">Tell us about your campaign goals and target audience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Target Audience *</label>
          <input
            type="text"
            value={campaignData.targetAudience}
            onChange={(e) => setCampaignData({...campaignData, targetAudience: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Small business owners, Marketing managers"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Product/Offer *</label>
          <input
            type="text"
            value={campaignData.productOffer}
            onChange={(e) => setCampaignData({...campaignData, productOffer: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., SaaS platform, Consulting service"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Campaign Goal *</label>
        <input
          type="text"
          value={campaignData.campaignGoal}
          onChange={(e) => setCampaignData({...campaignData, campaignGoal: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Generate qualified leads, Drive software trials"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Key Benefits</label>
        <textarea
          value={campaignData.keyBenefits}
          onChange={(e) => setCampaignData({...campaignData, keyBenefits: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
          placeholder="List the main benefits and value propositions..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Funnel Stage</label>
          <select
            value={campaignData.funnelStage}
            onChange={(e) => setCampaignData({...campaignData, funnelStage: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="awareness">Awareness - Education & Problem Identification</option>
            <option value="consideration">Consideration - Solution Comparison & Evaluation</option>
            <option value="conversion">Conversion - Decision Making & Action</option>
            <option value="retention">Retention - Maximizing Value & Satisfaction</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Brand Voice</label>
          <select
            value={campaignData.brandVoice}
            onChange={(e) => setCampaignData({...campaignData, brandVoice: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="urgent">Urgent</option>
            <option value="casual">Casual</option>
            <option value="authoritative">Authoritative</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Copywriting Strategy</label>
        <select
          value={campaignData.copywritingStrategy}
          onChange={(e) => setCampaignData({...campaignData, copywritingStrategy: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="direct-response">Direct Response - Clear, Action-Oriented, Results-Focused</option>
          <option value="story-driven">Story-Driven - Narrative, Customer Journey, Emotional Connection</option>
          <option value="problem-solution">Problem-Solution - Pain Points First, Solution-Focused</option>
          <option value="benefit-focused">Benefit-Focused - Outcome-Driven, Value Proposition</option>
          <option value="social-proof">Social Proof - Testimonials, Case Studies, Peer Validation</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Choose the copywriting approach that aligns with your campaign objective and target audience
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Brand Assets</h3>
        <p className="text-gray-600">Upload your logo and credibility icons for better conversion</p>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-4">Company Logo</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          {brandAssets.logo ? (
            <div className="space-y-4">
              <img src={brandAssets.logo} alt="Logo" className="max-h-20 mx-auto rounded" />
              <button
                onClick={() => setBrandAssets(prev => ({ ...prev, logo: '' }))}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove Logo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-gray-600">Drop your logo here or click to upload</p>
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
            className="inline-block cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors mt-4"
          >
            Choose Logo
          </label>
        </div>
      </div>

      {/* Credibility Icons */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-4">
          Credibility Icons (Awards, Certifications, Partner Logos)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <div className="space-y-4">
            <Star className="w-10 h-10 text-gray-400 mx-auto" />
            <p className="text-gray-600">Upload badges, awards, partner logos, certifications</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleCredibilityIconUpload}
              className="hidden"
              id="credibility-upload"
            />
            <label
              htmlFor="credibility-upload"
              className="inline-block cursor-pointer bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              Upload Icons
            </label>
          </div>
        </div>

        {brandAssets.credibilityIcons.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Icons:</h4>
            <div className="grid grid-cols-4 gap-4">
              {brandAssets.credibilityIcons.map((icon, index) => (
                <div key={index} className="relative group">
                  <img src={icon} alt={`Credibility ${index + 1}`} className="w-full h-16 object-contain bg-gray-50 rounded border" />
                  <button
                    onClick={() => removeCredibilityIcon(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-4">Brand Colors</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(brandAssets.brandColors).map(([key, color]) => (
            <div key={key} className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 capitalize w-20">{key}</label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setBrandAssets(prev => ({
                    ...prev,
                    brandColors: { ...prev.brandColors, [key]: e.target.value }
                  }))}
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Sections</h3>
        <p className="text-gray-600">Choose which sections to include in your landing page</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableSections.map((section) => {
          const isSelected = selectedSections.includes(section.id);
          const isRequired = section.required;
          
          return (
            <div
              key={section.id}
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isRequired ? 'opacity-75' : ''}`}
              onClick={() => !isRequired && toggleSection(section.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{section.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{section.name}</h4>
                    {isRequired && (
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Required</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Selected: {selectedSections.length} sections</h4>
            <p className="text-sm text-blue-700 mt-1">
              We recommend 5-8 sections for optimal conversion. Required sections cannot be removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Design Style</h3>
        <p className="text-gray-600">Choose your preferred design aesthetic</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'modern', name: 'Modern', description: 'Clean lines, minimal, professional', preview: '🏢' },
          { id: 'creative', name: 'Creative', description: 'Bold colors, artistic, engaging', preview: '🎨' },
          { id: 'corporate', name: 'Corporate', description: 'Traditional, trustworthy, formal', preview: '💼' },
          { id: 'startup', name: 'Startup', description: 'Dynamic, innovative, tech-focused', preview: '🚀' },
          { id: 'luxury', name: 'Luxury', description: 'Elegant, sophisticated, premium', preview: '💎' },
          { id: 'playful', name: 'Playful', description: 'Fun, energetic, approachable', preview: '🎪' },
        ].map((style) => (
          <div
            key={style.id}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 text-center ${
              designStyle === style.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setDesignStyle(style.id)}
          >
            <div className="text-4xl mb-3">{style.preview}</div>
            <h4 className="font-semibold text-gray-900 mb-2">{style.name}</h4>
            <p className="text-sm text-gray-600">{style.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold">AI Campaign Setup</h2>
              <p className="text-purple-100 text-sm">Step {step} of 4 - Complete setup for perfect results</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum <= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum < step ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      stepNum < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>

          {/* Navigation */}
          <div className="border-t px-8 py-6 flex justify-between bg-gray-50 rounded-b-2xl">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!campaignData.targetAudience || !campaignData.productOffer || !campaignData.campaignGoal)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium disabled:opacity-50 transition-all duration-200 flex items-center space-x-2"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                <span>{isGenerating ? 'Generating...' : 'Generate Landing Page'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}