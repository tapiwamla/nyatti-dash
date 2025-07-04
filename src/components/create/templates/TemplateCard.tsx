import React from 'react';
import { Check } from 'lucide-react';
import { TemplateCardProps } from '../../../types/Template';

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  const IconComponent = template.icon;

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isSelected
          ? 'ring-4 ring-blue-500 ring-opacity-50 shadow-2xl'
          : ''
      }`}
      onClick={() => onSelect(template.id)}
    >
      {/* Popular Badge */}
      {template.popular && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ⭐ Popular
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white rounded-full p-2 shadow-lg">
          <Check className="w-5 h-5" />
        </div>
      )}

      {/* Template Preview */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${template.color} opacity-20`}></div>
      </div>

      {/* Template Info */}
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${template.color} shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500 font-medium">{template.category}</p>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{template.description}</p>

        {/* Features */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-800">Key Features:</p>
          <div className="grid grid-cols-2 gap-2">
            {template.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;