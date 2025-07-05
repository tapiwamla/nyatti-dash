import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import TemplateGrid from './TemplateGrid';
import { templates, getTemplateCategories, getFilteredTemplates } from '../../../lib/templateData';
import { TemplateSelectionProps } from '@/types/Template';

// Define the CategoryFilter props interface
interface CategoryFilterProps {
  categories: { id: string; name: string; count: number; }[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplate,
  onTemplateSelect,
  onContinue
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = getTemplateCategories();
  const filteredTemplates = getFilteredTemplates(selectedCategory);
  
  const handleContinue = () => {
    if (selectedTemplate) {
      onContinue();
    }
  };

  // Get the selected template's name for the button text
  const getSelectedTemplateName = () => {
    if (!selectedTemplate) return null;
    const template = templates.find(t => t.id === selectedTemplate);
    return template?.name || 'Selected Template';
  };

  const selectedTemplateName = getSelectedTemplateName();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Store Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a professionally designed template that matches your business.
            All templates are fully customizable and mobile-responsive.
          </p>
        </div>
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
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`
            px-8 py-4 rounded-lg font-semibold text-white text-lg
            transition-all duration-200 transform
            ${selectedTemplate
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
            }
          `}
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
          {selectedTemplate 
            ? `Continue with ${selectedTemplateName} template` 
            : 'Select a Template to Continue'
          }
        </button>
      </div>
    </div>
  );
};

export default TemplateSelection;