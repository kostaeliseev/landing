import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Wand2, Target, Users, FileText, Package } from 'lucide-react';
import { useLandingPageStore } from '../../stores/landingPageStore';

const campaignSetupSchema = z.object({
  targetAudience: z.string().min(5, 'Please describe your target audience'),
  productOffer: z.string().min(10, 'Please describe your product or offer'),
  funnelStage: z.enum(['awareness', 'consideration', 'conversion', 'retention']),
  copywritingStrategy: z.enum(['problem-agitate-solve', 'before-after-bridge', 'features-advantages-benefits', 'storytelling', 'social-proof-heavy', 'urgency-scarcity', 'authority-positioning']),
  campaignGoal: z.string().min(5, 'Please describe your campaign goal'),
  brandVoice: z.enum(['professional', 'friendly', 'authoritative', 'conversational', 'luxury', 'energetic', 'trustworthy']),
  keyBenefits: z.string().min(10, 'List your main benefits/value propositions'),
  painPoints: z.string().min(10, 'What problems does your product solve?'),
  uniqueSellingProposition: z.string().min(10, 'What makes you different from competitors?'),
  pricePoint: z.enum(['free', 'low-cost', 'mid-range', 'premium', 'luxury']),
});

type CampaignSetupData = z.infer<typeof campaignSetupSchema>;

interface CampaignSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CampaignSetupData) => void;
}

export const CampaignSetupForm: React.FC<CampaignSetupFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { currentPage, updateBrandSettings } = useLandingPageStore();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<CampaignSetupData>({
    resolver: zodResolver(campaignSetupSchema),
    mode: 'onChange',
    defaultValues: {
      funnelStage: 'conversion',
      copywritingStrategy: 'problem-agitate-solve',
      brandVoice: 'professional',
      pricePoint: 'mid-range',
    },
  });

  const handleFormSubmit = (data: CampaignSetupData) => {
    // Save the campaign data to the current page
    if (currentPage) {
      updateBrandSettings({
        campaignData: data,
      } as any);
    }
    
    onSubmit(data);
    onClose();
    reset();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Campaign Setup</h2>
              <p className="text-gray-600">Help AI create your perfect landing page</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
            {/* Step 1: Audience & Product */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Target Audience & Product</h3>
                  <p className="text-gray-600">Tell us about your audience and what you're offering</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience *
                  </label>
                  <textarea
                    {...register('targetAudience')}
                    className="input-field h-24 resize-none"
                    placeholder="E.g., Small business owners aged 30-50 who struggle with digital marketing and want to increase online sales..."
                  />
                  {errors.targetAudience && (
                    <p className="text-red-600 text-sm mt-1">{errors.targetAudience.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product/Offer Description *
                  </label>
                  <textarea
                    {...register('productOffer')}
                    className="input-field h-24 resize-none"
                    placeholder="E.g., A comprehensive digital marketing course that teaches small businesses how to generate leads online, including social media marketing, email campaigns, and conversion optimization..."
                  />
                  {errors.productOffer && (
                    <p className="text-red-600 text-sm mt-1">{errors.productOffer.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Point *
                  </label>
                  <select {...register('pricePoint')} className="input-field">
                    <option value="free">Free</option>
                    <option value="low-cost">Low-cost ($1-$50)</option>
                    <option value="mid-range">Mid-range ($51-$500)</option>
                    <option value="premium">Premium ($501-$2000)</option>
                    <option value="luxury">Luxury ($2000+)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Campaign Strategy */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Wand2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Campaign Strategy</h3>
                  <p className="text-gray-600">Choose your funnel stage and copywriting approach</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funnel Stage *
                  </label>
                  <select {...register('funnelStage')} className="input-field">
                    <option value="awareness">Awareness - Introducing the problem</option>
                    <option value="consideration">Consideration - Exploring solutions</option>
                    <option value="conversion">Conversion - Ready to buy</option>
                    <option value="retention">Retention - Existing customers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Copywriting Strategy *
                  </label>
                  <select {...register('copywritingStrategy')} className="input-field">
                    <option value="problem-agitate-solve">Problem-Agitate-Solve (PAS)</option>
                    <option value="before-after-bridge">Before-After-Bridge (BAB)</option>
                    <option value="features-advantages-benefits">Features-Advantages-Benefits (FAB)</option>
                    <option value="storytelling">Storytelling Approach</option>
                    <option value="social-proof-heavy">Social Proof Heavy</option>
                    <option value="urgency-scarcity">Urgency & Scarcity</option>
                    <option value="authority-positioning">Authority Positioning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Voice *
                  </label>
                  <select {...register('brandVoice')} className="input-field">
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                    <option value="luxury">Luxury</option>
                    <option value="energetic">Energetic</option>
                    <option value="trustworthy">Trustworthy</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Value Proposition */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Value Proposition</h3>
                  <p className="text-gray-600">Define what makes your offer compelling</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Benefits/Value Propositions *
                  </label>
                  <textarea
                    {...register('keyBenefits')}
                    className="input-field h-24 resize-none"
                    placeholder="E.g., Save 10+ hours per week, Increase leads by 300%, Get expert guidance, 24/7 support..."
                  />
                  {errors.keyBenefits && (
                    <p className="text-red-600 text-sm mt-1">{errors.keyBenefits.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pain Points You Solve *
                  </label>
                  <textarea
                    {...register('painPoints')}
                    className="input-field h-24 resize-none"
                    placeholder="E.g., Wasting money on ineffective ads, Struggling to generate quality leads, Feeling overwhelmed by marketing complexity..."
                  />
                  {errors.painPoints && (
                    <p className="text-red-600 text-sm mt-1">{errors.painPoints.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unique Selling Proposition *
                  </label>
                  <textarea
                    {...register('uniqueSellingProposition')}
                    className="input-field h-24 resize-none"
                    placeholder="E.g., Only course taught by former Google Ads manager, includes 1-on-1 coaching, 90-day money-back guarantee..."
                  />
                  {errors.uniqueSellingProposition && (
                    <p className="text-red-600 text-sm mt-1">{errors.uniqueSellingProposition.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Campaign Goal */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Campaign Goal</h3>
                  <p className="text-gray-600">What do you want to achieve with this landing page?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Campaign Goal *
                  </label>
                  <textarea
                    {...register('campaignGoal')}
                    className="input-field h-24 resize-none"
                    placeholder="E.g., Generate 100 qualified leads per month for our digital marketing course, with a target cost per lead of $25..."
                  />
                  {errors.campaignGoal && (
                    <p className="text-red-600 text-sm mt-1">{errors.campaignGoal.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${
                  step === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={step === 1}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i + 1 <= step ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Generate Landing Page</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};