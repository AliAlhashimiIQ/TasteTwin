import { useQuery } from '@tanstack/react-query';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import type { TasteProfile, FlavorAffinities } from '../types/database';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_VISION_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export interface Recommendation {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  match_percentage: number;
  image_url: string;
  cuisine_type: string;
  reason: string;
  ingredients: string[];
  instructions: string[];
  prep_time: string;
  servings: number;
}

// Curated food images to pair with recommendations (high-quality placeholders)
const FOOD_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuABo9-on4uBoRWouDr3hEstMICMx8Ftdh49km6ELGAP_Lw_zp3-fapcSD6xFXP2iyi0QSfi9ve46RwRX3I3kLmIdTOXxwG3yFRzP6enPaHIHUVzKXFrc1Tf9nExItP1OcTXtDxBdX6vf_QTkpxFGtZYgarbRGarZiK9GzUl2-rftSGyg7L9X6Ik2SQYLHXWuaZ-tGx85UYrf8GSUCIyqcGPxXM-wMI7oem1bFpaRlwZzsEzsIsij0M1lepX9sns82o-az644wDWCTKE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5i58qw-ORXUDfyZFGVzVEE4pgeVWDmmmdwzsChPGZ8VAyGMzb5XU_8Kr_-hMFtLsGh_IPI2LJbpyxnadGbbtsU4HyPjZ8e4Gpdm4RXFUDXVQOaMZjhwOVH8iWL7IuYe1R6hSD9N54Bqt-SSQJbF67Qhbe95BHHdI6oZA2bmYLbC4bb6IUupvhpkIViRTDjdGP6fLmLqFsrB-0NkAj6ETW_ggN8HCrExxPgzWPsTgfQmL7OSQyNlF8nV14AREwvw9o0ZmInm9LNHX',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDH2t76lb18Gjo3W2M3uDIrk11p4Db9mhnwr_tQ3T5tpACbqaXKTtiJZ_cvG9_v-2sQag38q2TwDJ3avhX_7yshUFqObD1tL8rnLcuais0i_xbKbT-hAXluTcsFGwssajdi99b0DsocgjN4qx_MtkDvpcXg3BULXOUi9T6sbSLXugQCSam3mASGSpsMPdrTu9ObVZ3oLbPLVBqvYFgvupw8ptqs2eKlxJBVU66mKkvTyemTWrzp9CfWH8OarBSV7lxQGWgs2DPyXcer',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAhq6k0dTYkv878mK3H_vvKI29flaBoT3i6bi45Dnq-qKxIfsEtmcoTM29XxHqWfrboKod4lA9eHex6CQiW-YvsD0l-oyIAlZO4wDxMOu7HFR-0lUlWQkfsmTWYkoJpnSrqgD_hYyiTSIk7MuAT4Phfp-byj9Qq2V9d0zKT5IovKSKGJIbihVb3NtAKeDNg-yv_9XsTMgp9Yt1TXbD8DUsnaeC4tzJ6GBKqY0sfChAYpOmKxGyWNQJslzJ9_ATsVpXy6oix-EFm1fUF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIVfjm-IrzcDJ-rjncyHQNbKZBvDnfbqvzkAZWEJyUjRAM-E73vohtCH6a_r97_m63VddRVc3YFEDPqKxjDtKW6JFuRFT_MlI8D2DArTdSLZIMcMIaC2JPugAeJ6JPUaoThYMnpLVM7A-8GhY1w2MLhz3xCoah1-uPdjSf947SJLdb7LRyx42LDLfKJ5XC9zSbS1_vqzwDjVfe7yW3OP4SeywK1d1t_FoLo8jZBSmdTDTt8p-Ase8PmY-KzqACbAogVYD0iC2U-qa7',
];

export const useRecommendations = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: async (): Promise<Recommendation[]> => {
      if (!user) throw new Error('Not authenticated');

      // Fetch user's taste profile
      const { data: tasteProfile, error } = await supabase
        .from('taste_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !tasteProfile) {
        throw new Error('Could not load your taste profile');
      }

      // Fetch recent meal history for context
      const { data: recentMeals } = await supabase
        .from('meal_logs')
        .select('name, flavor_tags, ingredients, calories')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      const tp = tasteProfile as TasteProfile;
      const affinities = tp.flavor_affinities as FlavorAffinities;

      // Build meal history summary
      const mealHistorySummary = recentMeals && recentMeals.length > 0
        ? `Recent meals enjoyed: ${recentMeals.map(m => `${m.name} (${(m.flavor_tags || []).join(', ')})`).join('; ')}`
        : 'No meal history yet — suggest popular and diverse dishes.';

      // Build a profile summary for the AI
      const profileSummary = `
Dietary regimen: ${tp.dietary_regimen || 'None'}
Allergies: ${tp.allergies?.length > 0 ? tp.allergies.join(', ') : 'None'}
Flavor preferences: Spicy (${affinities.spicy}/10), Umami (${affinities.umami}/10), Sweet (${affinities.sweet}/10), Sour (${affinities.sour}/10), Bitter (${affinities.bitter}/10)
Favorite cuisines: ${tp.favorite_cuisines?.length > 0 ? tp.favorite_cuisines.join(', ') : 'Open to all'}
${mealHistorySummary}
      `.trim();

      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const prompt = `
You are a world-class culinary sommelier. Based on this user's taste profile AND their meal history, recommend exactly 5 meals they would love. The recommendations should be diverse, creative, personalized, and different from what they've already eaten.

User Profile:
${profileSummary}

Return ONLY a raw JSON array (no markdown, no code blocks) with exactly 5 objects, each having:
{
  "name": "string (creative dish name)",
  "description": "string (1-2 sentence enticing description)",
  "calories": number,
  "protein": number (grams),
  "carbs": number (grams),
  "fat": number (grams),
  "match_percentage": number (80-99, how well it fits their profile),
  "cuisine_type": "string (e.g. Modern Japanese, Rustic Italian)",
  "reason": "string (1 short sentence explaining WHY this was recommended)",
  "ingredients": ["string", "string", ...] (list of 6-12 ingredients with quantities, e.g. '2 cups basmati rice'),
  "instructions": ["string", "string", ...] (4-8 clear step-by-step cooking instructions),
  "prep_time": "string (e.g. '25 mins', '1 hr 15 mins')",
  "servings": number (1-4)
}

Sort by match_percentage descending. Make the descriptions evocative and appetizing.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let parsed: any[];
      try {
        const cleaned = text.replace(/```json\s*/, '').replace(/\s*```/, '').trim();
        parsed = JSON.parse(cleaned);
      } catch {
        console.error('Failed to parse Gemini recommendations:', text);
        throw new Error('Failed to parse AI recommendations. Please try again.');
      }

      // Map parsed results and attach images
      return parsed.map((item: any, index: number) => ({
        name: item.name || 'Recommended Dish',
        description: item.description || 'A delicious meal curated for your palate.',
        calories: item.calories || 0,
        protein: item.protein || 0,
        carbs: item.carbs || 0,
        fat: item.fat || 0,
        match_percentage: item.match_percentage || 85,
        image_url: FOOD_IMAGES[index % FOOD_IMAGES.length],
        cuisine_type: item.cuisine_type || 'Fusion',
        reason: item.reason || 'Curated for your unique flavor profile.',
        ingredients: item.ingredients || [],
        instructions: item.instructions || [],
        prep_time: item.prep_time || '30 mins',
        servings: item.servings || 2,
      }));
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes to avoid excessive API calls
    retry: 1,
  });
};

