// components/create/PaymentSummary.tsx
import React from 'react';
import { Shield, CreditCard } from 'lucide-react';
import { Plan } from '@/types/Plans';

interface PaymentSummaryProps {
  selectedPlan: Plan;
  formatKES: (amount: number) => string;
  onPayNow: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  selectedPlan,
  formatKES,
  onPayNow
}) => {
  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure Payment</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-700">{selectedPlan.name}</span>
            <span className="font-medium">
              {formatKES(selectedPlan.price)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Billing Period</span>
            <span>Annual</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatKES(selectedPlan.price)}/year</span>
          </div>
        </div>

        <button
          onClick={onPayNow}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          <span>Complete Payment</span>
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          By proceeding, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;