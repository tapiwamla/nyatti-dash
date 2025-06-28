import React, { useState, useEffect } from 'react';
import { Plus, Globe, ExternalLink, ArrowRight } from 'lucide-react';
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
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Create Website</span>
        </button>
      </div>

      {hasWebsites ? (
        /* Overview Cards for existing users */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Websites</h2>
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Sites</span>
                  <span className="font-semibold text-gray-900 text-lg">{userStats.totalSites}</span>
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Domains</span>
                  <span className="font-semibold text-gray-900 text-lg">{userStats.totalDomains}</span>
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

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/websites')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-gray-700">Manage Websites</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                onClick={() => navigate('/domains')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-gray-700">Manage Domains</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                onClick={() => navigate('/emails')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-gray-700">Email Accounts</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                onClick={() => navigate('/billing')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-gray-700">Billing & Plans</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Getting Started for new users */
        <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create Your First Website
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Build beautiful, professional websites with our easy-to-use tools. 
              No coding experience required – just bring your ideas to life.
            </p>
            <button 
              onClick={handleCreateWebsite}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg text-lg font-medium"
            >
              <Plus className="w-6 h-6" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;