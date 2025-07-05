import React from 'react';

interface CategoryFilterProps {
  categories: { id: string; name: string; count: number; }[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`
              px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center
              ${selectedCategory === category.id
                ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow-md hover:shadow-lg'
              }
            `}
          >
            {category.name}
            {category.count > 0 && (
              <span className={`
                ml-1.5 w-5 h-5 rounded-full text-xs font-semibold flex items-center justify-center
                ${selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;