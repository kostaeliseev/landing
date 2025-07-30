import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
  url: string;
}

interface FooterData {
  logo?: string;
  logoText?: string;
  tagline?: string;
  columns: FooterColumn[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: SocialLink[];
  copyrightText?: string;
  privacyLinks?: FooterLink[];
}

interface FooterSectionProps {
  data: FooterData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
  brandSettings?: any;
}

export function FooterSection({ data, designStyle = 'modern', onEdit, isEditing = false, brandSettings }: FooterSectionProps) {
  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 text-white',
          logo: 'text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent',
          heading: 'text-pink-300 font-bold text-lg mb-4',
          link: 'text-purple-100 hover:text-pink-300 transition-colors duration-200',
          socialButton: 'bg-purple-600/30 hover:bg-pink-600/40 text-purple-100 hover:text-white p-3 rounded-full transition-all duration-200 hover:scale-110',
          border: 'border-purple-500/30',
          tagline: 'text-purple-200',
          copyright: 'text-purple-300'
        };
      case 'corporate':
        return {
          container: 'bg-gray-900 text-white',
          logo: 'text-2xl font-bold text-blue-400',
          heading: 'text-blue-400 font-bold text-lg mb-4',
          link: 'text-gray-300 hover:text-blue-400 transition-colors duration-200',
          socialButton: 'bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200',
          border: 'border-gray-700',
          tagline: 'text-gray-400',
          copyright: 'text-gray-400'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 text-white',
          logo: 'text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent',
          heading: 'text-cyan-300 font-bold text-lg mb-4',
          link: 'text-blue-100 hover:text-cyan-300 transition-colors duration-200',
          socialButton: 'bg-cyan-600/30 hover:bg-blue-600/40 text-cyan-100 hover:text-white p-3 rounded-full transition-all duration-200 hover:scale-110',
          border: 'border-cyan-500/30',
          tagline: 'text-blue-200',
          copyright: 'text-cyan-300'
        };
      case 'luxury':
        return {
          container: 'bg-black text-white',
          logo: 'text-2xl font-bold text-amber-500',
          heading: 'text-amber-400 font-bold text-lg mb-4',
          link: 'text-gray-300 hover:text-amber-400 transition-colors duration-200',
          socialButton: 'bg-amber-600 hover:bg-amber-700 text-black p-3 rounded-lg transition-colors duration-200',
          border: 'border-amber-500/30',
          tagline: 'text-gray-400',
          copyright: 'text-amber-400'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-orange-800 via-red-700 to-pink-800 text-white',
          logo: 'text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent',
          heading: 'text-orange-300 font-bold text-lg mb-4',
          link: 'text-orange-100 hover:text-red-300 transition-colors duration-200',
          socialButton: 'bg-orange-600/30 hover:bg-red-600/40 text-orange-100 hover:text-white p-3 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-12',
          border: 'border-orange-500/30',
          tagline: 'text-orange-200',
          copyright: 'text-red-300'
        };
      default: // modern
        return {
          container: 'bg-gray-900 text-white',
          logo: 'text-2xl font-bold text-indigo-400',
          heading: 'text-indigo-400 font-bold text-lg mb-4',
          link: 'text-gray-300 hover:text-indigo-400 transition-colors duration-200',
          socialButton: 'bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors duration-200',
          border: 'border-gray-700',
          tagline: 'text-gray-400',
          copyright: 'text-gray-400'
        };
    }
  };

  const classes = getDesignClasses();

  const defaultColumns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Testimonials', href: '#testimonials' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Status', href: '/status' }
      ]
    }
  ];

  const columns = data.columns && data.columns.length > 0 ? data.columns : defaultColumns;

  return (
    <footer className={`py-16 ${classes.container}`} id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              {brandSettings?.logo ? (
                <img
                  src={brandSettings.logo}
                  alt="Logo"
                  className="h-10 w-auto"
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

            {/* Tagline */}
            {data.tagline && (
              <p 
                className={`mb-6 leading-relaxed ${classes.tagline}`}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('tagline', e.target.textContent || '')}
              >
                {data.tagline}
              </p>
            )}

            {/* Contact Information */}
            {data.contactInfo && (
              <div className="space-y-3 mb-6">
                {data.contactInfo.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${data.contactInfo.email}`}
                      className={classes.link}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleTextEdit('contactInfo.email', e.target.textContent || '')}
                    >
                      {data.contactInfo.email}
                    </a>
                  </div>
                )}
                {data.contactInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a
                      href={`tel:${data.contactInfo.phone}`}
                      className={classes.link}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleTextEdit('contactInfo.phone', e.target.textContent || '')}
                    >
                      {data.contactInfo.phone}
                    </a>
                  </div>
                )}
                {data.contactInfo.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span 
                      className={classes.tagline}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleTextEdit('contactInfo.address', e.target.textContent || '')}
                    >
                      {data.contactInfo.address}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Social Links */}
            {data.socialLinks && data.socialLinks.length > 0 && (
              <div className="flex space-x-3">
                {data.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.socialButton}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 
                className={classes.heading}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  if (onEdit) {
                    const newColumns = [...columns];
                    newColumns[columnIndex] = { ...newColumns[columnIndex], title: e.target.textContent || '' };
                    onEdit('columns', newColumns);
                  }
                }}
              >
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`${classes.link} text-left`}
                    >
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (onEdit) {
                            const newColumns = [...columns];
                            newColumns[columnIndex].links[linkIndex] = {
                              ...newColumns[columnIndex].links[linkIndex],
                              label: e.target.textContent || ''
                            };
                            onEdit('columns', newColumns);
                          }
                        }}
                      >
                        {link.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className={`pt-8 border-t ${classes.border}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div 
              className={classes.copyright}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextEdit('copyrightText', e.target.textContent || '')}
            >
              {data.copyrightText || `© ${new Date().getFullYear()} Your Company. All rights reserved.`}
            </div>

            {/* Privacy Links */}
            {data.privacyLinks && data.privacyLinks.length > 0 && (
              <div className="flex space-x-6">
                {data.privacyLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className={classes.link}
                  >
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onEdit) {
                          const newPrivacyLinks = [...(data.privacyLinks || [])];
                          newPrivacyLinks[index] = { ...newPrivacyLinks[index], label: e.target.textContent || '' };
                          onEdit('privacyLinks', newPrivacyLinks);
                        }
                      }}
                    >
                      {link.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}