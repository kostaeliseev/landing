import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface LeadFormData {
  headline: string;
  subheadline?: string;
  description?: string;
  buttonText: string;
  successMessage?: string;
  fields: {
    name: boolean;
    email: boolean;
    phone: boolean;
    company?: boolean;
    message?: boolean;
  };
  privacy?: string;
}

interface ModernLeadFormSectionProps {
  data: LeadFormData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export const ModernLeadFormSection: React.FC<ModernLeadFormSectionProps> = ({
  data,
  designStyle = 'modern',
  onEdit,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (data.fields.name && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (data.fields.email && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (data.fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (data.fields.phone && !formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          formCard: 'bg-white/90 backdrop-blur-md border border-purple-100/50 shadow-2xl',
          input: 'border-purple-200 focus:ring-purple-500 focus:border-purple-500',
          button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
          icon: 'text-purple-500'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          formCard: 'bg-white border border-gray-200 shadow-lg',
          input: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
          button: 'bg-blue-600 hover:bg-blue-700',
          icon: 'text-blue-500'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          formCard: 'bg-white/95 backdrop-blur-sm border border-cyan-100/50 shadow-xl',
          input: 'border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500',
          button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
          icon: 'text-cyan-500'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold text-white mb-6',
          subtitle: 'text-xl text-gray-300 max-w-3xl mx-auto',
          formCard: 'bg-gray-800/50 border border-gray-700 backdrop-blur-sm',
          input: 'border-gray-600 focus:ring-amber-500 focus:border-amber-500 bg-gray-700 text-white placeholder-gray-400',
          button: 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black',
          icon: 'text-amber-400'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-700 max-w-3xl mx-auto',
          formCard: 'bg-white border-2 border-orange-200 shadow-lg',
          input: 'border-orange-200 focus:ring-orange-500 focus:border-orange-500',
          button: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
          icon: 'text-orange-500'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-b from-gray-50 to-white relative',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          formCard: 'bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-xl',
          input: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          button: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
          icon: 'text-indigo-500'
        };
    }
  };

  const classes = getDesignClasses();

  if (isSubmitted) {
    return (
      <section className={`py-20 px-4 ${classes.container} transition-all duration-300`} id="leadform">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`rounded-3xl p-8 ${classes.formCard}`}>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
            <p className="text-gray-600">
              {data.successMessage || 'Your message has been sent successfully. We\'ll get back to you soon!'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 px-4 ${classes.container} transition-all duration-300`} id="leadform">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className={classes.title}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextEdit('headline', e.target.textContent || '')}
          >
            {data.headline || 'Get Your Free Quote'}
          </h2>
          {data.subheadline && (
            <p 
              className={classes.subtitle}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextEdit('subheadline', e.target.textContent || '')}
            >
              {data.subheadline}
            </p>
          )}
          {data.description && (
            <p 
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextEdit('description', e.target.textContent || '')}
            >
              {data.description}
            </p>
          )}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-3xl p-8 lg:p-12 ${classes.formCard}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                {data.fields.name && (
                  <div className="relative">
                    <div className={`absolute left-3 top-3 ${classes.icon}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your Name"
                      className={`w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${classes.input} ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>
                )}

                {/* Email Field */}
                {data.fields.email && (
                  <div className="relative">
                    <div className={`absolute left-3 top-3 ${classes.icon}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Your Email"
                      className={`w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${classes.input} ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                )}

                {/* Phone Field */}
                {data.fields.phone && (
                  <div className="relative md:col-span-2 lg:col-span-1">
                    <div className={`absolute left-3 top-3 ${classes.icon}`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your Phone"
                      className={`w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${classes.input} ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.phone && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </div>
                    )}
                  </div>
                )}

                {/* Company Field */}
                {data.fields.company && (
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Company (Optional)"
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${classes.input}`}
                    />
                  </div>
                )}
              </div>

              {/* Message Field */}
              {data.fields.message && (
                <div className="relative">
                  <div className={`absolute left-3 top-3 ${classes.icon}`}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Your Message (Optional)"
                    rows={4}
                    className={`w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-opacity-50 transition-all duration-200 resize-none ${classes.input}`}
                  />
                </div>
              )}

              {/* Privacy Notice */}
              {data.privacy && (
                <div className="text-sm text-gray-600 text-center">
                  <p 
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleTextEdit('privacy', e.target.textContent || '')}
                  >
                    {data.privacy}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 ${classes.button} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span 
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleTextEdit('buttonText', e.target.textContent || '')}
                    >
                      {data.buttonText || 'Send Message'}
                    </span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default configuration for lead form
export const defaultLeadFormData: LeadFormData = {
  headline: 'Get Your Free Quote',
  subheadline: 'Fill out the form below and we\'ll get back to you within 24 hours',
  description: 'No spam, no sales calls. Just helpful information tailored to your needs.',
  buttonText: 'Send Message',
  successMessage: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!',
  fields: {
    name: true,
    email: true,
    phone: true,
    company: false,
    message: true
  },
  privacy: 'We respect your privacy. Your information will never be shared with third parties.'
};