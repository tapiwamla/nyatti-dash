import React, { useEffect, useState } from 'react';
import { User, Settings, LogOut, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase'; 

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, anchorRef }) => {
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [user, setUser] = useState<any>(null);

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

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-64"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`
      }}
    >
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
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-left">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">Account Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-left">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">Billing & Payments</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-left text-red-600">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
