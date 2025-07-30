import React from 'react';
import { Check, X, Star, Crown, Zap, Shield, Trophy, ArrowRight } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  us: boolean | string;
  competitor1: boolean | string;
  competitor2?: boolean | string;
}

interface ComparisonData {
  headline: string;
  subheadline?: string;
  ourBrand: string;
  competitor1: string;
  competitor2?: string;
  features: ComparisonFeature[];
  highlight?: string; // Which column to highlight: 'us' | 'competitor1' | 'competitor2'
}

interface ComparisonSectionProps {
  data: ComparisonData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export function ComparisonSection({ data, designStyle = 'modern', onEdit, isEditing = false }: ComparisonSectionProps) {
  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const renderValue = (value: boolean | string, isHighlighted: boolean = false, isOurBrand: boolean = false) => {
    if (typeof value === 'boolean') {
      if (value) {
        return (
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
            isOurBrand ? 'bg-green-100' : 'bg-green-50'
          }`}>
            <Check className={`w-5 h-5 ${isOurBrand ? 'text-green-700' : 'text-green-600'}`} />
          </div>
        );
      } else {
        return (
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
            <X className="w-5 h-5 text-red-500" />
          </div>
        );
      }
    }
    return (
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
        isOurBrand 
          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
          : 'bg-gray-100 text-gray-700'
      }`}>
        {value}
      </div>
    );
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          table: 'bg-white/90 backdrop-blur-sm shadow-2xl border border-purple-100',
          headerCell: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          highlightCell: 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300',
          normalCell: 'bg-white border-gray-200',
          crown: 'text-yellow-500'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50',
          title: 'text-3xl md:text-4xl font-bold text-gray-900 mb-4',
          subtitle: 'text-lg text-gray-600 max-w-2xl mx-auto',
          table: 'bg-white shadow-lg border border-gray-200',
          headerCell: 'bg-blue-600 text-white',
          highlightCell: 'bg-blue-50 border-blue-300',
          normalCell: 'bg-white border-gray-200',
          crown: 'text-blue-600'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-4',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          table: 'bg-white shadow-xl border border-cyan-200',
          headerCell: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
          highlightCell: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-cyan-300',
          normalCell: 'bg-white border-gray-200',
          crown: 'text-cyan-600'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
          title: 'text-4xl md:text-5xl font-bold text-white mb-6',
          subtitle: 'text-xl text-gray-300 max-w-3xl mx-auto',
          table: 'bg-gray-800 shadow-2xl border border-gray-700',
          headerCell: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black',
          highlightCell: 'bg-gray-700 border-amber-500',
          normalCell: 'bg-gray-800 border-gray-600 text-white',
          crown: 'text-amber-500'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-700 max-w-3xl mx-auto',
          table: 'bg-white shadow-2xl border-2 border-orange-200',
          headerCell: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
          highlightCell: 'bg-orange-50 border-orange-300',
          normalCell: 'bg-white border-gray-200',
          crown: 'text-orange-500'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-b from-gray-50 to-white relative',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          table: 'bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50',
          headerCell: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white',
          highlightCell: 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200',
          normalCell: 'bg-white/80 border-gray-100',
          crown: 'text-yellow-400',
          ourColumn: 'bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 shadow-lg',
          competitorColumn: 'bg-white border border-gray-200'
        };
    }
  };

  const classes = getDesignClasses();
  const hasThreeColumns = !!data.competitor2;

  return (
    <section className={`py-20 px-4 ${classes.container} transition-all duration-300`} id="comparison">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
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
            {data.headline || 'How We Compare'}
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

        {/* Modern Comparison Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Our Brand - Highlighted */}
          <div className={`relative rounded-3xl p-6 lg:p-8 transition-all duration-500 transform hover:scale-105 ${classes.ourColumn} order-first lg:order-none`}>
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-semibold flex items-center space-x-2 shadow-lg whitespace-nowrap">
                <Trophy className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Most Popular</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6 lg:mb-8 pt-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 
                className="text-lg lg:text-2xl font-bold text-gray-900 mb-2 leading-tight"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('ourBrand', e.target.textContent || '')}
              >
                {data.ourBrand || 'Our Solution'}
              </h3>
              <p className="text-indigo-600 text-xs lg:text-sm font-medium">Recommended Choice</p>
            </div>

            {/* Features */}
            <div className="space-y-3 lg:space-y-4 min-h-[200px]">
              {data.features?.map((feature, index) => (
                <div key={index} className="flex items-center justify-between py-2 lg:py-3 border-b border-indigo-100 last:border-b-0">
                  <span className="text-gray-700 font-medium text-xs lg:text-sm flex-1 pr-3 leading-tight">
                    {feature.name}
                  </span>
                  <div className="flex-shrink-0">
                    {renderValue(feature.us, true, true)}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-indigo-200">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 lg:py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm lg:text-base">
                <span>Choose This Plan</span>
                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
            </div>
          </div>

          {/* Competitor 1 */}
          <div className={`rounded-3xl p-6 lg:p-8 transition-all duration-500 hover:scale-105 ${classes.competitorColumn}`}>
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8 pt-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-400 rounded-full"></div>
              </div>
              <h3 
                className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('competitor1', e.target.textContent || '')}
              >
                {data.competitor1 || 'Competitor A'}
              </h3>
            </div>

            {/* Features */}
            <div className="space-y-3 lg:space-y-4 min-h-[200px]">
              {data.features?.map((feature, index) => (
                <div key={index} className="flex items-center justify-between py-2 lg:py-3 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 text-xs lg:text-sm flex-1 pr-3 leading-tight">
                    {feature.name}
                  </span>
                  <div className="flex-shrink-0">
                    {renderValue(feature.competitor1, false, false)}
                  </div>
                </div>
              ))}
            </div>

            {/* Basic CTA */}
            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors duration-200 text-sm lg:text-base">
                Learn More
              </button>
            </div>
          </div>

          {/* Competitor 2 (if exists) */}
          {hasThreeColumns && data.competitor2 && (
            <div className={`rounded-3xl p-6 lg:p-8 transition-all duration-500 hover:scale-105 ${classes.competitorColumn} md:col-span-2 lg:col-span-1`}>
              {/* Header */}
              <div className="text-center mb-6 lg:mb-8 pt-8">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-400 rounded-full"></div>
                </div>
                <h3 
                  className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight"
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleTextEdit('competitor2', e.target.textContent || '')}
                >
                  {data.competitor2}
                </h3>
              </div>

              {/* Features */}
              <div className="space-y-3 lg:space-y-4 min-h-[200px]">
                {data.features?.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between py-2 lg:py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 text-xs lg:text-sm flex-1 pr-3 leading-tight">
                      {feature.name}
                    </span>
                    <div className="flex-shrink-0">
                      {renderValue(feature.competitor2!, false, false)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Basic CTA */}
              <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors duration-200 text-sm lg:text-base">
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4">
            <p className="text-lg text-gray-600 font-medium">
              Ready to experience the difference?
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-12 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3">
              <Zap className="w-5 h-5" />
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}