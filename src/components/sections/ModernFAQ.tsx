import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface ModernFAQProps {
  data: {
    headline: string;
    subheadline?: string;
    faqs: FAQItem[];
  };
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export function ModernFAQ({ data, designStyle = 'modern', onEdit, isEditing = false }: ModernFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = data.faqs?.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50',
          header: 'text-center mb-16',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          searchBox: 'bg-white/70 backdrop-blur-sm border-purple-200 focus:ring-purple-500 focus:border-purple-500',
          faqItem: 'bg-white/80 backdrop-blur-sm border border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
          questionText: 'text-gray-900 font-semibold',
          answerText: 'text-gray-700',
          icon: 'text-purple-600'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50',
          header: 'text-center mb-12',
          title: 'text-3xl md:text-4xl font-bold text-gray-900 mb-4',
          subtitle: 'text-lg text-gray-600 max-w-2xl mx-auto',
          searchBox: 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500',
          faqItem: 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md',
          questionText: 'text-gray-900 font-semibold',
          answerText: 'text-gray-700',
          icon: 'text-blue-600'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50',
          header: 'text-center mb-14',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-4',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          searchBox: 'bg-white border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500',
          faqItem: 'bg-white border border-cyan-100 hover:border-cyan-300 shadow-lg hover:shadow-xl',
          questionText: 'text-gray-900 font-semibold',
          answerText: 'text-gray-700',
          icon: 'text-cyan-600'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
          header: 'text-center mb-16',
          title: 'text-4xl md:text-5xl font-bold text-white mb-6',
          subtitle: 'text-xl text-gray-300 max-w-3xl mx-auto',
          searchBox: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500',
          faqItem: 'bg-gray-800/50 border border-gray-700 hover:border-amber-500 backdrop-blur-sm',
          questionText: 'text-white font-semibold',
          answerText: 'text-gray-300',
          icon: 'text-amber-500'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50',
          header: 'text-center mb-16',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-700 max-w-3xl mx-auto',
          searchBox: 'bg-white border-orange-200 focus:ring-orange-500 focus:border-orange-500',
          faqItem: 'bg-white border-2 border-orange-200 hover:border-orange-400 shadow-lg hover:shadow-xl transform hover:scale-105',
          questionText: 'text-gray-900 font-bold',
          answerText: 'text-gray-700',
          icon: 'text-orange-500'
        };
      default: // modern
        return {
          container: 'bg-white',
          header: 'text-center mb-12',
          title: 'text-3xl md:text-4xl font-bold text-gray-900 mb-4',
          subtitle: 'text-lg text-gray-600 max-w-2xl mx-auto',
          searchBox: 'bg-gray-50 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          faqItem: 'bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-lg',
          questionText: 'text-gray-900 font-semibold',
          answerText: 'text-gray-700',
          icon: 'text-indigo-600'
        };
    }
  };

  const classes = getDesignClasses();

  return (
    <section className={`py-20 px-4 ${classes.container} transition-all duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={classes.header}>
          <h2 
            className={classes.title}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextEdit('headline', e.target.textContent || '')}
          >
            {data.headline || 'Frequently Asked Questions'}
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

        {/* Search Bar */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${classes.icon}`} />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border text-gray-900 placeholder-gray-500 transition-all duration-200 ${classes.searchBox}`}
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className={`w-16 h-16 mx-auto mb-4 ${classes.icon} opacity-50`} />
              <p className="text-gray-500">
                {searchQuery ? 'No questions found matching your search.' : 'No FAQ items available.'}
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = openItems.includes(index);
              return (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${classes.faqItem}`}
                >
                  <button
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-opacity-50 transition-all duration-200"
                    onClick={() => toggleItem(index)}
                  >
                    <h3 
                      className={`text-lg pr-4 ${classes.questionText}`}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onEdit) {
                          const newFAQs = [...(data.faqs || [])];
                          newFAQs[index] = { ...newFAQs[index], question: e.target.textContent || '' };
                          onEdit('faqs', newFAQs);
                        }
                      }}
                    >
                      {faq.question || `Question ${index + 1}`}
                    </h3>
                    <div className={`flex-shrink-0 ${classes.icon} transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-6">
                      <div className={`border-l-4 pl-4 ${classes.icon.includes('purple') ? 'border-purple-200' : classes.icon.includes('blue') ? 'border-blue-200' : classes.icon.includes('cyan') ? 'border-cyan-200' : classes.icon.includes('amber') ? 'border-amber-200' : classes.icon.includes('orange') ? 'border-orange-200' : 'border-indigo-200'}`}>
                        <p 
                          className={`text-base leading-relaxed ${classes.answerText}`}
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            if (onEdit) {
                              const newFAQs = [...(data.faqs || [])];
                              newFAQs[index] = { ...newFAQs[index], answer: e.target.textContent || '' };
                              onEdit('faqs', newFAQs);
                            }
                          }}
                        >
                          {faq.answer || 'Answer goes here...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className={`inline-flex items-center px-6 py-3 rounded-full ${designStyle === 'luxury' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} transition-all duration-200`}>
            <HelpCircle className={`w-5 h-5 mr-2 ${classes.icon}`} />
            <span className="text-sm font-medium">
              Still have questions? {' '}
              <button className={`${classes.icon} hover:underline font-semibold`}>
                Contact our support team
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}