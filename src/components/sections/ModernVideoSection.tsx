import React, { useState } from 'react';
import { Play, ExternalLink, Video, Youtube } from 'lucide-react';

interface VideoData {
  headline: string;
  subheadline?: string;
  videoUrl: string;
  videoType: 'youtube' | 'embed' | 'link';
  thumbnailUrl?: string;
  description?: string;
}

interface ModernVideoSectionProps {
  data: VideoData;
  designStyle?: 'modern' | 'creative' | 'corporate' | 'startup' | 'luxury' | 'playful';
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
  isExport?: boolean;
}

export function ModernVideoSection({ data, designStyle = 'modern', onEdit, isEditing = false, isExport = false }: ModernVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleTextEdit = (field: string, value: string) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const getDesignClasses = () => {
    switch (designStyle) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          videoCard: 'bg-white/90 backdrop-blur-md border border-purple-100/50 shadow-2xl',
          playButton: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          linkButton: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
        };
      case 'corporate':
        return {
          container: 'bg-gray-50',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          videoCard: 'bg-white border border-gray-200 shadow-lg',
          playButton: 'bg-blue-600 text-white',
          linkButton: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      case 'startup':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          videoCard: 'bg-white/95 backdrop-blur-sm border border-cyan-100/50 shadow-xl',
          playButton: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
          linkButton: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
        };
      case 'luxury':
        return {
          container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold text-white mb-6',
          subtitle: 'text-xl text-gray-300 max-w-3xl mx-auto',
          videoCard: 'bg-gray-800/50 border border-gray-700 backdrop-blur-sm',
          playButton: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black',
          linkButton: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black hover:from-amber-700 hover:to-yellow-700'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden',
          title: 'text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6',
          subtitle: 'text-xl text-gray-700 max-w-3xl mx-auto',
          videoCard: 'bg-white border-2 border-orange-200 shadow-lg',
          playButton: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
          linkButton: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-b from-gray-50 to-white relative',
          title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-6',
          subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
          videoCard: 'bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-xl',
          playButton: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white',
          linkButton: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700'
        };
    }
  };

  const classes = getDesignClasses();

  const renderVideoContent = () => {
    if (!data.videoUrl) {
      return (
        <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No video URL provided</p>
          </div>
        </div>
      );
    }

    // Always show as clickable link (no more embeds)
    const thumbnail = data.thumbnailUrl || getYouTubeThumbnail(data.videoUrl);
    
    const handleVideoClick = () => {
      window.open(data.videoUrl, '_blank', 'noopener,noreferrer');
    };
    
    return (
      <div className="relative group">
        <div 
          className="aspect-video bg-gray-900 rounded-2xl overflow-hidden cursor-pointer"
          onClick={handleVideoClick}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Video className="w-20 h-20 text-gray-400" />
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full ${classes.playButton} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
              <Play className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
        
        {/* Link button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleVideoClick}
            className={`inline-flex items-center px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${classes.linkButton}`}
          >
            {data.videoUrl.includes('youtube') || data.videoUrl.includes('youtu.be') ? (
              <Youtube className="w-5 h-5 mr-2" />
            ) : (
              <ExternalLink className="w-5 h-5 mr-2" />
            )}
            <span>Watch Video</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className={`py-20 px-4 ${classes.container} transition-all duration-300`} id="video">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className={classes.title}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextEdit('headline', e.target.textContent || '')}
          >
            {data.headline || 'Watch How It Works'}
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

        {/* Video Container */}
        <div className={`rounded-3xl p-8 max-w-4xl mx-auto ${classes.videoCard}`}>
          {renderVideoContent()}
          
          {/* Description */}
          {data.description && (
            <div className="mt-8 text-center">
              <p 
                className="text-gray-600 leading-relaxed max-w-2xl mx-auto"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextEdit('description', e.target.textContent || '')}
              >
                {data.description}
              </p>
            </div>
          )}
        </div>

        {/* Video Type Settings (for editing) */}
        {isEditing && onEdit && (
          <div className="mt-8 max-w-2xl mx-auto bg-gray-100 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Video Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <input
                  type="url"
                  value={data.videoUrl || ''}
                  onChange={(e) => onEdit('videoUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Type</label>
                <select
                  value={data.videoType || 'link'}
                  onChange={(e) => onEdit('videoType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="link">External Link (Export-friendly)</option>
                  <option value="embed">Embedded Player (Preview only)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  External links work in exported HTML. Embeds only work in preview mode.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Thumbnail URL (optional)</label>
                <input
                  type="url"
                  value={data.thumbnailUrl || ''}
                  onChange={(e) => onEdit('thumbnailUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  YouTube thumbnails are auto-detected. Custom thumbnails override this.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}