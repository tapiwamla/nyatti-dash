// components/create/PlanSelection.tsx
import React from 'react';
import { Plan } from '../../types/Plans';
import PlanCard from './PlanCard';

interface PlanSelectionProps {
  plans: Plan[];
  selectedPlan: 'standard' | 'premium' | null;
  onPlanSelect: (planId: 'standard' | 'premium') => void;
  onContinue: () => void;
  formatKES: (amount: number) => string;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({
  plans,
  selectedPlan,
  onPlanSelect,
  onContinue,
  formatKES
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={onPlanSelect}
            formatKES={formatKES}
          />
        ))}
      </div>

      {selectedPlan && (
        <div className="text-center">
          <button
            onClick={onContinue}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanSelection;