// src/components/topbar/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserCircle, LogOut, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from Supabase
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBillingClick = () => {
    onClose(); // Close the dropdown first
    navigate('/billing');
  };

  const handleSettingsClick = () => {
    onClose(); // Close the dropdown first
    navigate('/account');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-64">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {user?.user_metadata?.full_name ||
               user?.user_metadata?.name ||
               user?.user_metadata?.display_name ||
               (user?.email?.split('@')[0]) ||
               'User'}
            </h3>
            <p className="text-sm text-gray-600">{user?.email || 'No email'}</p>
          </div>
        </div>
       
        <div className="space-y-1">
          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-left"
          >
            <UserCircle className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">Manage Profile</span>
          </button>
          <button
            onClick={handleBillingClick}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-left"
          >
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">Manage Billing</span>
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-50 text-left text-red-600 border border-red-200 hover:border-red-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;