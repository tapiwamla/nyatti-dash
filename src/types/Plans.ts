// src/types/Plans.ts
export interface Plan {
  id: 'standard' | 'premium';
  name: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  features: string[];
  popular: boolean;
}