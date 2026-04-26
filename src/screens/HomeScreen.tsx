import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../navigation/MainStack';
import { useProfile } from '../hooks/useProfile';
import { useMeals } from '../hooks/useMeals';
import { useRecommendations } from '../hooks/useRecommendations';
import { useTwinMatch } from '../hooks/useTwinMatch';
import { SkeletonCard } from '../components/SkeletonCard';
import { AnimatedPressable } from '../components/AnimatedPressable';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

type HomeNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: profileData, isLoading: isLoadingProfile } = useProfile();
  const { data: mealsData, isLoading: isLoadingMeals } = useMeals();
  const { data: recommendations, isLoading: isLoadingRecs } = useRecommendations();
  const { data: twinData, isLoading: isLoadingTwin } = useTwinMatch();
  const profile = profileData?.profile;

  // Get the top twin match
  const topTwin = twinData && twinData.length > 0 ? twinData[0] : null;

  // Search across both meal history and recommendations
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    
    const mealResults = (mealsData || []).filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.flavor_tags?.some((t: string) => t.toLowerCase().includes(query)) ||
      m.ingredients?.some((i: string) => i.toLowerCase().includes(query))
    );
    
    const recResults = (recommendations || []).filter(r => 
      r.name.toLowerCase().includes(query) ||
      r.cuisine_type.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query)
    );
    
    return { meals: mealResults, recommendations: recResults };
  }, [mealsData, recommendations, searchQuery]);

  // Recent meals (only when not searching)
  const recentMeals = useMemo(() => {
    if (!mealsData) return [];
    return mealsData.slice(0, 2);
  }, [mealsData]);

  // Get the greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/90 z-50">
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full overflow-hidden border border-primary/20"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' } as any)}
          >
            <Image
              source={profile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLQhzh_0yMEhsWmEYll1mte5bm8kq8dnO9By8Nzk_8BMXsbraVeWRIlDbBnVb_lyO5E4J8316wwvRBQcvvVFsa5GuS74kcGgcfX5KVLpZ-BBWJlYKVIbcfXM_wHn6TpSkL1Aoev3daHPqCDLlLWgNTYEKu2aLgOe78a2WrllN6kRFJ4lVxrHUTNzATH8_jQYO2FurkQIOWLZwWQ5zluKhDK3eKUXSJDkKCAf1eXecvwip6l8J4cYpJp5-bEvL_I9qmwM4ri1eB5CZ'}
              placeholder={BLURHASH}
              contentFit="cover"
              transition={200}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
          <Text className="font-headline font-black text-xl text-white tracking-tighter ml-3">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        {/* Greeting & Search Section */}
        <View className="space-y-6 mb-8">
          <View className="space-y-1 mb-6">
            <Text className="text-on-surface-variant font-body text-sm uppercase tracking-widest">Welcome back</Text>
            <Text className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mt-1">{getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Chef'}</Text>
          </View>

          {/* Glassmorphic Search */}
          <View className="relative justify-center">
            <MaterialIcons name="search" size={20} color="#e9c349" className="absolute left-4 z-10" />
            <TextInput
              className="w-full bg-surface-container-lowest rounded-xl py-4 pl-12 pr-4 text-on-surface font-body"
              placeholder="Find a recipe or flavor profile..."
              placeholderTextColor="#a48c7a"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Search Results Mode */}
        {searchResults ? (
          <View className="mb-8">
            <Text className="font-headline text-2xl font-bold text-on-surface mb-4">Search Results</Text>

            {/* Meal History Results */}
            {searchResults.meals.length > 0 && (
              <View className="mb-6">
                <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest mb-3">From Your History</Text>
                {searchResults.meals.map((meal) => (
                  <AnimatedPressable 
                    key={meal.id} 
                    style={{ borderRadius: 12, marginBottom: 8 }}
                    onPress={() => navigation.navigate('MealDetail', { meal })}
                  >
                    <View className="flex-row items-center bg-surface-container rounded-xl p-4">
                      <View className="w-16 h-16 rounded-lg overflow-hidden border border-outline-variant/10">
                        <Image
                          source={meal.image_url || 'https://via.placeholder.com/150'}
                          placeholder={BLURHASH}
                          contentFit="cover"
                          transition={200}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </View>
                      <View className="flex-1 ml-3">
                        <Text className="font-headline font-bold text-white text-base" numberOfLines={1}>{meal.name}</Text>
                        <Text className="text-on-surface-variant text-xs">{meal.calories} kcal • {meal.restaurant || 'Home Cooked'}</Text>
                      </View>
                      <MaterialIcons name="arrow-forward-ios" size={14} color="#a48c7a" />
                    </View>
                  </AnimatedPressable>
                ))}
              </View>
            )}

            {/* Recommendation Results */}
            {searchResults.recommendations.length > 0 && (
              <View className="mb-6">
                <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest mb-3">AI Recommendations</Text>
                {searchResults.recommendations.map((rec, i) => (
                  <AnimatedPressable key={i} style={{ borderRadius: 12, marginBottom: 8 }}>
                    <View className="flex-row items-center bg-surface-container rounded-xl p-4">
                      <View className="w-16 h-16 rounded-lg overflow-hidden border border-outline-variant/10">
                        <Image
                          source={rec.image_url}
                          placeholder={BLURHASH}
                          contentFit="cover"
                          transition={200}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </View>
                      <View className="flex-1 ml-3">
                        <Text className="font-headline font-bold text-white text-base" numberOfLines={1}>{rec.name}</Text>
                        <Text className="text-on-surface-variant text-xs">{rec.calories} kcal • {rec.cuisine_type}</Text>
                      </View>
                      <View className="bg-primary/20 px-2 py-1 rounded-full">
                        <Text className="text-primary text-[10px] font-bold">{rec.match_percentage}%</Text>
                      </View>
                    </View>
                  </AnimatedPressable>
                ))}
              </View>
            )}

            {searchResults.meals.length === 0 && searchResults.recommendations.length === 0 && (
              <View className="bg-surface-container rounded-xl p-6 items-center border border-outline-variant/10">
                <MaterialIcons name="search-off" size={36} color="#4d2600" />
                <Text className="text-on-surface-variant text-sm text-center mt-3">
                  No results found for "{searchQuery}". Try a different search term.
                </Text>
              </View>
            )}
          </View>
        ) : (
          <>
            {/* Bento Layout: Upload & Taste Twin Preview */}
            <View className="mb-8">
              {/* Upload CTA */}
              <AnimatedPressable
                style={{ width: '100%', height: 256, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Upload' } as any)}
              >
                <View className="w-full h-full bg-surface-container justify-end p-6 border border-outline-variant/10 relative">
                  <View className="absolute inset-0">
                    <Image
                      source="https://lh3.googleusercontent.com/aida-public/AB6AXuD31DvAk-M65Owr07aLGGcu-rqmTMVFNEZZYqp---5GtCGxJdilGfZQuTp8PH0htIowKndMLwwGbgYZ9IQ2-udAAcC1hHdlex50USL5rVXprCXs0PjrTm9iBagHIy7NRk81_A9f2a6XsR2NirOlPQehRsF9uqe1lgnY3CRI1_arWQWPuuZjEjQEqkojmoGS59nUCnlIXEP5KRz9B3UIq-XjEtFZ-pkx5VkeWh4N4szJ0rlx0xPGpQEFjfuaazv8Opk9qBXd1btMXRmi"
                      placeholder={BLURHASH}
                      contentFit="cover"
                      transition={300}
                      style={{ width: '100%', height: '100%', opacity: 0.4 }}
                    />
                    <View className="absolute inset-0 bg-background/50" />
                  </View>
                  <View className="relative z-10 space-y-4">
                    <View className="flex-row items-center space-x-2 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full self-start mb-4">
                      <MaterialIcons name="add-a-photo" size={14} color="#ffb77d" />
                      <Text className="text-primary font-label text-[10px] font-bold uppercase tracking-widest ml-1">New Discovery</Text>
                    </View>
                    <Text className="font-headline text-3xl font-bold text-white max-w-[250px] leading-tight mb-4">Identify your culinary masterpiece</Text>
                    <View className="bg-primary-container px-6 py-3 rounded-lg flex-row items-center self-start">
                      <Text className="text-on-primary font-headline font-bold mr-2">Upload Food</Text>
                      <MaterialIcons name="arrow-forward" size={18} color="#4d2600" />
                    </View>
                  </View>
                </View>
              </AnimatedPressable>

              {/* Taste Twin Card — Real Data */}
              <AnimatedPressable
                style={{ width: '100%', borderRadius: 12 }}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Twin' } as any)}
              >
                <View className="w-full bg-surface-container-low rounded-xl p-5 border border-outline-variant/5">
                  <View className="mb-4">
                    <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest mb-3">Your Taste Twin</Text>
                    {isLoadingTwin ? (
                      <View className="flex-row items-center space-x-4">
                        <View className="w-14 h-14 rounded-full bg-surface-container" />
                        <View className="ml-3">
                          <View className="w-24 h-4 bg-surface-container rounded mb-1" />
                          <View className="w-16 h-3 bg-surface-container rounded" />
                        </View>
                      </View>
                    ) : topTwin ? (
                      <View className="flex-row items-center space-x-4">
                        <View className="w-14 h-14 rounded-full border-2 border-secondary p-0.5">
                          <Image
                            source={topTwin.profile.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxO-KWictEmRT91M6nh653tY0G0O_o-SSu5K3vxh0CktWvzOPrTazgMxwS_elyFib6rZiyt4meOC2R046EHoXF-VminjtHqzkSzUkpj8Wbz7DvdhKgJP2W-Pd8KPr-l8EStxJaQNO3ogK0n5lkdYCT_11kolUSbyLDsVok8O3V2jrHX4ONrbc7neCL8x8jAEITgeKSo2nzKn8fZ4q4f_CrpI3e_xiNAySUK9z3UPSzKvrx_XR96z25yZ-96qkRD6ga53nGQOqURzPk'}
                            placeholder={BLURHASH}
                            contentFit="cover"
                            transition={200}
                            style={{ width: '100%', height: '100%', borderRadius: 999 }}
                          />
                        </View>
                        <View className="ml-3">
                          <Text className="font-headline font-bold text-white text-base">{topTwin.profile.full_name || 'Twin'}</Text>
                          <Text className="text-secondary text-xs">{topTwin.matchScore || 0}% Flavor Match</Text>
                        </View>
                      </View>
                    ) : (
                      <View className="flex-row items-center space-x-4">
                        <View className="w-14 h-14 rounded-full bg-surface-container items-center justify-center">
                          <MaterialIcons name="people" size={24} color="#a48c7a" />
                        </View>
                        <View className="ml-3">
                          <Text className="font-headline font-bold text-white text-base">No Twin Found Yet</Text>
                          <Text className="text-on-surface-variant text-xs">Set up your flavor profile first</Text>
                        </View>
                      </View>
                    )}
                  </View>
                  {topTwin && topTwin.sharedFlavors && topTwin.sharedFlavors.length > 0 && (
                    <View className="space-y-3">
                      <View className="flex-row space-x-2 mb-2">
                        {topTwin.sharedFlavors.slice(0, 3).map((flavor: string, i: number) => (
                          <View key={i} className="bg-surface-variant/60 px-3 py-1 rounded-full" style={i > 0 ? { marginLeft: 8 } : {}}>
                            <Text className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{flavor}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </AnimatedPressable>
            </View>

            {/* AI Recommended Meals Carousel — Real Data */}
            <View className="mb-8">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="font-headline text-2xl font-bold text-on-surface">Curated For You</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
                  <Text className="text-secondary text-sm font-medium">View All</Text>
                </TouchableOpacity>
              </View>
              
              {isLoadingRecs ? (
                <View className="flex-row">
                  <View className="w-[260px] h-[320px] bg-surface-container rounded-xl mr-4" />
                  <View className="w-[260px] h-[320px] bg-surface-container rounded-xl" />
                </View>
              ) : recommendations && recommendations.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible" contentContainerStyle={{ paddingRight: 24 }}>
                  {recommendations.slice(0, 4).map((rec, index) => (
                    <AnimatedPressable key={index} style={{ width: 260, marginRight: 16 }} onPress={() => navigation.navigate('RecipeDetail', { recipe: rec })}>
                      <View className="h-64 rounded-xl overflow-hidden mb-3 relative">
                        <Image
                          source={rec.image_url}
                          placeholder={BLURHASH}
                          contentFit="cover"
                          transition={300}
                          style={{ width: '100%', height: '100%' }}
                        />
                        <View className="absolute top-3 right-3 bg-background/80 px-2 py-1 rounded-full">
                          <Text className="text-secondary text-xs font-bold">{rec.match_percentage}% Match</Text>
                        </View>
                      </View>
                      <Text className="font-headline font-bold text-lg text-white">{rec.name}</Text>
                      <Text className="text-on-surface-variant text-xs mt-1">{rec.cuisine_type} • {rec.calories} kcal</Text>
                    </AnimatedPressable>
                  ))}
                </ScrollView>
              ) : (
                <View className="bg-surface-container rounded-xl p-6 items-center border border-outline-variant/10">
                  <MaterialIcons name="restaurant-menu" size={36} color="#4d2600" />
                  <Text className="text-on-surface-variant text-sm text-center mt-3">
                    Set up your flavor profile to get personalized meal recommendations.
                  </Text>
                  <TouchableOpacity 
                    className="bg-primary px-6 py-3 rounded-xl mt-4"
                    onPress={() => navigation.navigate('Preferences')}
                  >
                    <Text className="text-on-primary font-headline font-bold">Set Up Profile</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Recent Meals Vertical List */}
            <View className="mb-4">
              <Text className="font-headline text-2xl font-bold text-on-surface mb-4">Recent Journey</Text>
              <View className="space-y-4">
                {isLoadingMeals ? (
                  <View>
                    <SkeletonCard variant="row" />
                    <SkeletonCard variant="row" />
                  </View>
                ) : recentMeals.length > 0 ? (
                  recentMeals.map((meal) => (
                    <AnimatedPressable 
                      key={meal.id} 
                      style={{ borderRadius: 12, marginBottom: 8 }}
                      onPress={() => navigation.navigate('MealDetail', { meal })}
                    >
                      <View className="flex-row items-center bg-surface-container rounded-xl p-4">
                        <View className="w-20 h-20 rounded-lg overflow-hidden border border-outline-variant/10">
                          <Image
                            source={meal.image_url || 'https://via.placeholder.com/150'}
                            placeholder={BLURHASH}
                            contentFit="cover"
                            transition={200}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </View>
                        <View className="flex-1 ml-4">
                          <View className="flex-row justify-between items-start mb-1">
                            <Text className="font-headline font-bold text-white text-base truncate pr-2 flex-1" numberOfLines={1}>{meal.name}</Text>
                            <Text className="text-outline text-[10px] font-medium uppercase tracking-tighter shrink-0">
                              {meal.created_at ? new Date(meal.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                            </Text>
                          </View>
                          <Text className="text-on-surface-variant text-xs">{meal.restaurant || 'Home Cooked'}</Text>
                          {meal.location && (
                            <View className="flex-row items-center mt-2">
                              <MaterialIcons name="location-on" size={12} color="#e9c349" />
                              <Text className="text-outline text-[10px] ml-1">{meal.location}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </AnimatedPressable>
                  ))
                ) : (
                  <View className="bg-surface-container rounded-xl p-6 items-center border border-outline-variant/10">
                    <MaterialIcons name="restaurant-menu" size={36} color="#4d2600" />
                    <Text className="text-on-surface-variant text-sm text-center mt-3">
                      No meals logged yet. Scan your first dish!
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};
