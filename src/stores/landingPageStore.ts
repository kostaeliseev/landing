import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  LandingPage, 
  LandingPageSection, 
  BrandSettings, 
  SectionType,
  SectionStyle,
  Theme
} from '../types';

interface LandingPageState {
  currentPage: LandingPage | null;
  pages: LandingPage[];
  selectedSectionId: string | null;
  isDragging: boolean;
  isGenerating: boolean;
  
  // Actions
  createNewPage: (name: string) => void;
  loadPage: (pageId: string) => void;
  savePage: () => Promise<void>;
  loadAllPages: () => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
  updatePageName: (name: string) => void;
  addSection: (sectionType: SectionType, data?: any) => void;
  updateSection: (sectionId: string, updates: Partial<LandingPageSection>) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (sourceIndex: number, destinationIndex: number) => void;
  duplicateSection: (sectionId: string) => void;
  selectSection: (sectionId: string | null) => void;
  updateBrandSettings: (brandSettings: Partial<BrandSettings>) => void;
  setDragging: (isDragging: boolean) => void;
  setGenerating: (isGenerating: boolean) => void;
}

const defaultBrandSettings: BrandSettings = {
  colors: {
    primary: '#3b82f6',
    secondary: '#1e293b',
    accent: '#f59e0b',
    text: '#1f2937',
    background: '#ffffff',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  credibilityIcons: [],
  designStyle: 'modern',
};

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export const useLandingPageStore = create<LandingPageState>()(
  persist(
    (set, get) => ({
      currentPage: null,
      pages: [],
      selectedSectionId: null,
      isDragging: false,
      isGenerating: false,

      createNewPage: (name: string) => {
        const newPage: LandingPage = {
          id: generateId(),
          name,
          sections: [],
          brandSettings: defaultBrandSettings,
          seo: {
            title: name,
            description: '',
            keywords: [],
          },
          gtmSettings: {
            dataLayer: {},
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          pages: [...state.pages, newPage],
          currentPage: newPage,
        }));
      },

      loadPage: (pageId: string) => {
        const page = get().pages.find(p => p.id === pageId);
        if (page) {
          set({ currentPage: page });
        }
      },

      savePage: async () => {
        const { currentPage, pages } = get();
        if (currentPage) {
          const updatedPages = pages.map(p => 
            p.id === currentPage.id ? { ...currentPage, updatedAt: new Date() } : p
          );
          set({ pages: updatedPages });
        }
      },

      loadAllPages: async () => {
        // Already handled by persist middleware
      },

      deletePage: async (pageId: string) => {
        set((state) => ({
          pages: state.pages.filter(p => p.id !== pageId),
          currentPage: state.currentPage?.id === pageId ? null : state.currentPage,
        }));
      },

      updatePageName: (name: string) => {
        const { currentPage } = get();
        if (currentPage) {
          const updatedPage = { ...currentPage, name, updatedAt: new Date() };
          set((state) => ({
            currentPage: updatedPage,
            pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
          }));
        }
      },

      addSection: (sectionType: SectionType, data: any = {}) => {
        const { currentPage } = get();
        if (!currentPage) return;

        const newSection: LandingPageSection = {
          id: generateId(),
          type: sectionType,
          order: currentPage.sections.length,
          data,
          style: {},
        };

        const updatedPage = {
          ...currentPage,
          sections: [...currentPage.sections, newSection],
          updatedAt: new Date(),
        };

        set((state) => ({
          currentPage: updatedPage,
          pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
        }));
      },

      updateSection: (sectionId: string, updates: Partial<LandingPageSection>) => {
        const { currentPage } = get();
        if (!currentPage) return;

        const updatedSections = currentPage.sections.map(section =>
          section.id === sectionId ? { ...section, ...updates } : section
        );

        const updatedPage = {
          ...currentPage,
          sections: updatedSections,
          updatedAt: new Date(),
        };

        set((state) => ({
          currentPage: updatedPage,
          pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
        }));
      },

      removeSection: (sectionId: string) => {
        const { currentPage } = get();
        if (!currentPage) return;

        const updatedSections = currentPage.sections
          .filter(section => section.id !== sectionId)
          .map((section, index) => ({ ...section, order: index }));

        const updatedPage = {
          ...currentPage,
          sections: updatedSections,
          updatedAt: new Date(),
        };

        set((state) => ({
          currentPage: updatedPage,
          pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
          selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
        }));
      },

      reorderSections: (sourceIndex: number, destinationIndex: number) => {
        const { currentPage } = get();
        if (!currentPage) return;

        const sections = [...currentPage.sections];
        const [removed] = sections.splice(sourceIndex, 1);
        sections.splice(destinationIndex, 0, removed);

        const reorderedSections = sections.map((section, index) => ({
          ...section,
          order: index,
        }));

        const updatedPage = {
          ...currentPage,
          sections: reorderedSections,
          updatedAt: new Date(),
        };

        set((state) => ({
          currentPage: updatedPage,
          pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
        }));
      },

      duplicateSection: (sectionId: string) => {
        const { currentPage } = get();
        if (!currentPage) return;

        const sectionToDuplicate = currentPage.sections.find(s => s.id === sectionId);
        if (!sectionToDuplicate) return;

        const duplicatedSection: LandingPageSection = {
          ...sectionToDuplicate,
          id: generateId(),
          order: currentPage.sections.length,
        };

        const updatedPage = {
          ...currentPage,
          sections: [...currentPage.sections, duplicatedSection],
          updatedAt: new Date(),
        };

        set((state) => ({
          currentPage: updatedPage,
          pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
        }));
      },

      selectSection: (sectionId: string | null) => {
        set({ selectedSectionId: sectionId });
      },

      updateBrandSettings: (brandSettings: Partial<BrandSettings>) => {
        const { currentPage } = get();
        if (!currentPage) return;

        const updatedPage = {
          ...currentPage,
          brandSettings: { ...currentPage.brandSettings, ...brandSettings },
          updatedAt: new Date(),
        };

        set((state) => ({
          currentPage: updatedPage,
          pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
        }));
      },

      setDragging: (isDragging: boolean) => {
        set({ isDragging });
      },

      setGenerating: (isGenerating: boolean) => {
        set({ isGenerating });
      },
    }),
    {
      name: 'landing-page-storage',
      partialize: (state) => ({ pages: state.pages }),
    }
  )
);