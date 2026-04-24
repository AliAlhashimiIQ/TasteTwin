// TypeScript types matching the Supabase database schema

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface FlavorAffinities {
  spicy: number;
  umami: number;
  sweet: number;
  sour: number;
  bitter: number;
}

export interface TasteProfile {
  id: string;
  user_id: string;
  dietary_regimen: string;
  allergies: string[];
  flavor_affinities: FlavorAffinities;
  favorite_cuisines: string[];
  updated_at: string;
}

export interface MealLog {
  id: string;
  user_id: string;
  image_url: string | null;
  name: string;
  restaurant: string | null;
  location: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sodium: number | null;
  sugar: number | null;
  flavor_tags: string[];
  ingredients: string[];
  ai_insight: string | null;
  pairing_suggestion: string | null;
  match_score: number | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  meal_log_id: string;
  created_at: string;
}

// Joined type for favorites with meal data
export interface FavoriteWithMeal extends Favorite {
  meal_logs: MealLog;
}
