import React, { useState, useEffect } from 'react';
import { Plus, Globe, ExternalLink, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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
    navigate('/create');
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

  const hasWebsites = userStats.totalSites > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            {hasWebsites 
              ? "Here's an overview of your websites and domains." 
              : "Ready to build your first website? Let's get started!"
            }
          </p>
        </div>
        <button 
          onClick={handleCreateWebsite}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#16876b] text-white rounded-xl hover:bg-[#16876b]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>Create Website</span>
        </button>
      </div>

      {hasWebsites ? (
        /* Overview Cards for existing users */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Websites Card */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Websites</h2>
                    <p className="text-sm text-gray-500 mt-1">Your digital presence</p>
                  </div>
                  <div className="p-3 bg-[#16876b] rounded-xl shadow-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Total Sites</span>
                    <span className="font-bold text-gray-900 text-2xl">{userStats.totalSites}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Active</span>
                    <span className="font-bold text-green-600 text-lg">{userStats.activeSites}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">In Development</span>
                    <span className="font-bold text-amber-600 text-lg">{userStats.developmentSites}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Domains Card */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Domains</h2>
                    <p className="text-sm text-gray-500 mt-1">Your web addresses</p>
                  </div>
                  <div className="p-3 bg-[#16876b] rounded-xl shadow-lg">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Total Domains</span>
                    <span className="font-bold text-gray-900 text-2xl">{userStats.totalDomains}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Active</span>
                    <span className="font-bold text-green-600 text-lg">{userStats.activeDomains}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">Expiring Soon</span>
                    <span className="font-bold text-orange-600 text-lg">{userStats.expiringSoon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                  <p className="text-sm text-gray-500">Manage your resources</p>
                </div>
                <div className="p-3 bg-[#16876b] rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/websites')}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 text-left group border border-transparent hover:border-blue-200"
                >
                  <span className="text-gray-700 font-medium group-hover:text-blue-700">Manage Websites</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                </button>
                <button 
                  onClick={() => navigate('/domains')}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 text-left group border border-transparent hover:border-emerald-200"
                >
                  <span className="text-gray-700 font-medium group-hover:text-emerald-700">Manage Domains</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                </button>
                <button 
                  onClick={() => navigate('/emails')}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 text-left group border border-transparent hover:border-purple-200"
                >
                  <span className="text-gray-700 font-medium group-hover:text-purple-700">Email Accounts</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-all" />
                </button>
                <button 
                  onClick={() => navigate('/billing')}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200 text-left group border border-transparent hover:border-amber-200"
                >
                  <span className="text-gray-700 font-medium group-hover:text-amber-700">Billing & Plans</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transform group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Getting Started for new users */
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-blue-100">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-20 -translate-x-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full translate-y-16 translate-x-16"></div>
          <div className="relative max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#16876b] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Create Your First Website
            </h2>
            <p className="text-gray-600 mb-10 text-xl leading-relaxed">
              Build beautiful, professional websites with our easy-to-use tools. 
              No coding experience required – just bring your ideas to life.
            </p>
            <button 
              onClick={handleCreateWebsite}
              className="inline-flex items-center space-x-4 px-10 py-5 bg-[#16876b] text-white rounded-2xl hover:bg-[#16876b]/90 transition-all duration-200 shadow-2xl hover:shadow-3xl text-xl font-semibold transform hover:-translate-y-1"
            >
              <Plus className="w-7 h-7" />
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;