import React, { useState } from 'react';
import { Plus, Wand2, X } from 'lucide-react';
import { useLandingPageStore } from '../../stores/landingPageStore';
import { SectionType } from '../../types';

interface FixedAddSectionButtonProps {
  variant?: 'default' | 'primary';
}

export const FixedAddSectionButton: React.FC<FixedAddSectionButtonProps> = ({ 
  variant = 'default' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addSection } = useLandingPageStore();

  const sectionTypes: Array<{
    type: SectionType;
    label: string;
    description: string;
    icon: string;
  }> = [
    {
      type: 'hero',
      label: 'Hero Section',
      description: 'Main headline and call-to-action',
      icon: '🎯'
    },
    {
      type: 'features',
      label: 'Features',
      description: 'Highlight key features and benefits',
      icon: '⭐'
    },
    {
      type: 'testimonials',
      label: 'Testimonials',
      description: 'Customer reviews and social proof',
      icon: '💬'
    },
    {
      type: 'faq',
      label: 'FAQ',
      description: 'Frequently asked questions',
      icon: '❓'
    },
    {
      type: 'cta',
      label: 'Call to Action',
      description: 'Drive conversions with compelling CTA',
      icon: '🚀'
    },
    {
      type: 'leadform',
      label: 'Lead Form',
      description: 'Capture leads with forms',
      icon: '📝'
    },
    {
      type: 'video',
      label: 'Video',
      description: 'Embed videos from YouTube or upload',
      icon: '🎥'
    },
    {
      type: 'credibility',
      label: 'Credibility',
      description: 'Awards, certifications, and trust signals',
      icon: '🏆'
    },
    {
      type: 'header',
      label: 'Header',
      description: 'Navigation and branding',
      icon: '📱'
    },
    {
      type: 'footer',
      label: 'Footer',
      description: 'Links and contact information',
      icon: '📄'
    },
    {
      type: 'how-it-works',
      label: 'How It Works',
      description: 'Step-by-step process explanation',
      icon: '⚙️'
    },
    {
      type: 'pricing',
      label: 'Pricing',
      description: 'Pricing plans and packages',
      icon: '💰'
    },
  ];

  const handleAddSection = (sectionType: SectionType) => {
    const defaultData = getDefaultSectionData(sectionType);
    addSection(sectionType, defaultData);
    setIsOpen(false);
  };

  const buttonClass = variant === 'primary'
    ? 'px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg'
    : 'w-full p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2 text-slate-600 hover:text-blue-600 bg-white';

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClass}
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Section</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Add Section</h3>
                <p className="text-sm text-slate-600">Choose a section type to add to your page</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionTypes.map((section) => (
                  <button
                    key={section.type}
                    onClick={() => handleAddSection(section.type)}
                    className="p-4 text-left border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group hover:shadow-md"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{section.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                          {section.label}
                        </div>
                        <div className="text-sm text-slate-500 leading-tight">
                          {section.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function getDefaultSectionData(sectionType: SectionType) {
  const defaultData = {
    hero: {
      headline: 'Your Compelling Headline Here',
      subheadline: 'Supporting text that explains your value proposition',
      body: 'Detailed description of your offer that converts visitors into customers.',
      cta: 'Get Started Now',
      backgroundImage: '',
      videoUrl: '',
    },
    features: {
      headline: 'Why Choose Us',
      features: [
        { title: 'Feature 1', description: 'Description of your first key feature' },
        { title: 'Feature 2', description: 'Description of your second key feature' },
        { title: 'Feature 3', description: 'Description of your third key feature' },
      ],
    },
    testimonials: {
      headline: 'What Our Customers Say',
      testimonials: [
        { name: 'John Doe', role: 'CEO, Company', content: 'This service transformed our business completely.' },
        { name: 'Jane Smith', role: 'Marketing Director', content: 'Highly recommended for anyone looking to grow.' },
      ],
    },
    faq: {
      headline: 'Frequently Asked Questions',
      faqs: [
        { question: 'How does it work?', answer: 'It works by providing you with everything you need to succeed.' },
        { question: 'What are the benefits?', answer: 'The main benefits include increased efficiency and better results.' },
      ],
    },
    cta: {
      headline: 'Ready to Get Started?',
      body: 'Join thousands of satisfied customers today.',
      cta: 'Start Your Free Trial',
    },
    leadform: {
      headline: 'Get Your Free Quote',
      body: 'Fill out the form below and we\'ll get back to you within 24 hours.',
      fields: ['name', 'email', 'phone', 'message'],
      cta: 'Send Request',
    },
    video: {
      headline: 'Watch How It Works',
      videoUrl: '',
      thumbnailUrl: '',
      description: 'Learn more about our solution in this short video.',
    },
    credibility: {
      headline: 'Trusted by Industry Leaders',
      body: 'Join thousands of companies who trust us with their success.',
      icons: [],
      awards: [],
    },
    header: {
      logo: '',
      navigation: [
        { label: 'Home', href: '#home' },
        { label: 'Features', href: '#features' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Get Started',
    },
    footer: {
      logo: '',
      description: 'Your trusted partner for success.',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
      ],
      social: [],
    },
    'how-it-works': {
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
    },
    pricing: {
      headline: 'Choose Your Plan',
      subheadline: 'Select the perfect plan for your needs',
      plans: [
        {
          name: 'Starter',
          price: '$29',
          period: '/month',
          features: ['5 Projects', 'Basic Support', '10GB Storage'],
          cta: 'Get Started',
          popular: false
        },
        {
          name: 'Professional',
          price: '$79',
          period: '/month',
          features: ['25 Projects', 'Priority Support', '100GB Storage', 'Advanced Analytics'],
          cta: 'Start Free Trial',
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$199',
          period: '/month',
          features: ['Unlimited Projects', '24/7 Support', '1TB Storage', 'Custom Integrations'],
          cta: 'Contact Sales',
          popular: false
        }
      ]
    },
  };

  return defaultData[sectionType] || {};
}