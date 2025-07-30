import React from 'react';
import { ArrowRight, ArrowDown, Check, Circle, Play, Target, Zap, Users, Trophy, Rocket } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon?: string;
  number: number;
}

interface HowItWorksData {
  headline: string;
  subheadline?: string;
  steps: Step[];
  layout?: 'horizontal' | 'vertical' | 'circular' | 'timeline';
}

interface HowItWorksSectionProps {
  data: HowItWorksData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export function HowItWorksSection({ data, designStyle = 'modern', onEdit, isEditing = false }: HowItWorksSectionProps) {
  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const getStepIcon = (step: Step, index: number) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'play': <Play className="w-6 h-6" />,
      'target': <Target className="w-6 h-6" />,
      'zap': <Zap className="w-6 h-6" />,
      'users': <Users className="w-6 h-6" />,
      'trophy': <Trophy className="w-6 h-6" />,
      'rocket': <Rocket className="w-6 h-6" />,
      'check': <Check className="w-6 h-6" />,
    };

    if (step.icon && iconMap[step.icon]) {
      return iconMap[step.icon];
    }

    return <span className="text-xl font-bold">{step.number || index + 1}</span>;
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          stepCard: 'bg-white/90 backdrop-blur-md border border-purple-100/50 shadow-xl hover:shadow-2xl hover:border-purple-300/70',
          stepIcon: 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white shadow-lg',
          stepTitle: 'text-gray-900 font-bold',
          stepDescription: 'text-gray-600',
          connector: 'text-purple-400',
          cta: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50',
          title: 'text-3xl md:text-4xl font-bold text-gray-900 mb-4',
          subtitle: 'text-lg text-gray-600 max-w-2xl mx-auto',
          stepCard: 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md',
          stepIcon: 'bg-blue-600 text-white',
          stepTitle: 'text-gray-900 font-semibold',
          stepDescription: 'text-gray-600',
          connector: 'text-gray-400',
          cta: 'bg-blue-600 text-white'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-4',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          stepCard: 'bg-white border border-cyan-100 hover:border-cyan-300 shadow-lg hover:shadow-xl transform hover:scale-105',
          stepIcon: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
          stepTitle: 'text-gray-900 font-bold',
          stepDescription: 'text-gray-600',
          connector: 'text-cyan-400',
          cta: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
          title: 'text-4xl md:text-5xl font-bold text-white mb-6',
          subtitle: 'text-xl text-gray-300 max-w-3xl mx-auto',
          stepCard: 'bg-gray-800/50 border border-gray-700 hover:border-amber-500 backdrop-blur-sm',
          stepIcon: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black',
          stepTitle: 'text-white font-bold',
          stepDescription: 'text-gray-300',
          connector: 'text-amber-500',
          cta: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-700 max-w-3xl mx-auto',
          stepCard: 'bg-white border-2 border-orange-200 hover:border-orange-400 shadow-lg hover:shadow-xl transform hover:rotate-1',
          stepIcon: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
          stepTitle: 'text-gray-900 font-bold',
          stepDescription: 'text-gray-700',
          connector: 'text-orange-500',
          cta: 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-b from-gray-50 to-white relative',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          stepCard: 'bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-lg hover:shadow-xl hover:border-indigo-300/70',
          stepIcon: 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600 text-white shadow-lg',
          stepTitle: 'text-gray-900 font-bold',
          stepDescription: 'text-gray-600',
          connector: 'text-indigo-400',
          cta: 'bg-indigo-600 text-white'
        };
    }
  };

  const classes = getDesignClasses();
  const layout = data.layout || 'horizontal';

  const renderHorizontalLayout = () => {
    // Ensure exactly 3 steps for consistent layout
    const steps = data.steps?.slice(0, 3) || [];
    
    return (
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Background connecting line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 z-0">
            <div className="flex items-center h-full">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
          </div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10">
              {/* Step card with sophisticated design */}
              <div className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${classes.stepCard}`}>
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step number with sophisticated styling */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden ${classes.stepIcon} shadow-lg`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <span className="text-2xl font-bold relative z-10">{step.number || index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 
                    className={`text-xl lg:text-2xl mb-4 font-bold ${classes.stepTitle}`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (onEdit) {
                        const newSteps = [...(data.steps || [])];
                        newSteps[index] = { ...newSteps[index], title: e.target.textContent || '' };
                        onEdit('steps', newSteps);
                      }
                    }}
                  >
                    {step.title || `Step ${index + 1}`}
                  </h3>
                  <p 
                    className={`leading-relaxed text-base ${classes.stepDescription}`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (onEdit) {
                        const newSteps = [...(data.steps || [])];
                        newSteps[index] = { ...newSteps[index], description: e.target.textContent || '' };
                        onEdit('steps', newSteps);
                      }
                    }}
                  >
                    {step.description || 'Step description goes here...'}
                  </p>
                </div>

                {/* Subtle decorative element */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {steps.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Circle className="w-8 h-8" />
            </div>
            <p>No steps defined</p>
          </div>
        )}
      </div>
    );
  };

  const renderVerticalLayout = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      {data.steps?.map((step, index) => (
        <div key={index} className="relative">
          <div className={`rounded-2xl p-8 transition-all duration-300 ${classes.stepCard}`}>
            <div className="flex items-start space-x-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${classes.stepIcon}`}>
                {getStepIcon(step, index)}
              </div>
              <div className="flex-1">
                <h3 
                  className={`text-xl mb-3 ${classes.stepTitle}`}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    if (onEdit) {
                      const newSteps = [...(data.steps || [])];
                      newSteps[index] = { ...newSteps[index], title: e.target.textContent || '' };
                      onEdit('steps', newSteps);
                    }
                  }}
                >
                  {step.title || `Step ${index + 1}`}
                </h3>
                <p 
                  className={`leading-relaxed ${classes.stepDescription}`}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    if (onEdit) {
                      const newSteps = [...(data.steps || [])];
                      newSteps[index] = { ...newSteps[index], description: e.target.textContent || '' };
                      onEdit('steps', newSteps);
                    }
                  }}
                >
                  {step.description || 'Step description goes here...'}
                </p>
              </div>
            </div>
          </div>
          {index < (data.steps?.length || 0) - 1 && (
            <div className="flex justify-center my-4">
              <ArrowDown className={`w-8 h-8 ${classes.connector}`} />
            </div>
          )}
        </div>
      )) || (
        <div className="text-center py-12 text-gray-500">
          No steps defined
        </div>
      )}
    </div>
  );

  const renderCircularLayout = () => (
    <div className="relative max-w-4xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {data.steps?.map((step, index) => {
          const angle = (index * 360) / (data.steps?.length || 1);
          return (
            <div key={index} className={`rounded-2xl p-6 transition-all duration-300 ${classes.stepCard}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${classes.stepIcon}`}>
                {getStepIcon(step, index)}
              </div>
              <h3 
                className={`text-lg mb-3 text-center ${classes.stepTitle}`}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  if (onEdit) {
                    const newSteps = [...(data.steps || [])];
                    newSteps[index] = { ...newSteps[index], title: e.target.textContent || '' };
                    onEdit('steps', newSteps);
                  }
                }}
              >
                {step.title || `Step ${index + 1}`}
              </h3>
              <p 
                className={`text-sm text-center leading-relaxed ${classes.stepDescription}`}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  if (onEdit) {
                    const newSteps = [...(data.steps || [])];
                    newSteps[index] = { ...newSteps[index], description: e.target.textContent || '' };
                    onEdit('steps', newSteps);
                  }
                }}
              >
                {step.description || 'Step description...'}
              </p>
            </div>
          );
        }) || (
          <div className="col-span-full text-center py-12 text-gray-500">
            No steps defined
          </div>
        )}
      </div>
    </div>
  );

  const renderTimelineLayout = () => (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${classes.connector.includes('purple') ? 'bg-purple-200' : classes.connector.includes('blue') ? 'bg-blue-200' : classes.connector.includes('cyan') ? 'bg-cyan-200' : classes.connector.includes('amber') ? 'bg-amber-200' : classes.connector.includes('orange') ? 'bg-orange-200' : 'bg-indigo-200'}`}></div>
        
        <div className="space-y-12">
          {data.steps?.map((step, index) => (
            <div key={index} className="relative flex items-start space-x-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 ${classes.stepIcon}`}>
                {getStepIcon(step, index)}
              </div>
              <div className={`flex-1 rounded-2xl p-8 transition-all duration-300 ${classes.stepCard}`}>
                <h3 
                  className={`text-xl mb-4 ${classes.stepTitle}`}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    if (onEdit) {
                      const newSteps = [...(data.steps || [])];
                      newSteps[index] = { ...newSteps[index], title: e.target.textContent || '' };
                      onEdit('steps', newSteps);
                    }
                  }}
                >
                  {step.title || `Step ${index + 1}`}
                </h3>
                <p 
                  className={`leading-relaxed ${classes.stepDescription}`}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    if (onEdit) {
                      const newSteps = [...(data.steps || [])];
                      newSteps[index] = { ...newSteps[index], description: e.target.textContent || '' };
                      onEdit('steps', newSteps);
                    }
                  }}
                >
                  {step.description || 'Step description goes here...'}
                </p>
              </div>
            </div>
          )) || (
            <div className="text-center py-12 text-gray-500">
              No steps defined
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (layout) {
      case 'vertical':
        return renderVerticalLayout();
      case 'circular':
        return renderCircularLayout();
      case 'timeline':
        return renderTimelineLayout();
      default:
        return renderHorizontalLayout();
    }
  };

  return (
    <section className={`py-20 px-4 ${classes.container} transition-all duration-300`} id="how-it-works">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
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
            {data.headline || 'How It Works'}
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

        {/* Steps */}
        {renderLayout()}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <button className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${classes.cta}`}>
            <span>Ready to get started?</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}