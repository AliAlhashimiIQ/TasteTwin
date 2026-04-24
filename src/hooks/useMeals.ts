import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import type { MealLog } from '../types/database';

// Fetch all meal logs for the current user, ordered by most recent
export const useMeals = (limit?: number) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['meals', user?.id, limit],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');

      let query = supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as MealLog[];
    },
    enabled: !!user,
  });
};

// Insert a new meal log
export const useCreateMeal = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meal: Omit<MealLog, 'id' | 'user_id' | 'created_at'>) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('meal_logs')
        .insert({ ...meal, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as MealLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals', user?.id] });
    },
  });
};
