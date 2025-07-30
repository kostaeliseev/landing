import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { LandingPageSection } from '../../types';
import { useLandingPageStore } from '../../stores/landingPageStore';

interface PricingSectionProps {
  section: LandingPageSection;
  isPreview?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ section, isPreview }) => {
  const { currentPage } = useLandingPageStore();
  const data = section.data;

  const defaultPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['5 Projects', 'Basic Support', '10GB Storage', 'Email Integration'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: ['25 Projects', 'Priority Support', '100GB Storage', 'Advanced Analytics', 'Team Collaboration'],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: ['Unlimited Projects', '24/7 Support', '1TB Storage', 'Custom Integrations', 'Advanced Security'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const plans = data.plans || defaultPlans;

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
              fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
            }}
          >
            {data.headline || 'Choose Your Plan'}
          </h2>
          {data.subheadline && (
            <p 
              className="text-xl opacity-80 max-w-3xl mx-auto mb-8"
              style={{ 
                color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                fontFamily: currentPage?.brandSettings.fonts.body || 'Inter'
              }}
            >
              {data.subheadline}
            </p>
          )}
          
          {/* Money Back Guarantee */}
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8">
            <Check className="w-4 h-4 mr-2" />
            30-day money-back guarantee
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan: any, index: number) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 scale-105 z-10' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ 
                    color: section.style.textColor || currentPage?.brandSettings.colors.text || '#1f2937',
                    fontFamily: currentPage?.brandSettings.fonts.heading || 'Inter'
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span 
                    className="text-4xl font-bold"
                    style={{ color: currentPage?.brandSettings.colors.primary || '#3b82f6' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span 
                        className="text-gray-700"
                        style={{ fontFamily: currentPage?.brandSettings.fonts.body || 'Inter' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                    plan.popular
                      ? 'text-white shadow-lg'
                      : 'border-2 hover:bg-opacity-10'
                  }`}
                  style={{
                    backgroundColor: plan.popular 
                      ? currentPage?.brandSettings.colors.primary || '#3b82f6'
                      : 'transparent',
                    borderColor: currentPage?.brandSettings.colors.primary || '#3b82f6',
                    color: plan.popular 
                      ? '#ffffff'
                      : currentPage?.brandSettings.colors.primary || '#3b82f6',
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {data.additionalInfo && (
          <div className="text-center mt-12">
            <p className="text-gray-600 max-w-2xl mx-auto">
              {data.additionalInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};