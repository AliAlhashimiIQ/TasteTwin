import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import type { TasteProfile, FlavorAffinities, Profile } from '../types/database';

export interface TwinMatch {
  profile: Profile;
  tasteProfile: TasteProfile;
  matchScore: number;
  sharedFlavors: string[];
}

// Cosine similarity between two FlavorAffinities vectors
function cosineSimilarity(a: FlavorAffinities, b: FlavorAffinities): number {
  const keys: (keyof FlavorAffinities)[] = ['spicy', 'umami', 'sweet', 'sour', 'bitter'];
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const key of keys) {
    const valA = a[key] || 0;
    const valB = b[key] || 0;
    dot += valA * valB;
    magA += valA * valA;
    magB += valB * valB;
  }
  const mag = Math.sqrt(magA) * Math.sqrt(magB);
  if (mag === 0) return 0;
  return dot / mag;
}

// Get shared top flavor tags between two users
function getSharedFlavors(a: FlavorAffinities, b: FlavorAffinities): string[] {
  const keys: (keyof FlavorAffinities)[] = ['spicy', 'umami', 'sweet', 'sour', 'bitter'];
  const threshold = 3; // consider flavors with affinity >= 3 as "top"
  const topA = keys.filter(k => (a[k] || 0) >= threshold);
  const topB = keys.filter(k => (b[k] || 0) >= threshold);
  return topA.filter(k => topB.includes(k)).map(k => k.charAt(0).toUpperCase() + k.slice(1));
}

// AI persona pool as fallback when not enough real users exist
const AI_PERSONAS: { profile: Profile; tasteProfile: TasteProfile }[] = [
  {
    profile: {
      id: 'ai-persona-1',
      username: 'elena_vance',
      full_name: 'Elena Vance',
      avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEXMuQNPfeAqXzd4EUFLmVE8lk_VcTRzF8Q93qxprpZ6n8zKUK6JAOaAW8RVbzbGny3EvevUOne8dfjrbCym3aMrFsTEVra7rZd4BgXwjtzy2I3Qf0MIVzApQGUG1WBhQiVgu8KLfgFfGq8IrKkoL1enknI3j09U0NIzfre15Yiuzry3MTQ81J-6Mriu4g11MOfS_KY0hypEgpyMfKwPpdT8jUhvRm8YgSfdmxELLgYFwTDaJpZkovbvXqPE3nYU3B1notoLPad9E8',
      created_at: new Date().toISOString(),
    },
    tasteProfile: {
      id: 'ai-tp-1',
      user_id: 'ai-persona-1',
      dietary_regimen: 'None',
      allergies: [],
      flavor_affinities: { spicy: 3, umami: 8, sweet: 5, sour: 4, bitter: 6 },
      favorite_cuisines: ['French', 'Japanese', 'Italian'],
      updated_at: new Date().toISOString(),
    },
  },
  {
    profile: {
      id: 'ai-persona-2',
      username: 'julian_thorne',
      full_name: 'Julian Thorne',
      avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz_SHBmOXZEKTWH4YKUp1tk7w5rDjIIhPwB0I76y6QPpKmmSjp0hzJ4BKKa_xLDa70ui8xiSrO92Z1fGxtf5nR1IgD9EMEcAw__mCjVroZTjwDTaLGwkr2U0lgR2uGrJIESV-6Ey2JBn9rsMSeBB0osFMiUIhNhvkME5qWjo_ET3SPfN2EkQpmunwa_J7a6_vX9Tz_L9eQWM9oCRq6NH_nl8HvJrCbDZNbkVCL2PIvK-RhhKfADCHSXuOeFySPXlby_E1naFw-aG7e',
      created_at: new Date().toISOString(),
    },
    tasteProfile: {
      id: 'ai-tp-2',
      user_id: 'ai-persona-2',
      dietary_regimen: 'None',
      allergies: [],
      flavor_affinities: { spicy: 5, umami: 7, sweet: 2, sour: 3, bitter: 8 },
      favorite_cuisines: ['American', 'Mexican', 'Korean'],
      updated_at: new Date().toISOString(),
    },
  },
  {
    profile: {
      id: 'ai-persona-3',
      username: 'sakura_tanaka',
      full_name: 'Sakura Tanaka',
      avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAHF15k6vhH5sD9EmVbJ_InrqPVRJNXmaRLt7k-bogjLcbIe1VF2SGXgAYPJzZ4U8T5lq5c7ToJE5TJhSktqR5sYVag2fgdlnsnh12_PBg2udZhLpaP44cnljmEH3B4zFuoBawJQBRHUJjYogJy-rnGfMnB6YYWqVc02cNzshoxEpiu-l97W1xTVe5urjxeJEXyHvDCR7uVPFvkigDdNdyhKYnOgBwgXO0STyfL99eoK0h41AMo8_xzjjfDDL4CJPpPhUaJ70uUiRS',
      created_at: new Date().toISOString(),
    },
    tasteProfile: {
      id: 'ai-tp-3',
      user_id: 'ai-persona-3',
      dietary_regimen: 'Pescatarian',
      allergies: [],
      flavor_affinities: { spicy: 2, umami: 9, sweet: 6, sour: 5, bitter: 3 },
      favorite_cuisines: ['Japanese', 'Thai', 'Peruvian'],
      updated_at: new Date().toISOString(),
    },
  },
  {
    profile: {
      id: 'ai-persona-4',
      username: 'marco_bianchi',
      full_name: 'Marco Bianchi',
      avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjgRTHENybuh-lX386mIsZsCD1GjDo1MdG5NQe9SSTncnJWNfFRxX5u63SG8o9I92KKHtb-1dyt6a15mbeKs0H8H9hAxYyJ3j_1AYgaYd71bIwNB3fQBiDlGHlnxiBJKVclDj1FSO6bUOUyE9obf22LIrynQKn2OI6qIEtpSyEF1sJvikHaUoM5lAc9-HSy65sbOmzg79SIGMDP3dnTuB-8hwnetUC88hB0miy-LE4q_G9Phx67tUIj1l9X8PcLPA39PEbtyMtYakL',
      created_at: new Date().toISOString(),
    },
    tasteProfile: {
      id: 'ai-tp-4',
      user_id: 'ai-persona-4',
      dietary_regimen: 'None',
      allergies: ['Shellfish'],
      flavor_affinities: { spicy: 4, umami: 6, sweet: 7, sour: 2, bitter: 4 },
      favorite_cuisines: ['Italian', 'Mediterranean', 'French'],
      updated_at: new Date().toISOString(),
    },
  },
  {
    profile: {
      id: 'ai-persona-5',
      username: 'priya_sharma',
      full_name: 'Priya Sharma',
      avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPES4mU0-2aBrkTSd46xTy9YkmojBEsqZ6ZWYXE3akEOI_-2CeVLlAn7AbVsUm1hyCe57BycZZp614kwoclUX5uomTLI8kSTJyneLRAmu0WPiM-SbkmZcPfNV2w6g-Bg4NL8kxiG15eUGWDIm4UboX6XVgh7xgmhlD68z4XTpuwL9KI5cru9QisFdmBFcnu8aOs2Zr1wg6YLxnJdODiMEs-4mv_BJUSYmsZ0d4sCCYL94kjadfRD2sRZjbARTCBiSbpH4Pz83ni16d',
      created_at: new Date().toISOString(),
    },
    tasteProfile: {
      id: 'ai-tp-5',
      user_id: 'ai-persona-5',
      dietary_regimen: 'Vegetarian',
      allergies: ['Nuts'],
      flavor_affinities: { spicy: 9, umami: 5, sweet: 4, sour: 6, bitter: 3 },
      favorite_cuisines: ['Indian', 'Thai', 'Ethiopian'],
      updated_at: new Date().toISOString(),
    },
  },
];

