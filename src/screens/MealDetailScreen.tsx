import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { MainStackParamList } from '../navigation/MainStack';
import { useToggleFavorite, useFavorites } from '../hooks/useFavorites';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

type MealDetailNavigationProp = NativeStackNavigationProp<MainStackParamList, 'MealDetail'>;
type MealDetailRouteProp = RouteProp<MainStackParamList, 'MealDetail'>;

export const MealDetailScreen = () => {
  const navigation = useNavigation<MealDetailNavigationProp>();
  const route = useRoute<MealDetailRouteProp>();
  const meal = route.params?.meal;
  const { data: favorites } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  const isFavorited = favorites?.some((f: any) => f.meal_log_id === meal?.id) ?? false;

  const formatDate = (isoString: string | undefined) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (!meal) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-white">No meal data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full items-center justify-center bg-surface-container-high"
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#e5e2e1" />
        </TouchableOpacity>
        <Text className="font-headline font-black text-xl text-white tracking-tighter">Meal Details</Text>
        <TouchableOpacity
          onPress={() => {
            if (meal?.id) {
              toggleFavorite.mutate(meal.id);
            }
          }}
        >
          <MaterialIcons name={isFavorited ? "favorite" : "favorite-border"} size={24} color="#e9c349" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Animated.View entering={FadeInDown.springify()}>
          <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative mb-8">
            <Image 
              source={meal.image_url || 'https://via.placeholder.com/400'}
              placeholder={BLURHASH}
              contentFit="cover"
              transition={300}
              style={{ width: '100%', height: '100%' }}
            />
            <View className="absolute inset-0 bg-black/40" />
            <View className="absolute bottom-6 left-6 right-6">
              {meal.match_score && (
                <View className="bg-primary/20 self-start px-3 py-1 rounded-full border border-primary/20 mb-2">
                  <Text className="text-primary text-xs font-bold tracking-widest uppercase">{meal.match_score}% Match</Text>
                </View>
              )}
              <Text className="font-headline text-3xl font-extrabold text-white tracking-tight">{meal.name}</Text>
              <Text className="text-white/70 text-sm mt-1">{formatDate(meal.created_at)}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Restaurant & Location */}
        {(meal.restaurant || meal.location) && (
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <View className="bg-surface-container p-5 rounded-2xl mb-6 flex-row items-center">
              <MaterialIcons name="restaurant" size={20} color="#e9c349" />
              <View className="ml-3 flex-1">
                {meal.restaurant && <Text className="text-white font-bold text-base">{meal.restaurant}</Text>}
                {meal.location && (
                  <View className="flex-row items-center mt-1">
                    <MaterialIcons name="location-on" size={14} color="#a48c7a" />
                    <Text className="text-on-surface-variant text-sm ml-1">{meal.location}</Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Macro Nutrition Grid */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
            {/* Calories */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Calories</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{meal.calories || 0}</Text>
                <Text className="text-primary text-xs font-medium ml-1">kcal</Text>
              </View>
            </View>

            {/* Protein */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-secondary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Protein</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{meal.protein || 0}</Text>
                <Text className="text-secondary text-xs font-medium ml-1">g</Text>
              </View>
            </View>

            {/* Carbs */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-tertiary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Carbs</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{meal.carbs || 0}</Text>
                <Text className="text-tertiary text-xs font-medium ml-1">g</Text>
              </View>
            </View>

            {/* Fats */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary-container/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Fats</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{meal.fat || 0}</Text>
                <Text className="text-primary-container text-xs font-medium ml-1">g</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Secondary Macros */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View className="bg-surface-container-high p-6 rounded-3xl mb-6 border border-outline-variant/5">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">Additional Nutrition</Text>
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Fiber</Text>
                <Text className="text-white font-medium text-sm">{meal.fiber || 0}g</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Sodium</Text>
                <Text className="text-white font-medium text-sm">{meal.sodium || 0}mg</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Sugar</Text>
                <Text className="text-white font-medium text-sm">{meal.sugar || 0}g</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Flavor Tags */}
        {meal.flavor_tags && meal.flavor_tags.length > 0 && (
          <Animated.View entering={FadeInDown.delay(350).springify()}>
            <View className="bg-surface-container p-6 rounded-3xl mb-6">
              <Text className="text-lg font-headline font-bold text-white mb-4">Flavor Profile</Text>
              <View className="flex-row flex-wrap gap-2">
                {meal.flavor_tags.map((tag: string, i: number) => (
                  <View key={i} className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                    <Text className="text-xs font-bold text-primary uppercase tracking-wider">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Ingredients */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <View className="bg-surface-container p-6 rounded-3xl mb-6">
            <Text className="text-lg font-headline font-bold text-white mb-4">Identified Ingredients</Text>
            <View className="flex-row flex-wrap gap-2">
              {meal.ingredients && meal.ingredients.length > 0 ? (
                meal.ingredients.map((ingredient: string, i: number) => (
                  <View key={i} className="bg-surface-variant px-4 py-2 rounded-full">
                    <Text className="text-xs font-medium text-on-surface">{ingredient}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-on-surface-variant">No ingredients identified.</Text>
              )}
            </View>
          </View>
        </Animated.View>

        {/* AI Insight */}
        {meal.ai_insight && (
          <Animated.View entering={FadeInDown.delay(450).springify()}>
            <View className="bg-surface-container p-6 rounded-3xl border border-primary/10 relative mb-6">
              <View className="absolute top-6 right-6">
                <MaterialIcons name="auto-awesome" size={20} color="#e9c349" />
              </View>
              <Text className="text-lg font-headline font-bold text-white mb-4">TasteTwin Insight</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {meal.ai_insight}
              </Text>
              
              {meal.pairing_suggestion && (
                <View className="pt-6 border-t border-outline-variant/10 flex-row items-center">
                  <View className="w-12 h-12 bg-secondary/10 rounded-xl items-center justify-center mr-4">
                    <MaterialIcons name="wine-bar" size={24} color="#e9c349" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-1">Pairing Suggestion</Text>
                    <Text className="text-sm font-bold text-white">{meal.pairing_suggestion}</Text>
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
        )}

        {/* Action Button */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <TouchableOpacity 
            className="w-full py-4 bg-transparent border border-outline-variant/30 rounded-2xl flex-row items-center justify-center mb-8"
            onPress={() => navigation.navigate('Recommendations')}
          >
            <MaterialIcons name="restaurant" size={20} color="#e5e2e1" />
            <Text className="text-on-surface font-headline font-bold text-base ml-2">View Similar Meals</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};
