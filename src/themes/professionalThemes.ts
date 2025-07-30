import type { BrandSettings } from '../types';

export interface LandingPageTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  brandSettings: BrandSettings;
  designStyle: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  style: {
    heroGradient: string;
    backgroundColor: string;
    cardStyle: string;
    buttonStyle: string;
    textStyle: string;
  };
}

export const professionalThemes: LandingPageTheme[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Clean, professional design perfect for B2B companies and SaaS products',
    preview: '🏢',
    designStyle: 'modern',
    brandSettings: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e293b',
        accent: '#f59e0b',
        text: '#1f2937',
        background: '#ffffff',
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter',
      },
    },
    style: {
      heroGradient: 'from-blue-600 to-purple-600',
      backgroundColor: 'bg-gray-50',
      cardStyle: 'bg-white shadow-lg border border-gray-200 rounded-xl',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors',
      textStyle: 'text-gray-900',
    },
  },
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    description: 'Bold, vibrant design for creative professionals and agencies',
    preview: '🎨',
    designStyle: 'creative',
    brandSettings: {
      colors: {
        primary: '#ec4899',
        secondary: '#8b5cf6',
        accent: '#06d6a0',
        text: '#1f2937',
        background: '#ffffff',
      },
      fonts: {
        heading: 'Poppins',
        body: 'Inter',
      },
    },
    style: {
      heroGradient: 'from-pink-500 to-violet-600',
      backgroundColor: 'bg-gradient-to-br from-pink-50 to-violet-50',
      cardStyle: 'bg-white shadow-xl border-2 border-pink-100 rounded-2xl',
      buttonStyle: 'bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-full font-bold transition-all transform hover:scale-105',
      textStyle: 'text-gray-900',
    },
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    description: 'Modern, cutting-edge design for technology companies and startups',
    preview: '🚀',
    designStyle: 'startup',
    brandSettings: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#0f172a',
        accent: '#10b981',
        text: '#1f2937',
        background: '#ffffff',
      },
      fonts: {
        heading: 'Montserrat',
        body: 'Inter',
      },
    },
    style: {
      heroGradient: 'from-sky-500 to-emerald-500',
      backgroundColor: 'bg-slate-50',
      cardStyle: 'bg-white shadow-lg border border-slate-200 rounded-xl hover:shadow-xl transition-shadow',
      buttonStyle: 'bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-all duration-200',
      textStyle: 'text-slate-900',
    },
  },
  {
    id: 'luxury-brand',
    name: 'Luxury Brand',
    description: 'Elegant, sophisticated design for premium brands and high-end services',
    preview: '💎',
    designStyle: 'luxury',
    brandSettings: {
      colors: {
        primary: '#991b1b',
        secondary: '#1f2937',
        accent: '#d97706',
        text: '#1f2937',
        background: '#fefefe',
      },
      fonts: {
        heading: 'Lato',
        body: 'Lato',
      },
    },
    style: {
      heroGradient: 'from-red-800 to-amber-700',
      backgroundColor: 'bg-stone-50',
      cardStyle: 'bg-white shadow-2xl border border-stone-200 rounded-lg',
      buttonStyle: 'bg-red-800 hover:bg-red-900 text-white rounded-md font-medium uppercase tracking-wide transition-colors',
      textStyle: 'text-stone-900',
    },
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Calming, trustworthy design for healthcare and wellness brands',
    preview: '🌿',
    designStyle: 'corporate',
    brandSettings: {
      colors: {
        primary: '#059669',
        secondary: '#1e40af',
        accent: '#f59e0b',
        text: '#1f2937',
        background: '#ffffff',
      },
      fonts: {
        heading: 'Open Sans',
        body: 'Open Sans',
      },
    },
    style: {
      heroGradient: 'from-emerald-600 to-blue-600',
      backgroundColor: 'bg-emerald-50',
      cardStyle: 'bg-white shadow-md border border-emerald-100 rounded-xl',
      buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors',
      textStyle: 'text-gray-800',
    },
  },
];

export const getThemeById = (themeId: string): LandingPageTheme | undefined => {
  return professionalThemes.find(theme => theme.id === themeId);
};

export const applyThemeToPage = (theme: LandingPageTheme) => {
  // This function would be used to apply theme styles to the current page
  return {
    brandSettings: theme.brandSettings,
    themeId: theme.id,
    customCSS: generateThemeCSS(theme),
  };
};

const generateThemeCSS = (theme: LandingPageTheme): string => {
  return `
    .theme-${theme.id} {
      --primary-color: ${theme.brandSettings.colors.primary};
      --secondary-color: ${theme.brandSettings.colors.secondary};
      --accent-color: ${theme.brandSettings.colors.accent};
      --text-color: ${theme.brandSettings.colors.text};
      --background-color: ${theme.brandSettings.colors.background};
      --heading-font: '${theme.brandSettings.fonts.heading}', system-ui, sans-serif;
      --body-font: '${theme.brandSettings.fonts.body}', system-ui, sans-serif;
    }
    
    .theme-${theme.id} .hero-section {
      background: linear-gradient(to right, ${theme.brandSettings.colors.primary}, ${theme.brandSettings.colors.secondary});
    }
    
    .theme-${theme.id} .card {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .theme-${theme.id} .btn-primary {
      background-color: ${theme.brandSettings.colors.primary};
      color: white;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    
    .theme-${theme.id} .btn-primary:hover {
      background-color: ${theme.brandSettings.colors.secondary};
      transform: translateY(-1px);
    }
  `;
};