// src/components/create/templates/TemplateCard.tsx
import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { TemplateCardProps } from '@/types/Template';

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  const IconComponent = template.icon;

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(template.previewUrl, '_blank');
  };

  return (
    <div
      className={`relative bg-white rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer group ${
        isSelected
          ? 'border-blue-500 shadow-lg ring-1 ring-blue-500/20'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(template.id)}
    >
      {/* Popular Badge */}
      {template.popular && (
        <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
          Popular
        </div>
      )}
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-blue-500 text-white rounded-full p-1.5 shadow-sm">
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Template Preview */}
      <div className="relative h-44 overflow-hidden rounded-t-xl bg-gray-50">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${template.color} opacity-5`}></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${template.color} shadow-sm`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">{template.name}</h3>
              <span className="text-sm text-gray-500 font-medium">{template.category}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>

        {/* Features */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide">Features</p>
          <div className="flex flex-wrap gap-2">
            {template.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Live Preview Button */}
        <button
          onClick={handlePreviewClick}
          className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200/50 hover:border-gray-300"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Preview Template</span>
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;