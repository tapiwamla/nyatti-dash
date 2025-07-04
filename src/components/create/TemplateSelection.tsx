import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import TemplateGrid from './TemplateGrid';
import { templates, getTemplateCategories, getFilteredTemplates } from '../../lib/templateData';
import { TemplateSelectionProps } from '../../types/Template';

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
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedTemplate ? 'Continue with Selected Template' : 'Select a Template to Continue'}
        </button>
      </div>
    </div>
  );
};

export default TemplateSelection;