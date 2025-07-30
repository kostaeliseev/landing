import React, { useState } from 'react';
import { Star, Quote, Camera, Upload, User } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface TestimonialsData {
  headline: string;
  subheadline?: string;
  testimonials: Testimonial[];
}

interface ModernTestimonialsSectionProps {
  data: TestimonialsData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
  brandSettings?: any;
}

export function ModernTestimonialsSection({ data, designStyle = 'modern', onEdit, isEditing = false, brandSettings }: ModernTestimonialsSectionProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const handleAvatarUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onEdit) {
      setUploadingIndex(index);
      const reader = new FileReader();
      reader.onload = (e) => {
        const newTestimonials = [...(data.testimonials || [])];
        newTestimonials[index] = { ...newTestimonials[index], avatar: e.target?.result as string };
        onEdit('testimonials', newTestimonials);
        setUploadingIndex(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          card: 'bg-white/90 backdrop-blur-md border border-purple-100/50 shadow-xl hover:shadow-2xl hover:border-purple-300/70 group',
          quote: 'text-purple-300',
          avatar: 'ring-4 ring-purple-100 group-hover:ring-purple-200',
          name: 'text-gray-900 font-bold',
          role: 'text-purple-600'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          card: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl group',
          quote: 'text-gray-300',
          avatar: 'ring-4 ring-gray-100 group-hover:ring-blue-200',
          name: 'text-gray-900 font-bold',
          role: 'text-blue-600'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          card: 'bg-white/95 backdrop-blur-sm border border-cyan-100/50 shadow-xl hover:shadow-2xl hover:border-cyan-300/70 group',
          quote: 'text-cyan-300',
          avatar: 'ring-4 ring-cyan-100 group-hover:ring-cyan-200',
          name: 'text-gray-900 font-bold',
          role: 'text-cyan-600'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold text-white mb-6',
          subtitle: 'text-xl text-gray-300 max-w-3xl mx-auto',
          card: 'bg-gray-800/50 border border-gray-700 hover:border-amber-500 backdrop-blur-sm group',
          quote: 'text-amber-400',
          avatar: 'ring-4 ring-gray-600 group-hover:ring-amber-400',
          name: 'text-white font-bold',
          role: 'text-amber-400'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-700 max-w-3xl mx-auto',
          card: 'bg-white border-2 border-orange-200 hover:border-orange-400 shadow-lg hover:shadow-xl transform hover:rotate-1 group',
          quote: 'text-orange-300',
          avatar: 'ring-4 ring-orange-100 group-hover:ring-orange-200',
          name: 'text-gray-900 font-bold',
          role: 'text-orange-600'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-b from-gray-50 to-white relative',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          card: 'bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-lg hover:shadow-xl hover:border-indigo-300/70 group',
          quote: 'text-indigo-200',
          avatar: 'ring-4 ring-gray-100 group-hover:ring-indigo-200',
          name: 'text-gray-900 font-bold',
          role: 'text-indigo-600'
        };
    }
  };

  const classes = getDesignClasses();

  return (
    <section className={`py-20 px-4 ${classes.container} transition-all duration-300`} id="testimonials">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            className={classes.title}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextEdit('headline', e.target.textContent || '')}
          >
            {data.headline || 'What Our Customers Say'}
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${classes.card}`}
            >
              {/* Quote icon */}
              <div className={`absolute top-6 right-6 ${classes.quote}`}>
                <Quote className="w-8 h-8 opacity-60" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial content */}
              <blockquote 
                className="text-gray-700 mb-8 leading-relaxed text-lg"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  if (onEdit) {
                    const newTestimonials = [...(data.testimonials || [])];
                    newTestimonials[index] = { ...newTestimonials[index], content: e.target.textContent || '' };
                    onEdit('testimonials', newTestimonials);
                  }
                }}
              >
                "{testimonial.content || 'This service has been amazing for our business.'}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                {/* Avatar with clickable replacement */}
                <div className="relative group/avatar">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={`w-16 h-16 rounded-full object-cover transition-all duration-300 ${classes.avatar}`}
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-300 ${classes.avatar}`}>
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  
                  {/* Upload overlay for editing */}
                  {isEditing && (
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAvatarUpload(index, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id={`avatar-upload-${index}`}
                      />
                      {uploadingIndex === index ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      ) : (
                        <Camera className="w-6 h-6 text-white" />
                      )}
                    </div>
                  )}
                </div>

                {/* Author info */}
                <div className="ml-4 flex-1">
                  <div 
                    className={`font-semibold text-lg ${classes.name}`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (onEdit) {
                        const newTestimonials = [...(data.testimonials || [])];
                        newTestimonials[index] = { ...newTestimonials[index], name: e.target.textContent || '' };
                        onEdit('testimonials', newTestimonials);
                      }
                    }}
                  >
                    {testimonial.name || 'Customer Name'}
                  </div>
                  <div 
                    className={`text-sm ${classes.role}`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (onEdit) {
                        const newTestimonials = [...(data.testimonials || [])];
                        newTestimonials[index] = { ...newTestimonials[index], role: e.target.textContent || '' };
                        onEdit('testimonials', newTestimonials);
                      }
                    }}
                  >
                    {testimonial.role || 'Position'}
                  </div>
                  <div 
                    className="text-sm text-gray-500"
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (onEdit) {
                        const newTestimonials = [...(data.testimonials || [])];
                        newTestimonials[index] = { ...newTestimonials[index], company: e.target.textContent || '' };
                        onEdit('testimonials', newTestimonials);
                      }
                    }}
                  >
                    {testimonial.company || 'Company'}
                  </div>
                </div>
              </div>

              {/* Subtle decorative element */}
              <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          )) || (
            <div className="col-span-full text-center py-16 text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Quote className="w-8 h-8" />
              </div>
              <p>No testimonials available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}