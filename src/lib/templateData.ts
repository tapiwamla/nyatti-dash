import { Store, Palette, Zap, Globe, ShoppingBag, Coffee, Camera, Gamepad2, Heart } from 'lucide-react';
import { Template } from '../types/Template';

export const templates: Template[] = [
  {
    id: 'modern-fashion',
    name: 'Modern Fashion',
    description: 'Clean, minimalist design perfect for clothing and accessories',
    icon: Palette,
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    features: ['Product galleries', 'Size guides', 'Wishlist', 'Quick view'],
    category: 'Fashion',
    popular: true,
    color: 'bg-gradient-to-br from-pink-500 to-purple-600'
  },
  {
    id: 'electronics-store',
    name: 'Electronics Store',
    description: 'Tech-focused template with product comparison features',
    icon: Zap,
    preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    features: ['Product comparison', 'Specs display', 'Reviews', 'Search filters'],
    category: 'Electronics',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    id: 'general-store',
    name: 'General Store',
    description: 'Versatile template suitable for any type of product',
    icon: Store,
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    features: ['Multi-category', 'Featured products', 'Blog integration', 'SEO optimized'],
    category: 'General',
    color: 'bg-gradient-to-br from-green-500 to-teal-600'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Multi-vendor template for marketplace businesses',
    icon: Globe,
    preview: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop',
    features: ['Vendor profiles', 'Commission tracking', 'Bulk products', 'Advanced search'],
    category: 'Marketplace',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-600'
  },
  {
    id: 'boutique',
    name: 'Boutique',
    description: 'Elegant design for premium fashion and luxury items',
    icon: ShoppingBag,
    preview: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
    features: ['Luxury feel', 'High-quality images', 'Premium checkout', 'Brand storytelling'],
    category: 'Fashion',
    color: 'bg-gradient-to-br from-rose-500 to-pink-600'
  },
  {
    id: 'cafe-restaurant',
    name: 'Café & Restaurant',
    description: 'Perfect for food businesses with menu and ordering features',
    icon: Coffee,
    preview: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    features: ['Menu display', 'Online ordering', 'Table booking', 'Reviews'],
    category: 'Food',
    color: 'bg-gradient-to-br from-amber-500 to-orange-600'
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Showcase your photography work with stunning galleries',
    icon: Camera,
    preview: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    features: ['Image galleries', 'Booking system', 'Portfolio showcase', 'Client proofing'],
    category: 'Services',
    color: 'bg-gradient-to-br from-slate-500 to-gray-600'
  },
  {
    id: 'gaming',
    name: 'Gaming Store',
    description: 'Dynamic template for gaming products and accessories',
    icon: Gamepad2,
    preview: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    features: ['Game reviews', 'Pre-orders', 'Gaming news', 'Community features'],
    category: 'Gaming',
    color: 'bg-gradient-to-br from-violet-500 to-purple-600'
  },
  {
    id: 'wellness',
    name: 'Wellness & Beauty',
    description: 'Calming design for health and beauty products',
    icon: Heart,
    preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    features: ['Ingredient lists', 'Wellness blog', 'Subscription boxes', 'Skin analyzer'],
    category: 'Beauty',
    color: 'bg-gradient-to-br from-emerald-500 to-green-600'
  },
];

export const getTemplateCategories = () => {
  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'Fashion', name: 'Fashion', count: templates.filter(t => t.category === 'Fashion').length },
    { id: 'Electronics', name: 'Electronics', count: templates.filter(t => t.category === 'Electronics').length },
    { id: 'General', name: 'General', count: templates.filter(t => t.category === 'General').length },
    { id: 'Food', name: 'Food & Beverage', count: templates.filter(t => t.category === 'Food').length },
    { id: 'Services', name: 'Services', count: templates.filter(t => t.category === 'Services').length },
    { id: 'Gaming', name: 'Gaming', count: templates.filter(t => t.category === 'Gaming').length },
    { id: 'Beauty', name: 'Beauty', count: templates.filter(t => t.category === 'Beauty').length },
    { id: 'Marketplace', name: 'Marketplace', count: templates.filter(t => t.category === 'Marketplace').length },
  ];
  
  return categories.filter(cat => cat.count > 0);
};

export const getFilteredTemplates = (category: string) => {
  return category === 'all' ? templates : templates.filter(template => template.category === category);
};