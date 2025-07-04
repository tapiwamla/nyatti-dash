import { LucideIcon } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  preview: string;
  features: string[];
  category: string;
  popular?: boolean;
  color: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  count: number;
}

export interface TemplateSelectionProps {
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
  onContinue: () => void;
}

export interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
}

export interface CategoryFilterProps {
  categories: TemplateCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}