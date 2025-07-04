// components/create/ShopSetup.tsx
import React from 'react';
import { Check, Zap } from 'lucide-react';

interface ShopSetupProps {
  shopName: string;
  subdomain: string;
  submitting: boolean;
  onShopNameChange: (value: string) => void;
  onSubdomainChange: (value: string) => void;
  onActivate: () => void;
}

const ShopSetup: React.FC<ShopSetupProps> = ({
  shopName,
  subdomain,
  submitting,
  onShopNameChange,
  onSubdomainChange,
  onActivate
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 px-6 py-8 max-w-3xl w-full sm:px-8">
      <div className="space-y-6">
        <div className="flex items-start gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Payment Successful!</h2>
              <p className="text-gray-600 text-sm">Choose a subdomain to activate your shop</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-2">
              Shop Name:
            </label>
            <input
              id="shopName"
              type="text"
              placeholder="My Awesome Shop"
              className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-10"
              value={shopName}
              onChange={(e) => onShopNameChange(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-2">
              Subdomain:
            </label>
            <div className="flex max-w-sm">
              <input
                id="subdomain"
                type="text"
                placeholder="yourshop"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-10"
                value={subdomain}
                onChange={(e) => onSubdomainChange(e.target.value.toLowerCase())}
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm flex items-center h-10">
                .nyatti.co
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Available at: <strong>{subdomain || 'yourshop'}.nyatti.co</strong>
            </p>
          </div>
        </div>

        <div>
          <button
            disabled={!subdomain || !shopName || submitting}
            onClick={onActivate}
            className={`bg-primary ${
              !subdomain || !shopName || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
            } text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors`}
          >
            <Zap className="w-4 h-4" />
            <span>{submitting ? 'Activating...' : 'Activate Shop'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSetup;