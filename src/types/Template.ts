// src/types/Template.ts
import { LucideIcon } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  preview: string;
  previewUrl: string;
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
  selectedTemplate: string | null;
  onTemplateSelect: (templateId: string) => void;
  onContinue: () => void;
}

export interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

export interface CategoryFilterProps {
  categories: { id: string; name: string; count: number; }[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void; // Add this line
}