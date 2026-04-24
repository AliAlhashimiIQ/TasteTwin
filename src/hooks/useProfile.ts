import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import type { Profile, TasteProfile } from '../types/database';

// Fetch the current user's profile and taste profile
export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      const { data: tasteProfile, error: tasteError } = await supabase
        .from('taste_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (tasteError) throw tasteError;

      return {
        profile: profile as Profile,
        tasteProfile: tasteProfile as TasteProfile,
      };
    },
    enabled: !!user,
  });
};

// Update the user's profile (name, username, avatar)
export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Pick<Profile, 'username' | 'full_name' | 'avatar_url'>>) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
};

// Update the user's taste profile (diet, allergies, flavors, cuisines)
export const useUpdateTasteProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Pick<TasteProfile, 'dietary_regimen' | 'allergies' | 'flavor_affinities' | 'favorite_cuisines'>>) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('taste_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as TasteProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
};
