import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../navigation/MainStack';
import { useMeals } from '../hooks/useMeals';
import { useProfile } from '../hooks/useProfile';
import { useMacroGoals } from '../hooks/useMacroGoals';
import { MacroRing } from '../components/MacroRing';
import { SkeletonCard } from '../components/SkeletonCard';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

type HistoryNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const HistoryScreen = () => {
  const navigation = useNavigation<HistoryNavigationProp>();
  const { data: meals, isLoading, refetch, isRefetching } = useMeals();
  const { data: profileData } = useProfile();
  const profile = profileData?.profile;
  const { goals } = useMacroGoals();

  const formatDate = (isoString: string | undefined) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Calculate today's consumed macros from meal history
  const todaysMacros = useMemo(() => {
    if (!meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysMeals = meals.filter(meal => {
      const mealDate = new Date(meal.created_at);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate.getTime() === today.getTime();
    });

    return todaysMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const todayMealCount = useMemo(() => {
    if (!meals) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return meals.filter(meal => {
      const mealDate = new Date(meal.created_at);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate.getTime() === today.getTime();
    }).length;
  }, [meals]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' } as any)}
          >
            <Image
              source={profile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfyTJsazlUgbP1jfRf1x8A9Cb7m7dGw6HnyaDkLmAapDkHj9VhW2_28FWEvs9lGJQgqQelPl9JiRDN389u7_T9kRsZ_hkCWCHs5DSt4U_iy4fFeIz85fWsUFMrOEVlK_l7jGiHOyURbVFfuksGpDhcm5wdfm3F_jQliABQVaezuMm1WMTLy6NuG0Y1uueRDp3xiKQfVSTSgkeoTy0Ar6peYZLRevapRuCCNJHYKQIpnvU8LpUtbST9khF1tlRFOIU_pZlBdwE9nSoN'}
              placeholder={BLURHASH}
              contentFit="cover"
              transition={200}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
          <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#e5e2e1" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#e9c349" colors={['#e9c349']} />
        }
      >
        {/* Editorial Header Section */}
        <View className="mb-8">
          <Text className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">History</Text>
          <Text className="text-on-surface-variant font-body">Your digital sommelier's archive of culinary explorations.</Text>
        </View>

        {/* ─── Today's Macro Dashboard ─── */}
        <Animated.View entering={FadeInDown.springify()}>
          <View className="bg-surface-container p-6 rounded-3xl mb-10 border border-outline-variant/10">
            <View className="flex-row items-center justify-between mb-5">
              <View>
                <Text className="text-lg font-headline font-bold text-white">Today's Nutrition</Text>
                <Text className="text-on-surface-variant text-xs mt-1">
                  {todayMealCount} meal{todayMealCount !== 1 ? 's' : ''} logged today
                </Text>
              </View>
              <View className="bg-primary/15 px-3 py-1.5 rounded-full border border-primary/20">
                <Text className="text-primary text-[10px] font-bold uppercase tracking-wider">Remaining</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between">
              <MacroRing
                label="Cal"
                current={todaysMacros.calories}
                goal={goals.calories}
                unit="kcal"
                color="#ff8c00"
              />
              <MacroRing
                label="Protein"
                current={todaysMacros.protein}
                goal={goals.protein}
                unit="g"
                color="#e9c349"
              />
              <MacroRing
                label="Carbs"
                current={todaysMacros.carbs}
                goal={goals.carbs}
                unit="g"
                color="#7dd3fc"
              />
              <MacroRing
                label="Fat"
                current={todaysMacros.fat}
                goal={goals.fat}
                unit="g"
                color="#c084fc"
              />
            </View>
          </View>
        </Animated.View>

        {/* Modern Filter and Sort */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 overflow-visible" contentContainerStyle={{ paddingRight: 24 }}>
          <TouchableOpacity className="flex-row items-center space-x-2 bg-surface-container-high px-5 py-2.5 rounded-full border border-outline-variant/15 mr-3">
            <MaterialIcons name="tune" size={16} color="#e9c349" />
            <Text className="text-sm font-medium text-white ml-1">All Types</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-2 bg-surface-container px-5 py-2.5 rounded-full border border-outline-variant/10 mr-3">
            <MaterialIcons name="calendar-today" size={16} color="#e9c349" />
            <Text className="text-sm font-medium text-white ml-1">Last 7 Days</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-2 bg-surface-container px-5 py-2.5 rounded-full border border-outline-variant/10">
            <MaterialIcons name="sort" size={16} color="#e9c349" />
            <Text className="text-sm font-medium text-white ml-1">Newest First</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Meal History List */}
        <View className="space-y-6">
          {isLoading ? (
            <View>
              <SkeletonCard variant="row" />
              <SkeletonCard variant="row" />
              <SkeletonCard variant="row" />
              <SkeletonCard variant="row" />
            </View>
          ) : !meals || meals.length === 0 ? (
            <View className="py-10 items-center justify-center bg-surface-container-low rounded-[24px] px-6">
              <MaterialIcons name="restaurant-menu" size={48} color="#4d2600" />
              <Text className="font-headline text-lg text-white font-bold mb-2 mt-4">No Meals Logged Yet</Text>
              <Text className="text-on-surface-variant text-center font-body text-sm">Scan your first dish to start building your personal TasteTwin archive.</Text>
            </View>
          ) : (
            meals.map((meal, index) => (
              <Animated.View
                key={meal.id}
                entering={FadeInDown.delay(index * 80).springify()}
              >
                <TouchableOpacity 
                  className="bg-surface-container-low rounded-[24px] p-1 shadow-lg mb-2"
                  onPress={() => navigation.navigate('MealDetail', { meal })}
                >
                  <View className="flex-row p-4 bg-surface-container rounded-[20px]">
                    <View className="w-28 h-28 rounded-xl overflow-hidden mr-4">
                      <Image
                        source={meal.image_url || 'https://via.placeholder.com/150'}
                        placeholder={BLURHASH}
                        contentFit="cover"
                        transition={200}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </View>
                    <View className="flex-1 justify-center">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-xl font-headline font-bold text-on-surface leading-tight flex-1" numberOfLines={2}>{meal.name}</Text>
                        <MaterialIcons name="arrow-forward-ios" size={14} color="#a48c7a" />
                      </View>
                      <Text className="text-on-surface-variant text-xs mb-4">{formatDate(meal.created_at)}</Text>
                      <View className="flex-row items-center flex-wrap gap-2">
                        <View className="flex-row items-center px-3 py-1 bg-surface-container-high rounded-full">
                          <MaterialIcons name="local-fire-department" size={14} color="#e9c349" />
                          <Text className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">{meal.calories} KCAL</Text>
                        </View>
                        {meal.flavor_tags && meal.flavor_tags.length > 0 && (
                          <View className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <Text className="text-[10px] font-black text-primary uppercase tracking-widest">{meal.flavor_tags[0]}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
