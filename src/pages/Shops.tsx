// src/pages/Shops.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Eye, Settings, LayoutDashboard, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { shopService, Shop } from '@/lib/supabase';

const Shops: React.FC = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);
      setError(null);
      const userShops = await shopService.getUserShops();
      setShops(userShops);
    } catch (err) {
      console.error('Error fetching shops:', err);
      setError(err instanceof Error ? err.message : 'Failed to load shops');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShop = () => {
    navigate('/create');
  };

  const handleManageShop = (shopId: string) => {
    navigate(`/shops/${shopId}/manage`);
  };

  const handleViewShop = (subdomain: string) => {
    // Open shop in new tab
    window.open(`https://${subdomain}.nyatti.co`, '_blank');
  };

  const handleShopDashboard = (shopId: string) => {
    navigate(`/shops/${shopId}/dashboard`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'development':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanDisplayName = (planType: string) => {
    return planType.charAt(0).toUpperCase() + planType.slice(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
            <p className="text-gray-600 mt-1">Manage your online stores</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading shops...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
            <p className="text-gray-600 mt-1">Manage your online stores</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-800">
              <h3 className="font-medium">Error loading shops</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchShops}
            className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
          <p className="text-gray-600 mt-1">Manage your online stores</p>
        </div>
        <button
          onClick={handleCreateShop}
          className="bg-[#16876b] hover:bg-[#16876b]/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Shop</span>
        </button>
      </div>

      {shops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{shop.name}</h3>
                  <p className="text-sm text-gray-600">{shop.subdomain}.nyatti.co</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getPlanDisplayName(shop.plan_type)} Plan
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(shop.status)}`}>
                  {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                </span>
              </div>
             
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Products</span>
                  <span className="font-medium">{shop.products_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(shop.revenue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-700">
                    {new Date(shop.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewShop(shop.subdomain)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button 
                    onClick={() => handleShopDashboard(shop.id)}
                    className="flex-1 bg-[#16876b] hover:bg-[#16876b]/90 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                </div>
                <button 
                  onClick={() => handleManageShop(shop.id)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Manage</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shops yet</h3>
          <p className="text-gray-600 mb-6">Create your first shop to start selling online</p>
          <button
            onClick={handleCreateShop}
            className="bg-[#16876b] hover:bg-[#16876b]/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Create Your First Shop
          </button>
        </div>
      )}
    </div>
  );
};

export default Shops;