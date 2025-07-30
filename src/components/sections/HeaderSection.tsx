import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

interface HeaderData {
  logo?: string;
  logoText?: string;
  navigation: NavigationItem[];
  ctaButton?: {
    text: string;
    href: string;
  };
  phone?: string;
  email?: string;
}

interface HeaderSectionProps {
  data: HeaderData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
  brandSettings?: any;
}

export function HeaderSection({ data, designStyle = 'modern', onEdit, isEditing = false, brandSettings }: HeaderSectionProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg',
          logo: 'text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent',
          navLink: 'text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200',
          cta: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200',
          mobileMenu: 'bg-white/95 backdrop-blur-md border-b border-purple-100'
        };
      case 'corporate':
        return {
          container: 'bg-white border-b border-gray-200 shadow-sm',
          logo: 'text-2xl font-bold text-blue-900',
          navLink: 'text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200',
          cta: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200',
          mobileMenu: 'bg-white border-b border-gray-200'
        };
      case 'startup':
        return {
          container: 'bg-white/90 backdrop-blur-md border-b border-cyan-100 shadow-lg',
          logo: 'text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent',
          navLink: 'text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200',
          cta: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200',
          mobileMenu: 'bg-white/90 backdrop-blur-md border-b border-cyan-100'
        };
      case 'luxury':
        return {
          container: 'bg-gray-900 border-b border-gray-800 shadow-2xl',
          logo: 'text-2xl font-bold text-amber-500',
          navLink: 'text-gray-300 hover:text-amber-500 font-medium transition-colors duration-200',
          cta: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200',
          mobileMenu: 'bg-gray-900 border-b border-gray-800'
        };
      case 'playful':
        return {
          container: 'bg-white border-b-4 border-orange-200 shadow-lg',
          logo: 'text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent',
          navLink: 'text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200',
          cta: 'bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200',
          mobileMenu: 'bg-white border-b-4 border-orange-200'
        };
      default: // modern
        return {
          container: 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm',
          logo: 'text-2xl font-bold text-indigo-600',
          navLink: 'text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200',
          cta: 'bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200',
          mobileMenu: 'bg-white/95 backdrop-blur-md border-b border-gray-100'
        };
    }
  };

  const classes = getDesignClasses();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const defaultNavigation = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ];

  const navigation = data.navigation && data.navigation.length > 0 ? data.navigation : defaultNavigation;

  return (
    <header className={`sticky top-0 z-50 ${classes.container}`} id="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            {brandSettings?.logo ? (
              <img
                src={brandSettings.logo}
                alt="Logo"
                className="h-8 w-auto lg:h-10"
              />
            ) : (
              <div 
                className={classes.logo}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('logoText', e.target.textContent || '')}
              >
                {data.logoText || 'Your Brand'}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-1 ${classes.navLink}`}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (onEdit) {
                            const newNav = [...navigation];
                            newNav[index] = { ...newNav[index], label: e.target.textContent || '' };
                            onEdit('navigation', newNav);
                          }
                        }}
                      >
                        {item.label}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => scrollToSection(subItem.href)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={classes.navLink}
                  >
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onEdit) {
                          const newNav = [...navigation];
                          newNav[index] = { ...newNav[index], label: e.target.textContent || '' };
                          onEdit('navigation', newNav);
                        }
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            {data.phone && (
              <a href={`tel:${data.phone}`} className={classes.navLink}>
                {data.phone}
              </a>
            )}
            {data.ctaButton && (
              <button
                onClick={() => scrollToSection(data.ctaButton!.href)}
                className={classes.cta}
              >
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleTextEdit('ctaButton.text', e.target.textContent || '')}
                >
                  {data.ctaButton.text}
                </span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${classes.navLink} p-2`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden ${classes.mobileMenu} absolute top-full left-0 right-0 shadow-lg`}>
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className={`flex items-center justify-between w-full ${classes.navLink} py-2`}
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {openDropdown === item.label && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() => scrollToSection(subItem.href)}
                              className={`block w-full text-left ${classes.navLink} py-1 text-sm`}
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left ${classes.navLink} py-2`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              {data.ctaButton && (
                <button
                  onClick={() => scrollToSection(data.ctaButton!.href)}
                  className={`block w-full text-center ${classes.cta} mt-4`}
                >
                  {data.ctaButton.text}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}