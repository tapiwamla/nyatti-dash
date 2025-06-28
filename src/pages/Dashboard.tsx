import React, { useState, useEffect } from 'react';
import { Plus, Globe, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import CreateWebsiteModal from '../components/CreateWebsiteModal';

const Dashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<'website' | 'shop'>('website');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalSites: 0,
    activeSites: 0,
    developmentSites: 0,
    totalDomains: 0,
    activeDomains: 0,
    expiringSoon: 0
  });

  const getUserFirstName = (user: SupabaseUser): string => {
    // Check user metadata for first name
    if (user.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    
    // Check if there's a full name and extract first name
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    
    // Check app metadata as fallback
    if (user.app_metadata?.first_name) {
      return user.app_metadata.first_name;
    }
    
    // If email exists, use the part before @ as fallback
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    // Final fallback
    return 'User';
  };

  useEffect(() => {
    // Get current user and set up auth listener
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        setFirstName(getUserFirstName(user));
        // Fetch user's website and domain stats here
        // This is where you'd query your websites and domains tables
        await fetchUserStats(user.id);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setFirstName(getUserFirstName(session.user));
          await fetchUserStats(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setFirstName('');
          setUserStats({
            totalSites: 0,
            activeSites: 0,
            developmentSites: 0,
            totalDomains: 0,
            activeDomains: 0,
            expiringSoon: 0
          });
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserStats = async (userId: string) => {
    try {
      // Example queries - adjust based on your database schema
      // const { data: websites } = await supabase
      //   .from('websites')
      //   .select('*')
      //   .eq('user_id', userId);

      // const { data: domains } = await supabase
      //   .from('domains')
      //   .select('*')
      //   .eq('user_id', userId);

      // For now, using mock data - replace with actual queries
      setUserStats({
        totalSites: 3,
        activeSites: 2,
        developmentSites: 1,
        totalDomains: 2,
        activeDomains: 2,
        expiringSoon: 0
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleCreateWebsite = () => {
    setCreateModalType('website');
    setIsCreateModalOpen(true);
  };

  const handleCreateShop = () => {
    setCreateModalType('shop');
    setIsCreateModalOpen(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h1>
          <p className="text-gray-600">You need to be signed in to access the dashboard.</p>
        </div>
        <button
          onClick={() => window.location.href = '/login'}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {firstName}!
        </p>
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
              <span className="font-semibold text-gray-900">{userStats.totalSites}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active</span>
              <span className="font-semibold text-green-600">{userStats.activeSites}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Development</span>
              <span className="font-semibold text-yellow-600">{userStats.developmentSites}</span>
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
              <span className="font-semibold text-gray-900">{userStats.totalDomains}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active</span>
              <span className="font-semibold text-green-600">{userStats.activeDomains}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expiring Soon</span>
              <span className="font-semibold text-orange-600">{userStats.expiringSoon}</span>
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