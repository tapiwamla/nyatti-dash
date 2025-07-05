// src/pages/Create.tsx
import React, { useState } from 'react';
import { ArrowLeft, Package, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePaystack } from '@/hooks/usePaystack';
import { shopService } from '@/lib/supabase';
import { Plan } from '@/types/Plans';
import StepTracker from '@/components/create/main/StepTracker';
import TemplateSelection from '@/components/create/templates/TemplateSelection';
import ShopSetup from '@/components/create/setup/ShopSetup';
import PlanSelection from '@/components/create/plans/PlanSelection';
import PaymentSummary from '@/components/create/plans/PaymentSummary';
import SuccessToast from '@/components/create/main/SuccessToast';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [shopName, setShopName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium' | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [createdShopId, setCreatedShopId] = useState<string | null>(null);

  const formatKES = (amount: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);

  const plans: Plan[] = [
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 15000,
      icon: Package,
      description: 'Perfect for small businesses and startups',
      features: [
        'Custom E-commerce Store',
        'Up to 100 Products',
        'Basic Payment Gateway',
        'SSL Certificate Included',
        '5GB Storage Space',
        'Free Domain for 1 Year',
        'Email Support',
        'Mobile Responsive Design',
        'Basic Analytics',
        'Social Media Integration',
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 30000,
      icon: ShoppingCart,
      description: 'Complete solution for growing businesses',
      features: [
        'Advanced E-commerce Store',
        'Unlimited Products',
        'Multiple Payment Gateways',
        'Advanced Inventory Management',
        'Order Management System',
        'Customer Accounts & Wishlist',
        'Advanced Shipping Calculator',
        'Tax Management',
        'Advanced Analytics & Reports',
        'Priority Support',
        'Marketing Tools',
        'Multi-currency Support',
        'Abandoned Cart Recovery',
        'SEO Optimization Tools',
      ],
      popular: true,
    },
  ];

  const steps = [
    { id: 1, label: 'Choose Template' },
    { id: 2, label: 'Setup Shop' },
    { id: 3, label: 'Choose Plan' },
    { id: 4, label: 'Payment' },
  ];

  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan);

  const payNow = usePaystack({
    email: 'user@example.com', // You should get this from your auth context
    amount: selectedPlanDetails?.price || 0,
    onSuccess: () => {
      setPaymentComplete(true);
      handleActivate();
    },
    onClose: () => {
      alert('Payment was not completed. Please try again to proceed.');
    },
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleActivate = async () => {
    if (!subdomain.trim() || !shopName.trim() || !selectedPlan) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      // Check if subdomain is available
      const isAvailable = await shopService.checkSubdomainAvailable(subdomain);
      if (!isAvailable) {
        alert('This subdomain is already taken. Please choose a different one.');
        setSubmitting(false);
        return;
      }

      // Create the shop in database
      const newShop = await shopService.createShop({
        name: shopName,
        subdomain: subdomain,
        template_id: selectedTemplate,
        plan_type: selectedPlan,
        status: 'active'
      });

      setCreatedShopId(newShop.id);
      setShowSuccessToast(true);
      
      // Auto-hide success toast and navigate to shops page
      setTimeout(() => {
        setShowSuccessToast(false);
        navigate('/shops');
      }, 3000);

    } catch (error) {
      console.error('Error creating shop:', error);
      alert(error instanceof Error ? error.message : 'Failed to create shop. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubdomainChange = async (value: string) => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(cleanValue);
    
    // Optional: Check subdomain availability in real-time
    if (cleanValue.length >= 3) {
      try {
        const isAvailable = await shopService.checkSubdomainAvailable(cleanValue);
        // You could add state to show availability status
        console.log(`Subdomain ${cleanValue} is ${isAvailable ? 'available' : 'taken'}`);
      } catch (error) {
        console.error('Error checking subdomain:', error);
      }
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
          <h1 className="text-2xl font-bold text-gray-900">Shop Creation</h1>
          <p className="text-gray-600 mt-1">
            {currentStep === 1
              ? 'Choose a starting template for your shop'
              : currentStep === 2
              ? 'Set up your shop details'
              : currentStep === 3
              ? 'Choose your shop plan'
              : 'Complete your payment'}
          </p>
        </div>
      </div>

      {/* Step Tracker */}
      <StepTracker currentStep={currentStep} steps={steps} />

      {/* Step Content */}
      {currentStep === 1 && (
        <TemplateSelection
          selectedTemplate={selectedTemplate}
          onTemplateSelect={(templateId) => setSelectedTemplate(templateId)}
          onContinue={() => {
            if (selectedTemplate) {
              setCurrentStep(2);
            } else {
              alert('Please select a template to continue.');
            }
          }}
        />
      )}

      {currentStep === 2 && (
        <ShopSetup
          shopName={shopName}
          subdomain={subdomain}
          submitting={submitting}
          onShopNameChange={setShopName}
          onSubdomainChange={handleSubdomainChange}
          onActivate={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && (
        <PlanSelection
          plans={plans}
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
          onContinue={() => {
            if (selectedPlan) {
              setCurrentStep(4);
            } else {
              alert('Please select a plan to continue.');
            }
          }}
          formatKES={formatKES}
        />
      )}

      {currentStep === 4 && selectedPlanDetails && (
        <PaymentSummary
          selectedPlan={selectedPlanDetails}
          formatKES={formatKES}
          onPayNow={payNow}
        />
      )}

      {showSuccessToast && (
        <SuccessToast
          shopName={shopName}
          subdomain={subdomain}
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
};

export default Create;