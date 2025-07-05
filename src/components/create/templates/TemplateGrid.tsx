import React from 'react';
import TemplateCard from './TemplateCard';
import { Template } from '@/types/Template';

interface TemplateGridProps {
  templates: Template[];
  selectedTemplate: string | null;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onSelect={onTemplateSelect}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;