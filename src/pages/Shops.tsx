import React from 'react';
import { Plus, Eye, Settings, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Shops: React.FC = () => {
  const navigate = useNavigate();
  
  const shops = [
    {
      id: 1,
      name: 'Fashion Store',
      domain: 'fashionstore.com',
      status: 'Active',
      products: 24,
      revenue: '$1,250'
    },
    {
      id: 2,
      name: 'Tech Gadgets',
      domain: 'techgadgets.com',
      status: 'Active',
      products: 15,
      revenue: '$890'
    },
    {
      id: 3,
      name: 'Home Decor',
      domain: 'homedecor.com',
      status: 'Development',
      products: 8,
      revenue: '$0'
    }
  ];

  const handleCreateShop = () => {
    navigate('/create-shop');
  };

  const handleManageShop = (shopId: number) => {
    navigate(`/shops/${shopId}/manage`);
  };

  const handleViewShop = (shopId: number) => {
    // Open shop in new tab
    window.open(`https://shop-${shopId}.example.com`, '_blank');
  };

  const handleShopDashboard = (shopId: number) => {
    navigate(`/shops/${shopId}/dashboard`);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{shop.name}</h3>
                <p className="text-sm text-gray-600">{shop.domain}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                shop.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {shop.status}
              </span>
            </div>
           
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Products</span>
                <span className="font-medium">{shop.products}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Revenue</span>
                <span className="font-medium text-green-600">{shop.revenue}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewShop(shop.id)}
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

      {shops.length === 0 && (
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