import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import TemplateGrid from './TemplateGrid';
import { templates, getTemplateCategories, getFilteredTemplates } from '../../../lib/templateData';
import { TemplateSelectionProps } from '../../../types/Template';

const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplate,
  onTemplateSelect,
  onContinue
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = getTemplateCategories();
  const filteredTemplates = getFilteredTemplates(selectedCategory);

  const handleContinue = () => {
    if (selectedTemplate) {
      onContinue();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Store Template
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a professionally designed template that matches your business.
          All templates are fully customizable and mobile-responsive.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Templates Grid */}
      <TemplateGrid
        templates={filteredTemplates}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={onTemplateSelect}
      />

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform ${
            selectedTemplate
              ? 'text-white hover:shadow-xl hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={selectedTemplate ? {
            background: 'linear-gradient(135deg, #16876b 0%, #1a9b7a 100%)',
          } : {}}
          onMouseEnter={(e) => {
            if (selectedTemplate) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #145a4f 0%, #16876b 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedTemplate) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #16876b 0%, #1a9b7a 100%)';
            }
          }}
        >
          {selectedTemplate ? 'Continue with Selected Template' : 'Select a Template to Continue'}
        </button>
      </div>
    </div>
  );
};

export default TemplateSelection;