import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../lib/AuthContext';

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const DEFAULT_GOALS: MacroGoals = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};

const STORAGE_KEY = 'tastetwin_macro_goals';

export const useMacroGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<MacroGoals>(DEFAULT_GOALS);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = user ? `${STORAGE_KEY}_${user.id}` : STORAGE_KEY;

  // Load saved goals
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          setGoals(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load macro goals:', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [storageKey]);

  // Save goals
  const saveGoals = useCallback(async (newGoals: MacroGoals) => {
    try {
      setGoals(newGoals);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newGoals));
    } catch (e) {
      console.warn('Failed to save macro goals:', e);
    }
  }, [storageKey]);

  return { goals, saveGoals, isLoading };
};
