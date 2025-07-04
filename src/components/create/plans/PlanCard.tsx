// components/create/PlanCard.tsx
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Plan } from '../../../types/Plans';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: 'standard' | 'premium') => void;
  formatKES: (amount: number) => string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect, formatKES }) => {
  const IconComponent = plan.icon;

  return (
    <div
      className={`relative bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-primary shadow-lg'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>Popular</span>
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div
            className={`p-2 rounded-lg ${
              isSelected
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-600 text-xs">{plan.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">
            {formatKES(plan.price)}
          </div>
          <div className="text-xs text-gray-600">per year</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-gray-900 text-sm">Features:</h4>
        <div className="grid grid-cols-1 gap-1">
          {plan.features.slice(0, 8).map((feature, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-gray-700">{feature}</span>
            </div>
          ))}
          {plan.features.length > 8 && (
            <div className="text-xs text-gray-500 mt-1">
              +{plan.features.length - 8} more features...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;