/**
 * Hook to fetch and compute Taste Twin matches.
 * First tries to match with real Supabase users, then fills
 * remaining slots with AI personas to always show 5 results.
 */
export const useTwinMatch = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['twinMatch', user?.id],
    queryFn: async (): Promise<TwinMatch[]> => {
      if (!user) throw new Error('Not authenticated');

      // Fetch current user's taste profile
      const { data: myTasteProfile, error: tpError } = await supabase
        .from('taste_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (tpError || !myTasteProfile) {
        throw new Error('Could not load your taste profile');
      }

      const myAffinities = myTasteProfile.flavor_affinities as FlavorAffinities;

      // Fetch all OTHER users' taste profiles + joined profile
      const { data: otherProfiles, error: otherError } = await supabase
        .from('taste_profiles')
        .select('*, profiles(*)')
        .neq('user_id', user.id);

      const realMatches: TwinMatch[] = [];

      if (!otherError && otherProfiles && otherProfiles.length > 0) {
        for (const tp of otherProfiles) {
          const profile = (tp as any).profiles as Profile;
          if (!profile) continue;

          const theirAffinities = tp.flavor_affinities as FlavorAffinities;
          const score = cosineSimilarity(myAffinities, theirAffinities);
          const shared = getSharedFlavors(myAffinities, theirAffinities);

          realMatches.push({
            profile,
            tasteProfile: tp as TasteProfile,
            matchScore: Math.round(score * 100),
            sharedFlavors: shared,
          });
        }
      }

      // Fill with AI personas if fewer than 5 real matches
      const aiMatches: TwinMatch[] = AI_PERSONAS.map(persona => {
        const score = cosineSimilarity(myAffinities, persona.tasteProfile.flavor_affinities);
        const shared = getSharedFlavors(myAffinities, persona.tasteProfile.flavor_affinities);
        return {
          profile: persona.profile,
          tasteProfile: persona.tasteProfile,
          matchScore: Math.round(score * 100),
          sharedFlavors: shared,
        };
      });

      // Combine, deduplicate (prefer real), sort descending, take top 5
      const combined = [...realMatches, ...aiMatches];
      combined.sort((a, b) => b.matchScore - a.matchScore);

      return combined.slice(0, 5);
    },
    enabled: !!user,
  });
};
