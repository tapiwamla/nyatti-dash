// components/create/SuccessToast.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface SuccessToastProps {
  shopName: string;
  subdomain: string;
  onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ shopName, subdomain, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50 animate-in slide-in-from-right duration-300">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-5 h-5 text-green-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">Shop Created Successfully!</h4>
        <p className="text-sm text-gray-600">
          <strong>{shopName}</strong> is now live at{' '}
          <span className="font-medium text-primary">{subdomain}.nyatti.co</span>
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default SuccessToast;