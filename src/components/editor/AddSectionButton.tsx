import React, { useState } from 'react';
import { Plus, Wand2 } from 'lucide-react';
import { useLandingPageStore } from '../../stores/landingPageStore';
import { SectionType } from '../../types';

interface AddSectionButtonProps {
  variant?: 'default' | 'primary';
}

export const AddSectionButton: React.FC<AddSectionButtonProps> = ({ 
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
      type: 'quiz',
      label: 'Quiz Funnel',
      description: 'Interactive quiz for lead qualification',
      icon: '🧩'
    },
    {
      type: 'video',
      label: 'Video',
      description: 'Embed videos from YouTube or upload',
      icon: '🎥'
    },
    {
      type: 'carousel',
      label: 'Carousel',
      description: 'Image or content slider',
      icon: '📸'
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
    ? 'btn-primary flex items-center space-x-2'
    : 'w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600';

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClass}
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Section</span>
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Section Selection Grid */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white rounded-lg shadow-xl border p-6 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Section</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sectionTypes.map((section) => (
            <button
              key={section.type}
              onClick={() => handleAddSection(section.type)}
              className="p-4 text-left border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 group"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{section.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                    {section.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {section.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* AI Generation Option */}
        <div className="mt-6 pt-4 border-t">
          <button
            onClick={() => {
              // This will be implemented when we integrate Gemini
              console.log('Generate with AI');
              setIsOpen(false);
            }}
            className="w-full p-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Wand2 className="w-5 h-5" />
            <span className="font-medium">Generate with AI</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Let AI create personalized sections based on your brand and goals
          </p>
        </div>
      </div>
    </div>
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
        { question: 'How does it work?', answer: 'It works by...' },
        { question: 'What are the benefits?', answer: 'The main benefits are...' },
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
    quiz: {
      headline: 'Find Your Perfect Solution',
      body: 'Take our quick quiz to get personalized recommendations.',
      questions: [
        { question: 'What\'s your primary goal?', answers: ['Increase Sales', 'Generate Leads', 'Build Awareness'] },
      ],
    },
    video: {
      headline: 'Watch How It Works',
      videoUrl: '',
      thumbnailUrl: '',
      description: 'Learn more about our solution in this short video.',
    },
    carousel: {
      headline: 'Our Gallery',
      items: [
        { image: '', title: 'Item 1', description: 'Description 1' },
        { image: '', title: 'Item 2', description: 'Description 2' },
      ],
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