// src/pages/Billing.tsx
import React, { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, Globe, ShoppingCart, AlertCircle } from 'lucide-react';

const Billing: React.FC = () => {
  const [currency] = useState('USD'); // This would come from context/state management

  const subscriptions = [
    {
      id: 1,
      name: 'My Portfolio',
      type: 'website',
      domain: 'myportfolio.com',
      price: currency === 'USD' ? '$100' : 'KES 10,000',
      status: 'Active',
      nextBilling: '2025-03-15',
      autoRenew: true
    },
    {
      id: 2,
      name: 'Online Store',
      type: 'shop',
      domain: 'mystore.com',
      price: currency === 'USD' ? '$200' : 'KES 20,000',
      status: 'Active',
      nextBilling: '2025-06-22',
      autoRenew: true
    },
    {
      id: 3,
      name: 'Blog Site',
      type: 'website',
      domain: 'myblog.com',
      price: currency === 'USD' ? '$100' : 'KES 10,000',
      status: 'Pending Payment',
      nextBilling: '2025-01-15',
      autoRenew: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiryDate: '12/26',
      isDefault: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Payment':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'shop' ? (
      <ShoppingCart className="w-5 h-5 text-gray-400" />
    ) : (
      <Globe className="w-5 h-5 text-gray-400" />
    );
  };

  const totalMonthly = subscriptions
    .filter(sub => sub.status === 'Active')
    .reduce((total, sub) => {
      const price = currency === 'USD' ? 
        (sub.type === 'shop' ? 200 : 100) : 
        (sub.type === 'shop' ? 20000 : 10000);
      return total + price;
    }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-1">Manage your subscriptions and payment methods</p>
      </div>

      {/* Billing Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {currency === 'USD' ? '$' : 'KES '}{totalMonthly.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-1">Total Annual Cost</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {subscriptions.filter(sub => sub.status === 'Active').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Active Subscriptions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {subscriptions.filter(sub => sub.status === 'Pending Payment').length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Pending Payments</p>
          </div>
        </div>
      </div>

      {/* Active Subscriptions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Website Subscriptions</h2>
          <p className="text-sm text-gray-600 mt-1">Each website and shop has its own subscription</p>
        </div>
        <div className="divide-y divide-gray-200">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(subscription.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{subscription.name}</h3>
                    <p className="text-sm text-gray-600">{subscription.domain}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {subscription.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(subscription.status)}`}>
                        {subscription.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {subscription.price}/year
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Next billing: {subscription.nextBilling}
                    </span>
                  </div>
                  {subscription.autoRenew ? (
                    <div className="flex items-center space-x-1 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">Auto-renew enabled</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-yellow-600">Auto-renew disabled</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors">
                  Manage Subscription
                </button>
                {subscription.status === 'Pending Payment' && (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <CreditCard className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {method.type} ending in {method.last4}
                  </p>
                  <p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;