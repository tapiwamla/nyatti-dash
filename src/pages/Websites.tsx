import React from 'react';
import { Plus, ExternalLink, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Websites: React.FC = () => {
  const navigate = useNavigate();

  const websites = [
    {
      id: 1,
      name: 'My Portfolio',
      domain: 'myportfolio.com',
      status: 'Active',
      type: 'Website'
    },
    {
      id: 2,
      name: 'Online Store',
      domain: 'mystore.com',
      status: 'Active',
      type: 'Shop'
    },
    {
      id: 3,
      name: 'Blog Site',
      domain: 'myblog.com',
      status: 'Development',
      type: 'Website'
    }
  ];

  const handleCreateWebsite = () => {
    navigate('/create');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>
          <p className="text-gray-600 mt-1">Manage your websites and online stores</p>
        </div>
        <button
          onClick={handleCreateWebsite}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Site</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((website) => (
          <div key={website.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{website.name}</h3>
                <p className="text-sm text-gray-600">{website.domain}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                website.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {website.status}
              </span>
            </div>
           
            <div className="mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-wide">{website.type}</span>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Visit Site</span>
              </button>
              <button className="flex-1 bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1 transition-colors">
                <Settings className="w-4 h-4" />
                <span>WP Admin</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Websites;