// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Shop types
export interface Shop {
  id: string;
  user_id: string;
  name: string;
  subdomain: string;
  template_id: string | null;
  plan_type: 'standard' | 'premium';
  status: 'active' | 'development' | 'suspended';
  domain: string | null;
  products_count: number;
  revenue: number;
  created_at: string;
  updated_at: string;
}

export interface CreateShopData {
  name: string;
  subdomain: string;
  template_id: string | null;
  plan_type: 'standard' | 'premium';
  status?: 'active' | 'development';
}

// Shop service functions
export const shopService = {
  // Create a new shop
  async createShop(shopData: CreateShopData): Promise<Shop> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('shops')
      .insert([{
        user_id: user.id,
        name: shopData.name,
        subdomain: shopData.subdomain,
        template_id: shopData.template_id,
        plan_type: shopData.plan_type,
        status: shopData.status || 'active'
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create shop: ${error.message}`);
    }

    return data;
  },

  // Get all shops for the current user
  async getUserShops(): Promise<Shop[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch shops: ${error.message}`);
    }

    return data || [];
  },

  // Get a single shop by ID
  async getShopById(shopId: string): Promise<Shop | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Shop not found
      }
      throw new Error(`Failed to fetch shop: ${error.message}`);
    }

    return data;
  },

  // Update shop details
  async updateShop(shopId: string, updates: Partial<CreateShopData>): Promise<Shop> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('shops')
      .update(updates)
      .eq('id', shopId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update shop: ${error.message}`);
    }

    return data;
  },

  // Delete a shop
  async deleteShop(shopId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('shops')
      .delete()
      .eq('id', shopId)
      .eq('user_id', user.id);

    if (error) {
      throw new Error(`Failed to delete shop: ${error.message}`);
    }
  },

  // Check if subdomain is available
  async checkSubdomainAvailable(subdomain: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('shops')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single();

    if (error && error.code === 'PGRST116') {
      return true; // Subdomain not found, so it's available
    }

    return false; // Subdomain exists or other error
  }
};