import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import type { FavoriteWithMeal } from '../types/database';

// Fetch all favorites for the current user, joined with meal_logs data
export const useFavorites = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('favorites')
        .select('*, meal_logs(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as FavoriteWithMeal[];
    },
    enabled: !!user,
  });
};

// Toggle a meal as favorite (add if not exists, remove if exists)
export const useToggleFavorite = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mealLogId: string) => {
      if (!user) throw new Error('Not authenticated');

      // Check if already favorited
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('meal_log_id', mealLogId)
        .single();

      if (existing) {
        // Remove favorite
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        return { action: 'removed' as const, mealLogId };
      } else {
        // Add favorite
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, meal_log_id: mealLogId });

        if (error) throw error;
        return { action: 'added' as const, mealLogId };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
    },
  });
};
