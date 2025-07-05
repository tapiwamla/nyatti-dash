// components/create/setup/ShopSetup.tsx
import React, { useState, useEffect } from 'react';
import { Store, ArrowRight, Check, X, Loader2 } from 'lucide-react';
import { shopService } from '@/lib/supabase';

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
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [checkTimeout, setCheckTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timeout
    if (checkTimeout) {
      clearTimeout(checkTimeout);
      setCheckTimeout(null);
    }

    // Reset status if subdomain is empty or too short
    if (subdomain.length < 3) {
      setSubdomainStatus('idle');
      return;
    }

    // Set checking status and debounce the check
    setSubdomainStatus('checking');
    const timeout = setTimeout(async () => {
      try {
        const isAvailable = await shopService.checkSubdomainAvailable(subdomain);
        setSubdomainStatus(isAvailable ? 'available' : 'taken');
      } catch (error) {
        console.error('Error checking subdomain:', error);
        setSubdomainStatus('idle');
      }
    }, 1000);

    setCheckTimeout(timeout);

    // Cleanup function
    return () => {
      clearTimeout(timeout);
    };
  }, [subdomain]);

  const handleSubdomainChange = (value: string) => {
    // Clean the value: lowercase, only alphanumeric and hyphens
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    onSubdomainChange(cleanValue);
  };

  const getSubdomainStatusIcon = () => {
    switch (subdomainStatus) {
      case 'checking':
        return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
      case 'available':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'taken':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSubdomainStatusMessage = () => {
    switch (subdomainStatus) {
      case 'checking':
        return 'Checking availability...';
      case 'available':
        return 'Available!';
      case 'taken':
        return 'This subdomain is already taken';
      default:
        return null;
    }
  };

  const isFormValid = () => {
    return shopName.trim() !== '' && 
           subdomain.trim() !== '' && 
           subdomain.length >= 3 && 
           subdomainStatus === 'available';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-6 py-8 max-w-3xl w-full sm:px-8">
      <div className="space-y-6">
        <div className="flex items-start gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Store className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Set Up Your Shop</h2>
              <p className="text-gray-600 text-sm">Choose your shop name and subdomain to get started</p>
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
              className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-10"
              value={shopName}
              onChange={(e) => onShopNameChange(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be displayed as your store name to customers
            </p>
          </div>
         
          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Subdomain:
            </label>
            <div className="flex max-w-sm">
              <input
                id="subdomain"
                type="text"
                placeholder="yourshop"
                className={`flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-10 ${
                  subdomainStatus === 'taken' ? 'border-red-300' : 
                  subdomainStatus === 'available' ? 'border-green-300' : 
                  'border-gray-300'
                }`}
                value={subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm flex items-center h-10">
                .nyatti.co
              </span>
            </div>
            
            {/* Subdomain Status */}
            {subdomain.length >= 3 && (
              <div className="flex items-center space-x-2 mt-2">
                {getSubdomainStatusIcon()}
                <span className={`text-xs ${
                  subdomainStatus === 'available' ? 'text-green-600' :
                  subdomainStatus === 'taken' ? 'text-red-600' :
                  'text-gray-500'
                }`}>
                  {getSubdomainStatusMessage()}
                </span>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              Your shop will be available at: <strong>{subdomain || 'yourshop'}.nyatti.co</strong>
            </p>
            
            {subdomain.length > 0 && subdomain.length < 3 && (
              <p className="text-xs text-red-600 mt-1">
                Subdomain must be at least 3 characters long
              </p>
            )}
          </div>
        </div>
       
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Choose a plan that fits your business needs</li>
            <li>• Complete secure payment processing</li>
            <li>• Your shop will be activated instantly</li>
          </ul>
        </div>
       
        <div>
          <button
            disabled={!isFormValid() || submitting}
            onClick={onActivate}
            className={`bg-emerald-600 ${
              !isFormValid() || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
            } text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors`}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <>
                <span>Continue to Plans</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          
          {!isFormValid() && shopName && subdomain && (
            <p className="text-xs text-red-600 mt-2">
              {subdomainStatus === 'taken' ? 'Please choose a different subdomain' : 
               subdomainStatus === 'checking' ? 'Please wait while we check subdomain availability' :
               'Please ensure all fields are filled correctly'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSetup;