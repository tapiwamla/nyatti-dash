import React from 'react';
import { Mail } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AccountInfoTabProps {
  user: SupabaseUser;
}

const AccountInfoTab: React.FC<AccountInfoTabProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
          <p className="text-sm text-gray-600">Your account details and status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
          <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg font-mono break-all">
            {user.id}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
          <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
            {formatDate(user.created_at)}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Verified</label>
          <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
            {user.email_confirmed_at ? (
              <span className="text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Verified
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                Not Verified
              </span>
            )}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
          <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
            {user.last_sign_in_at ? formatDateTime(user.last_sign_in_at) : 'Never'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
            {user.email}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Provider</label>
          <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg capitalize">
            {user.app_metadata?.provider || 'Email'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoTab;