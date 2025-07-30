export interface LandingPageSection {
  id: string;
  type: SectionType;
  order: number;
  data: any;
  style?: SectionStyle;
}

export type SectionType = 
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'header'
  | 'footer'
  | 'carousel'
  | 'leadform'
  | 'quiz'
  | 'video'
  | 'credibility'
  | 'how-it-works'
  | 'pricing'
  | 'comparison';

export interface SectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  textColor?: string;
  padding?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  margin?: {
    top: number;
    bottom: number;
  };
  borderRadius?: number;
  shadow?: string;
}

export interface BrandSettings {
  logo?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  credibilityIcons?: string[];
  campaignData?: any;
  themeId?: string;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  sections: {
    [key in SectionType]?: Partial<SectionStyle>;
  };
}

export interface LandingPage {
  id: string;
  name: string;
  sections: LandingPageSection[];
  brandSettings: BrandSettings;
  theme?: Theme;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  gtmSettings?: {
    containerId?: string;
    dataLayer: Record<string, any>;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GeminiGenerationRequest {
  prompt: string;
  sectionType: SectionType;
  brandInfo?: string;
  targetAudience?: string;
  campaignGoal?: string;
  funnelStage?: 'awareness' | 'consideration' | 'conversion' | 'retention';
}

export interface GeneratedContent {
  headline?: string;
  subheadline?: string;
  body?: string;
  cta?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    avatar?: string;
    rating?: number;
    company?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  steps?: Array<{
    number: number;
    title: string;
    description: string;
    icon?: string;
    color?: string;
    time?: string;
  }>;
  plans?: Array<{
    name: string;
    price: string;
    period: string;
    features: string[];
    popular?: boolean;
    cta: string;
  }>;
}

export interface DragItem {
  id: string;
  type: string;
  data: any;
}

export interface DropResult {
  draggedId: string;
  targetId?: string;
  position: number;
}