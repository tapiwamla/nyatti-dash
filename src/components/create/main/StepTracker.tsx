// src/components/create/main/StepTracker.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface StepTrackerProps {
  currentStep: number;
  steps: { id: number; label: string }[];
}

const StepTracker: React.FC<StepTrackerProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span className={`ml-2 text-sm font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-600'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && <div className="w-16 h-0.5 bg-gray-200"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepTracker;