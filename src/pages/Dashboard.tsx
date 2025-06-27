import React, { useState } from 'react';
import { Plus, Globe, ExternalLink } from 'lucide-react';
import CreateWebsiteModal from '../components/CreateWebsiteModal';

const Dashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<'website' | 'shop'>('website');

  const handleCreateWebsite = () => {
    setCreateModalType('website');
    setIsCreateModalOpen(true);
  };

  const handleCreateShop = () => {
    setCreateModalType('shop');
    setIsCreateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your websites.</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleCreateWebsite}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Create New Site</h3>
              <p className="text-sm text-gray-600">Start building your website</p>
            </div>
          </button>
          
          <button 
            onClick={handleCreateShop}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Create New Shop</h3>
              <p className="text-sm text-gray-600">Launch your online store</p>
            </div>
          </button>
        </div>
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Websites</h2>
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Sites</span>
              <span className="font-semibold text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active</span>
              <span className="font-semibold text-green-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Development</span>
              <span className="font-semibold text-yellow-600">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Domains</h2>
            <ExternalLink className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Domains</span>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active</span>
              <span className="font-semibold text-green-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expiring Soon</span>
              <span className="font-semibold text-orange-600">0</span>
            </div>
          </div>
        </div>
      </div>

      <CreateWebsiteModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialType={createModalType}
      />
    </div>
  );
};

export default Dashboard;