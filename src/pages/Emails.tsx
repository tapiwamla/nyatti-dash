import React from 'react';
import { Plus, Mail, MailOpen } from 'lucide-react';

const Emails: React.FC = () => {
  const emailAccounts = [
    {
      id: 1,
      email: 'admin@myportfolio.com',
      domain: 'myportfolio.com',
      storage: 2.1,
      maxStorage: 5
    },
    {
      id: 2,
      email: 'support@mystore.com',
      domain: 'mystore.com',
      storage: 0.85,
      maxStorage: 5
    }
  ];

  const formatStorage = (gb: number) => {
    if (gb < 1) {
      return `${Math.round(gb * 1000)} MB`;
    }
    return `${gb.toFixed(1)} GB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Accounts</h1>
          <p className="text-gray-600 mt-1">Manage your professional email accounts</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Email</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Email Accounts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {emailAccounts.map((account) => (
            <div key={account.id} className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{account.email}</h3>
                    <p className="text-sm text-gray-600">{account.domain}</p>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-md text-sm flex items-center space-x-1 transition-colors">
                  <MailOpen className="w-4 h-4" />
                  <span>Read Emails</span>
                </button>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">
                  {formatStorage(account.storage)} used of {formatStorage(account.maxStorage)}
                </p>
                <p className="text-xs text-gray-600">
                  {Math.round((account.storage / account.maxStorage) * 100)}% used
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${(account.storage / account.maxStorage) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emails;