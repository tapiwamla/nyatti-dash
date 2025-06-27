import React from 'react';
import { Plus, ExternalLink, Calendar, Settings } from 'lucide-react';

const Domains: React.FC = () => {
  const domains = [
    {
      id: 1,
      name: 'myportfolio.com',
      status: 'Active',
      expiryDate: '2025-03-15',
      autoRenew: true
    },
    {
      id: 2,
      name: 'mystore.com',
      status: 'Active',
      expiryDate: '2025-06-22',
      autoRenew: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Domains</h1>
          <p className="text-gray-600 mt-1">Manage your domain names</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Purchase New Domain</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My Domains</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {domains.map((domain) => (
            <div key={domain.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ExternalLink className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{domain.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      domain.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {domain.status}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Expires {domain.expiryDate}</span>
                    </div>
                    {domain.autoRenew && (
                      <span className="text-xs text-green-600">Auto-renew enabled</span>
                    )}
                  </div>
                </div>
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm flex items-center space-x-1 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Manage</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Domains;