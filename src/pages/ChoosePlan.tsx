import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Globe,
  ShoppingCart,
  Shield,
  Star,
  Zap,
} from 'lucide-react';
import { usePaystack } from '../hooks/usePaystack';

const ChoosePlan: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<'website' | 'ecommerce' | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [subdomain, setSubdomain] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const formatKES = (amount: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);

  const plans = [
    {
      id: 'website',
      name: 'Website',
      price: 10000,
      icon: Globe,
      description: 'Perfect for personal portfolios, blogs, and business websites',
      features: [
        'Custom WordPress Theme',
        'SSL Certificate Included',
        '10GB Storage Space',
        'Free Domain for 1 Year',
        'Email Support',
        'SEO Optimization Tools',
        'Mobile Responsive Design',
        'Basic Analytics',
      ],
      popular: false,
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Shop',
      price: 20000,
      icon: ShoppingCart,
      description: 'Complete online store solution with payment processing',
      features: [
        'WooCommerce Integration',
        'Payment Gateway Setup',
        'Product Management System',
        'Inventory Tracking',
        'Order Management',
        'Customer Accounts',
        'Shipping Calculator',
        'Tax Management',
        'Advanced Analytics',
        'Priority Support',
      ],
      popular: true,
    },
  ];

  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan);

  const handlePlanSelect = (planId: 'website' | 'ecommerce') => {
    setSelectedPlan(planId);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setPaymentComplete(false);
    }
  };

  const payNow = usePaystack({
    email: 'user@example.com', // Replace with actual user email
    amount: selectedPlanDetails?.price || 0,
    onSuccess: () => {
      setPaymentComplete(true);
      setCurrentStep(2);
    },
    onClose: () => {
      alert('Payment was not completed. Please try again to proceed.');
    },
  });

  const handleActivate = async () => {
    if (!subdomain.trim() || !websiteName.trim()) return;
    setSubmitting(true);

    try {
      // 👇 Replace this with your Supabase or API logic
      console.log('Saving website to database...', {
        websiteName,
        subdomain,
        plan: selectedPlan,
      });

      setTimeout(() => {
        setShowSuccessToast(true);
        setSubmitting(false);
        
        // Hide toast after 5 seconds
        setTimeout(() => {
          setShowSuccessToast(false);
          // Redirect or update UI here
        }, 5000);
      }, 1500);
    } catch (err) {
      alert('Failed to activate website.');
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Website</h1>
          <p className="text-gray-600 mt-1">
            {currentStep === 1
              ? 'Choose your website type and features'
              : 'Activate your new website'}
          </p>
        </div>
      </div>

      {/* Step tracker */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Choose Plan</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-200"></div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            2
          </div>
          <span className="ml-2 text-sm font-medium text-gray-600">Setup Website</span>
        </div>
      </div>

      {/* Step 1: Choose a plan */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              const isSelected = selectedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => handlePlanSelect(plan.id as 'website' | 'ecommerce')}
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
                    <div className="grid grid-cols-2 gap-1">
                      {plan.features.slice(0, 8).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 8 && (
                        <div className="col-span-2 text-xs text-gray-500 mt-1">
                          +{plan.features.length - 8} more features...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedPlan && (
            <div className="text-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 2 && !paymentComplete && selectedPlanDetails && (
        <div className="max-w-2xl mx-auto">
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
                <span className="text-gray-700">{selectedPlanDetails.name}</span>
                <span className="font-medium">
                  {formatKES(selectedPlanDetails.price)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Billing Period</span>
                <span>Annual</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatKES(selectedPlanDetails.price)}/year</span>
              </div>
            </div>

            <button
              onClick={payNow}
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
      )}

      {/* Step 2: Payment Complete + Subdomain Setup - Horizontal Layout */}
      {currentStep === 2 && paymentComplete && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Title, Subtext, and Icon on One Level */}
            <div className="flex items-start gap-8">
              {/* Left side - Success message */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Successful!</h2>
                  <p className="text-gray-600 text-sm">Choose a subdomain to activate your website</p>
                </div>
              </div>
            </div>

            {/* Forms on Another Level */}
            <div className="flex-1 space-y-4">
              {/* Website Name */}
              <div>
                <label htmlFor="websiteName" className="block text-sm font-medium text-gray-700 mb-2">
                  Website Name:
                </label>
                <input
                  id="websiteName"
                  type="text"
                  placeholder="My Awesome Website"
                  className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-10"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                />
              </div>

              {/* Subdomain */}
              <div>
                <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-2">
                  Subdomain:
                </label>
                <div className="flex max-w-sm">
                  <input
                    id="subdomain"
                    type="text"
                    placeholder="yourname"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-10"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                  />
                  <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm flex items-center h-10">
                    .nyatti.co
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Available at: <strong>{subdomain || 'yourname'}.nyatti.co</strong>
                </p>
              </div>
            </div>

            {/* Button on the Third Level */}
            <div>
              <button
                disabled={!subdomain || !websiteName || submitting}
                onClick={handleActivate}
                className={`bg-primary ${
                  !subdomain || !websiteName || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                } text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors`}
              >
                <Zap className="w-4 h-4" />
                <span>{submitting ? 'Activating...' : 'Activate Website'}</span>
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="fixed top-4 right-4 bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50 animate-in slide-in-from-right duration-300">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Website Created Successfully!</h4>
                <p className="text-sm text-gray-600">
                  <strong>{websiteName}</strong> is now live at{' '}
                  <span className="font-medium text-primary">{subdomain}.nyatti.co</span>
                </p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChoosePlan;