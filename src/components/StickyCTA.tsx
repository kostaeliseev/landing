import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';

interface StickyCTAConfig {
  enabled: boolean;
  text: string;
  link: string;
  type: 'button' | 'phone' | 'email' | 'message';
  position: 'bottom-left' | 'bottom-right' | 'bottom-center';
  style: 'pill' | 'square' | 'circle';
  color: string;
  textColor: string;
  size: 'small' | 'medium' | 'large';
  showOnMobile: boolean;
  showOnDesktop: boolean;
  dismissible: boolean;
  showAfterScroll: number; // pixels
  hideOnSections?: string[]; // section IDs where CTA should be hidden
}

interface StickyCTAProps {
  config: StickyCTAConfig;
  onConfigChange?: (config: StickyCTAConfig) => void;
  isEditing?: boolean;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ 
  config, 
  onConfigChange, 
  isEditing = false 
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowCTA(scrolled > config.showAfterScroll);

      // Check if we're in a section where CTA should be hidden
      if (config.hideOnSections && config.hideOnSections.length > 0) {
        const sections = config.hideOnSections.map(id => document.getElementById(id));
        let shouldHide = false;

        sections.forEach(section => {
          if (section) {
            const rect = section.getBoundingClientRect();
            const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
            if (isInViewport) {
              shouldHide = true;
            }
          }
        });

        setIsVisible(!shouldHide);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [config.showAfterScroll, config.hideOnSections]);

  const handleCTAClick = () => {
    if (config.type === 'phone') {
      window.location.href = `tel:${config.link}`;
    } else if (config.type === 'email') {
      window.location.href = `mailto:${config.link}`;
    } else if (config.type === 'message') {
      // Could integrate with WhatsApp, SMS, or messaging platform
      window.open(config.link, '_blank');
    } else {
      // Regular button - scroll to section or open link
      if (config.link.startsWith('#')) {
        const element = document.querySelector(config.link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(config.link, '_blank');
      }
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const getIcon = () => {
    switch (config.type) {
      case 'phone':
        return <Phone className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <ArrowRight className="w-5 h-5" />;
    }
  };

  const getPositionClasses = () => {
    const base = 'fixed z-50';
    const positions = {
      'bottom-left': 'bottom-6 left-6',
      'bottom-right': 'bottom-6 right-6',
      'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
    };
    return `${base} ${positions[config.position]}`;
  };

  const getStyleClasses = () => {
    const sizes = {
      small: 'px-4 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg'
    };

    const styles = {
      pill: 'rounded-full',
      square: 'rounded-lg',
      circle: 'rounded-full p-4'
    };

    const sizeClass = sizes[config.size];
    const styleClass = styles[config.style];
    
    if (config.style === 'circle') {
      return `${styleClass} ${config.size === 'small' ? 'p-3' : config.size === 'large' ? 'p-5' : 'p-4'}`;
    }

    return `${sizeClass} ${styleClass}`;
  };

  const getVisibilityClasses = () => {
    const classes = [];
    if (!config.showOnMobile) classes.push('hidden md:flex');
    if (!config.showOnDesktop) classes.push('md:hidden');
    if (!config.showOnMobile && !config.showOnDesktop) return 'hidden';
    return classes.join(' ') || 'flex';
  };

  if (!config.enabled || isDismissed || !showCTA || !isVisible) {
    return null;
  }

  return (
    <>
      <div className={`${getPositionClasses()} ${getVisibilityClasses()}`}>
        <div className="flex items-center space-x-2">
          {/* Main CTA Button */}
          <button
            onClick={handleCTAClick}
            className={`
              ${getStyleClasses()}
              font-semibold shadow-lg hover:shadow-xl 
              transform hover:scale-105 transition-all duration-300
              flex items-center space-x-2
            `}
            style={{
              backgroundColor: config.color,
              color: config.textColor
            }}
          >
            {config.style !== 'circle' && <span>{config.text}</span>}
            {getIcon()}
          </button>

          {/* Dismiss Button */}
          {config.dismissible && (
            <button
              onClick={handleDismiss}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Configuration Panel for Editing */}
      {isEditing && onConfigChange && (
        <div className="fixed top-4 right-4 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Sticky CTA Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => onConfigChange({ ...config, enabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable Sticky CTA</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => onConfigChange({ ...config, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Get Started"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link/Action</label>
              <input
                type="text"
                value={config.link}
                onChange={(e) => onConfigChange({ ...config, link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="#cta or https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={config.type}
                onChange={(e) => onConfigChange({ ...config, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="button">Button</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="message">Message</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={config.position}
                onChange={(e) => onConfigChange({ ...config, position: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
              <select
                value={config.style}
                onChange={(e) => onConfigChange({ ...config, style: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="pill">Pill</option>
                <option value="square">Square</option>
                <option value="circle">Circle (Icon Only)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={config.size}
                onChange={(e) => onConfigChange({ ...config, size: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) => onConfigChange({ ...config, color: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                <input
                  type="color"
                  value={config.textColor}
                  onChange={(e) => onConfigChange({ ...config, textColor: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.showOnMobile}
                    onChange={(e) => onConfigChange({ ...config, showOnMobile: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Show on Mobile</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.showOnDesktop}
                    onChange={(e) => onConfigChange({ ...config, showOnDesktop: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Show on Desktop</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.dismissible}
                    onChange={(e) => onConfigChange({ ...config, dismissible: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Allow Dismiss</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Show After Scroll ({config.showAfterScroll}px)
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={config.showAfterScroll}
                onChange={(e) => onConfigChange({ ...config, showAfterScroll: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Default configuration
export const defaultStickyCTAConfig: StickyCTAConfig = {
  enabled: false,
  text: 'Get Started',
  link: '#cta',
  type: 'button',
  position: 'bottom-right',
  style: 'pill',
  color: '#3b82f6',
  textColor: '#ffffff',
  size: 'medium',
  showOnMobile: true,
  showOnDesktop: true,
  dismissible: true,
  showAfterScroll: 300,
  hideOnSections: ['cta', 'footer']
};