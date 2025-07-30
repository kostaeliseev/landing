import React, { useState } from 'react';
import { Check, User, Mail, Phone, Building, MapPin, AlertCircle } from 'lucide-react';

export interface LeadFormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select fields
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    errorMessage?: string;
  };
}

export interface LeadFormData {
  headline: string;
  subheadline?: string;
  fields: LeadFormField[];
  submitButton: string;
  successMessage: string;
  integrations?: {
    webhook?: string;
    email?: string;
    googleSheets?: string;
  };
  style: {
    layout: 'single-column' | 'two-column' | 'inline';
    theme: 'minimal' | 'boxed' | 'gradient';
  };
}

interface LeadFormProps {
  data: LeadFormData;
  onSubmit?: (formData: Record<string, any>) => void;
  preview?: boolean;
}

export function LeadForm({ data, onSubmit, preview = false }: LeadFormProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: LeadFormField, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`;
    }

    if (value && field.validation) {
      const { minLength, maxLength, pattern, errorMessage } = field.validation;
      
      if (minLength && value.length < minLength) {
        return errorMessage || `${field.label} must be at least ${minLength} characters`;
      }
      
      if (maxLength && value.length > maxLength) {
        return errorMessage || `${field.label} must be no more than ${maxLength} characters`;
      }
      
      if (pattern && !new RegExp(pattern).test(value)) {
        return errorMessage || `${field.label} format is invalid`;
      }
    }

    // Built-in validations
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'phone' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (preview) return;

    const newErrors: Record<string, string> = {};
    
    // Validate all fields
    data.fields.forEach(field => {
      const error = validateField(field, formValues[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formValues);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5 text-gray-400" />;
      case 'phone': return <Phone className="w-5 h-5 text-gray-400" />;
      case 'text': return <User className="w-5 h-5 text-gray-400" />;
      default: return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  const renderField = (field: LeadFormField) => {
    const hasError = errors[field.id];
    const commonClasses = `w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
      hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
    }`;

    const fieldContent = (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {getFieldIcon(field.type)}
        </div>
        
        {field.type === 'select' ? (
          <select
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={commonClasses}
            required={field.required}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`${commonClasses} h-24 resize-none`}
            required={field.required}
          />
        ) : field.type === 'checkbox' ? (
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formValues[field.id] || false}
              onChange={(e) => handleInputChange(field.id, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required={field.required}
            />
            <span className="text-gray-700">{field.label}</span>
          </label>
        ) : (
          <input
            type={field.type}
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        )}
        
        {hasError && (
          <div className="mt-1 flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {hasError}
          </div>
        )}
      </div>
    );

    return (
      <div key={field.id} className={field.type === 'checkbox' ? 'col-span-full' : ''}>
        {field.type !== 'checkbox' && (
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {fieldContent}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {data.successMessage || 'Your message has been sent successfully. We will get back to you soon.'}
        </p>
      </div>
    );
  }

  const containerClasses = {
    minimal: 'bg-transparent',
    boxed: 'bg-white p-8 rounded-xl shadow-lg border border-gray-200',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200'
  };

  return (
    <div className={`max-w-2xl mx-auto ${containerClasses[data.style.theme]}`}>
      {data.headline && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.headline}</h2>
          {data.subheadline && (
            <p className="text-gray-600 text-lg">{data.subheadline}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className={`grid gap-6 ${
          data.style.layout === 'two-column' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        }`}>
          {data.fields.map(renderField)}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting || preview}
            className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isSubmitting || preview
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transform hover:scale-105'
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isSubmitting ? 'Submitting...' : data.submitButton || 'Submit'}
          </button>
        </div>

        {preview && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Form preview - submissions disabled
          </div>
        )}
      </form>
    </div>
  );
}