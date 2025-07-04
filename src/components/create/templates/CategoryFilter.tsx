import React from 'react';
import { CategoryFilterProps } from '../../../types/Template';

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            style={selectedCategory === category.id ? { backgroundColor: '#16876b' } : {}}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;