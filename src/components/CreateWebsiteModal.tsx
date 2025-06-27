import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Palette, Monitor, ShoppingCart, Globe, X, Sparkles } from 'lucide-react';

interface WebsiteData {
  type: 'website' | 'shop';
  name: string;
  description: string;
  industry: string;
  colorScheme: string;
  customColor?: string;
  themeStyle: 'light' | 'dark';
  template: string;
  layoutStyle: string;
  pages: string[];
  features: string[];
  domainOption: string;
  customDomain?: string;
}

interface CreateWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'website' | 'shop';
}

const CreateWebsiteModal: React.FC<CreateWebsiteModalProps> = ({ isOpen, onClose, initialType }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteData, setWebsiteData] = useState<WebsiteData>({
    type: initialType || 'website',
    name: '',
    description: '',
    industry: 'Business & Consulting', // Default selection
    colorScheme: 'Forest Green', // Default selection
    themeStyle: 'light', // Default selection
    template: '',
    layoutStyle: 'Header Navigation', // Default selection
    pages: ['Home', 'About Us', 'Contact'], // Default selections
    features: ['Contact Forms', 'SEO Optimization'], // Default selections
    domainOption: 'subdomain', // Default selection
  });

  useEffect(() => {
    if (initialType === 'shop') {
      setCurrentStep(2); // Skip website type selection for shops
      setWebsiteData(prev => ({
        ...prev,
        type: 'shop',
        template: 'Single Store', // Default for shop
        pages: ['Home', 'Shop', 'About Us', 'Contact', 'Cart'], // Default for shop
        features: ['Payment Gateway', 'Inventory Management'] // Default for shop
      }));
    } else {
      setCurrentStep(1);
      setWebsiteData(prev => ({
        ...prev,
        type: 'website',
        template: 'Modern Business', // Default for website
        pages: ['Home', 'About Us', 'Contact'], // Default for website
        features: ['Contact Forms', 'SEO Optimization'] // Default for website
      }));
    }
  }, [initialType, isOpen]);

  const industries = [
    'Business & Consulting', 'E-commerce & Retail', 'Technology & Software',
    'Health & Wellness', 'Education & Training', 'Creative & Design',
    'Food & Restaurant', 'Real Estate', 'Finance & Insurance',
    'Travel & Tourism', 'Sports & Fitness', 'Non-profit'
  ];

  const colorSchemes = [
    { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#0284c7', accent: '#0369a1' },
    { name: 'Forest Green', primary: '#16876b', secondary: '#0f6b54', accent: '#059669' },
    { name: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c', accent: '#dc2626' },
    { name: 'Royal Purple', primary: '#9333ea', secondary: '#7c3aed', accent: '#6d28d9' },
    { name: 'Rose Pink', primary: '#ec4899', secondary: '#db2777', accent: '#be185d' },
  ];

  const websiteTemplates = [
    'Modern Business', 'Creative Portfolio', 'Professional Services',
    'Landing Page', 'Blog & News', 'Corporate'
  ];

  const shopTemplates = [
    'Single Store', 'Marketplace'
  ];

  const layoutStyles = [
    'Header + Sidebar', 'Header Navigation', 'Full Width', 'Boxed Layout'
  ];

  const websitePages = [
    'Home', 'About Us', 'Services', 'Portfolio', 'Blog', 'Contact',
    'Team', 'Testimonials', 'FAQ', 'Privacy Policy'
  ];

  const shopPages = [
    'Home', 'Shop', 'Product Categories', 'About Us', 'Contact',
    'Cart', 'Checkout', 'My Account', 'Shipping Info', 'Returns'
  ];

  const websiteFeatures = [
    'Contact Forms', 'Newsletter Signup', 'Social Media Integration',
    'Google Analytics', 'SEO Optimization', 'Live Chat',
    'Booking System', 'Photo Gallery', 'Testimonials', 'Blog'
  ];

  const shopFeatures = [
    'Payment Gateway', 'Inventory Management', 'Order Tracking',
    'Customer Reviews', 'Wishlist', 'Discount Codes',
    'Multi-currency', 'Shipping Calculator', 'Abandoned Cart Recovery'
  ];

  const handleNext = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePageToggle = (page: string) => {
    setWebsiteData(prev => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter(p => p !== page)
        : [...prev.pages, page]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setWebsiteData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleCreateWebsite = () => {
    // Here you would typically send the data to your backend
    console.log('Creating website with data:', websiteData);
    onClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setWebsiteData({
      type: 'website',
      name: '',
      description: '',
      industry: 'Business & Consulting',
      colorScheme: 'Forest Green',
      themeStyle: 'light',
      template: 'Modern Business',
      layoutStyle: 'Header Navigation',
      pages: ['Home', 'About Us', 'Contact'],
      features: ['Contact Forms', 'SEO Optimization'],
      domainOption: 'subdomain',
    });
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">What would you like to create?</h2>
              <p className="text-gray-600 text-sm">Choose the type of website you want to build</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setWebsiteData(prev => ({ 
                  ...prev, 
                  type: 'website',
                  template: 'Modern Business',
                  pages: ['Home', 'About Us', 'Contact'],
                  features: ['Contact Forms', 'SEO Optimization']
                }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  websiteData.type === 'website'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Monitor className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-gray-900 mb-1">Website</h3>
                <p className="text-xs text-gray-600">Perfect for businesses, portfolios, and informational sites</p>
              </button>
              <button
                onClick={() => setWebsiteData(prev => ({ 
                  ...prev, 
                  type: 'shop',
                  template: 'Single Store',
                  pages: ['Home', 'Shop', 'About Us', 'Contact', 'Cart'],
                  features: ['Payment Gateway', 'Inventory Management']
                }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  websiteData.type === 'shop'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ShoppingCart className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-gray-900 mb-1">Online Shop</h3>
                <p className="text-xs text-gray-600">Sell products online with a complete e-commerce solution</p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600 text-sm">Tell us about your {websiteData.type}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {websiteData.type === 'shop' ? 'Shop Name' : 'Website Name'}
                </label>
                <input
                  type="text"
                  value={websiteData.name}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={websiteData.type === 'shop' ? 'My Online Store' : 'My Business Website'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={websiteData.description}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={websiteData.type === 'shop' 
                    ? 'Describe what you sell and what makes your store unique...'
                    : 'Describe your business and what you do...'
                  }
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Your Industry</h2>
              <p className="text-gray-600 text-sm">This helps us customize your {websiteData.type} for your needs</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setWebsiteData(prev => ({ ...prev, industry }))}
                  className={`p-3 text-xs border-2 rounded-lg transition-all ${
                    websiteData.industry === industry
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Color Scheme</h2>
              <p className="text-gray-600 text-sm">Select colors that represent your brand</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.name}
                  onClick={() => setWebsiteData(prev => ({ ...prev, colorScheme: scheme.name }))}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    websiteData.colorScheme === scheme.name
                      ? 'border-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex space-x-1 mb-2 justify-center">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: scheme.accent }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900">{scheme.name}</p>
                </button>
              ))}
              <button
                onClick={() => setWebsiteData(prev => ({ ...prev, colorScheme: 'custom' }))}
                className={`p-3 border-2 rounded-lg transition-all ${
                  websiteData.colorScheme === 'custom'
                    ? 'border-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <Palette className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-xs font-medium text-gray-900">Custom Color</p>
              </button>
            </div>
            {websiteData.colorScheme === 'custom' && (
              <div className="max-w-xs mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <input
                  type="color"
                  value={websiteData.customColor || '#16876b'}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, customColor: e.target.value }))}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Theme Style</h2>
              <p className="text-gray-600 text-sm">Choose between light or dark theme</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setWebsiteData(prev => ({ ...prev, themeStyle: 'light' }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  websiteData.themeStyle === 'light'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-8 bg-white border border-gray-200 rounded mb-3 mx-auto"></div>
                <h3 className="font-semibold text-gray-900 mb-1">Light Theme</h3>
                <p className="text-xs text-gray-600">Clean and bright appearance</p>
              </button>
              <button
                onClick={() => setWebsiteData(prev => ({ ...prev, themeStyle: 'dark' }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  websiteData.themeStyle === 'dark'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-8 bg-gray-800 rounded mb-3 mx-auto"></div>
                <h3 className="font-semibold text-gray-900 mb-1">Dark Theme</h3>
                <p className="text-xs text-gray-600">Modern and sleek appearance</p>
              </button>
            </div>
          </div>
        );

      case 6:
        const templates = websiteData.type === 'shop' ? shopTemplates : websiteTemplates;
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Template</h2>
              <p className="text-gray-600 text-sm">Select a template that fits your {websiteData.type}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
              {templates.map((template) => (
                <button
                  key={template}
                  onClick={() => setWebsiteData(prev => ({ ...prev, template }))}
                  className={`p-4 border-2 rounded-lg transition-all text-left ${
                    websiteData.template === template
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-20 bg-gray-100 rounded mb-3"></div>
                  <h3 className="text-xs font-semibold text-gray-900">{template}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Layout Style</h2>
              <p className="text-gray-600 text-sm">Choose how your content will be organized</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layoutStyles.map((layout) => (
                <button
                  key={layout}
                  onClick={() => setWebsiteData(prev => ({ ...prev, layoutStyle: layout }))}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    websiteData.layoutStyle === layout
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-16 bg-gray-100 rounded mb-3"></div>
                  <h3 className="text-xs font-semibold text-gray-900">{layout}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        const pages = websiteData.type === 'shop' ? shopPages : websitePages;
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Pages to Include</h2>
              <p className="text-gray-600 text-sm">Select the pages you want on your {websiteData.type}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageToggle(page)}
                  className={`p-3 border-2 rounded-lg transition-all flex items-center justify-between ${
                    websiteData.pages.includes(page)
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-medium">{page}</span>
                  {websiteData.pages.includes(page) && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        const features = websiteData.type === 'shop' ? shopFeatures : websiteFeatures;
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Additional Features</h2>
              <p className="text-gray-600 text-sm">Choose features to enhance your {websiteData.type}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`p-3 border-2 rounded-lg transition-all flex items-center justify-between ${
                    websiteData.features.includes(feature)
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-medium">{feature}</span>
                  {websiteData.features.includes(feature) && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Domain Options</h2>
              <p className="text-gray-600 text-sm">Choose how you want to handle your domain</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setWebsiteData(prev => ({ ...prev, domainOption: 'subdomain' }))}
                className={`w-full p-3 border-2 rounded-lg transition-all text-left ${
                  websiteData.domainOption === 'subdomain'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Free Subdomain</h3>
                <p className="text-xs text-gray-600">yoursite.nyatti.com (Free)</p>
              </button>
              <button
                onClick={() => setWebsiteData(prev => ({ ...prev, domainOption: 'new' }))}
                className={`w-full p-3 border-2 rounded-lg transition-all text-left ${
                  websiteData.domainOption === 'new'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Purchase New Domain</h3>
                <p className="text-xs text-gray-600">Buy a new custom domain ($12/year)</p>
              </button>
              <button
                onClick={() => setWebsiteData(prev => ({ ...prev, domainOption: 'existing' }))}
                className={`w-full p-3 border-2 rounded-lg transition-all text-left ${
                  websiteData.domainOption === 'existing'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Use Existing Domain</h3>
                <p className="text-xs text-gray-600">Connect a domain you already own</p>
              </button>
            </div>
            {websiteData.domainOption === 'existing' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain Name</label>
                <input
                  type="text"
                  value={websiteData.customDomain || ''}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, customDomain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="example.com"
                />
              </div>
            )}
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Summary</h2>
              <p className="text-gray-600 text-sm">Review your {websiteData.type} configuration</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <span className="text-sm text-gray-900 capitalize">{websiteData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="text-sm text-gray-900">{websiteData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Industry:</span>
                  <span className="text-sm text-gray-900">{websiteData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Template:</span>
                  <span className="text-sm text-gray-900">{websiteData.template}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Pages:</span>
                  <span className="text-sm text-gray-900">{websiteData.pages.length} pages</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Features:</span>
                  <span className="text-sm text-gray-900">{websiteData.features.length} features</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Domain:</span>
                  <span className="text-sm text-gray-900 capitalize">{websiteData.domainOption}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleCreateWebsite}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>Create Website</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-gray-900">Create Website</h1>
            <span className="text-sm text-gray-500">Step {currentStep} of 11</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 11) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between p-4 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || (currentStep === 2 && initialType === 'shop')}
            className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          {currentStep < 11 && (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWebsiteModal;