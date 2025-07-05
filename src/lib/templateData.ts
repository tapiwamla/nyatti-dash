import { Store, Palette, Zap, Globe, ShoppingBag, Coffee, Heart } from 'lucide-react';
import { Template } from '../types/Template';

export const templates: Template[] = [
  {
    id: 'dashiki',
    name: 'Dashiki',
    description: 'Modern tech-focused template with product comparison features',
    icon: Zap,
    preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    features: ['Product comparison', 'Specs display', 'Reviews', 'Search filters'],
    category: 'Electronics',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    description: 'Multi-vendor template for marketplace businesses',
    icon: Globe,
    preview: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop',
    features: ['Vendor profiles', 'Commission tracking', 'Bulk products', 'Advanced search'],
    category: 'Marketplace',
    popular: true,
    color: 'bg-gradient-to-br from-purple-500 to-indigo-600'
  },
  {
    id: 'duka',
    name: 'Duka',
    description: 'Versatile template suitable for any type of product',
    icon: Store,
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    features: ['Multi-category', 'Featured products', 'Blog integration', 'SEO optimized'],
    category: 'General',
    color: 'bg-gradient-to-br from-green-500 to-teal-600'
  },
  {
    id: 'jua',
    name: 'Jua',
    description: 'Perfect for food businesses with menu and ordering features',
    icon: Coffee,
    preview: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    features: ['Menu display', 'Online ordering', 'Table booking', 'Reviews'],
    category: 'Food',
    color: 'bg-gradient-to-br from-amber-500 to-orange-600'
  },
  {
    id: 'amani',
    name: 'Amani',
    description: 'Clean, minimalist design perfect for clothing and accessories',
    icon: Palette,
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    features: ['Product galleries', 'Size guides', 'Wishlist', 'Quick view'],
    category: 'Fashion',
    popular: true,
    color: 'bg-gradient-to-br from-pink-500 to-purple-600'
  },
  {
    id: 'elsie',
    name: 'Elsie',
    description: 'Beautiful template for beauty and cosmetics products',
    icon: Heart,
    preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    features: ['Product swatches', 'Beauty guides', 'Ingredient lists', 'Reviews'],
    category: 'Cosmetics',
    color: 'bg-gradient-to-br from-rose-500 to-pink-600'
  },
];

export const getTemplateCategories = () => {
  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'Fashion', name: 'Fashion', count: templates.filter(t => t.category === 'Fashion').length },
    { id: 'Electronics', name: 'Electronics', count: templates.filter(t => t.category === 'Electronics').length },
    { id: 'General', name: 'General', count: templates.filter(t => t.category === 'General').length },
    { id: 'Food', name: 'Food & Beverage', count: templates.filter(t => t.category === 'Food').length },
    { id: 'Marketplace', name: 'Marketplace', count: templates.filter(t => t.category === 'Marketplace').length },
    { id: 'Cosmetics', name: 'Cosmetics', count: templates.filter(t => t.category === 'Cosmetics').length },
  ];
  
  return categories.filter(cat => cat.count > 0);
};

export const getFilteredTemplates = (category: string) => {
  return category === 'all' ? templates : templates.filter(template => template.category === category);
};