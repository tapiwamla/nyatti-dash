import React, { useState, useEffect } from 'react';
import { Plus, Store, TrendingUp, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalShops: 0,
    activeShops: 0,
    totalProducts: 0,
    totalRevenue: 0
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
            totalShops: 0,
            activeShops: 0,
            totalProducts: 0,
            totalRevenue: 0
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
      // const { data: shops } = await supabase
      //   .from('shops')
      //   .select('*')
      //   .eq('user_id', userId);

      // For now, using mock data - replace with actual queries
      setUserStats({
        totalShops: 2,
        activeShops: 1,
        totalProducts: 24,
        totalRevenue: 1250
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleCreateShop = () => {
    navigate('/create-shop');
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

  const hasShops = userStats.totalShops > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {firstName}!
          </h1>
          <p className="text-gray-600 mt-1">
            {hasShops 
              ? "Here's your shop overview." 
              : "Ready to create your first shop?"
            }
          </p>
        </div>
      </div>

      {/* Create Shop Banner */}
      <div className="bg-gradient-to-r from-[#16876b] to-[#14a085] rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {hasShops ? 'Expand Your Business' : 'Start Your Journey'}
            </h2>
            <p className="text-white/90">
              {hasShops 
                ? 'Create another shop to reach more customers' 
                : 'Create your first shop and start selling online'
              }
            </p>
          </div>
          <button 
            onClick={handleCreateShop}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-[#16876b] rounded-xl hover:bg-white/95 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Create Shop</span>
          </button>
        </div>
      </div>

      {hasShops && (
        /* Overview Stats */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Shops</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalShops}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Shops</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.activeShops}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Store className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalProducts}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${userStats.totalRevenue}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {hasShops && (
        /* Recent Activity */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Your Shops</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8 text-gray-500">
              <Store className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Your shops will appear here once you create them.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;