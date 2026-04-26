import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { MainStackParamList } from '../navigation/MainStack';
import type { Recommendation } from '../hooks/useRecommendations';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

type RecipeDetailNavigationProp = NativeStackNavigationProp<MainStackParamList, 'RecipeDetail'>;
type RecipeDetailRouteProp = RouteProp<MainStackParamList, 'RecipeDetail'>;

export const RecipeDetailScreen = () => {
  const navigation = useNavigation<RecipeDetailNavigationProp>();
  const route = useRoute<RecipeDetailRouteProp>();
  const recipe = route.params?.recipe;

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-white">No recipe data available.</Text>
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
        <Text className="font-headline font-black text-xl text-white tracking-tighter">Recipe</Text>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Animated.View entering={FadeInDown.springify()}>
          <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative mb-8">
            <Image 
              source={recipe.image_url}
              placeholder={BLURHASH}
              contentFit="cover"
              transition={300}
              style={{ width: '100%', height: '100%' }}
            />
            <View className="absolute inset-0 bg-black/40" />
            <View className="absolute bottom-6 left-6 right-6">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/20">
                  <Text className="text-primary text-xs font-bold tracking-widest uppercase">{recipe.match_percentage}% Match</Text>
                </View>
                <View className="bg-secondary/20 px-3 py-1 rounded-full border border-secondary/20">
                  <Text className="text-secondary text-xs font-bold tracking-widest uppercase">{recipe.cuisine_type}</Text>
                </View>
              </View>
              <Text className="font-headline text-3xl font-extrabold text-white tracking-tight">{recipe.name}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Info Bar */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View className="flex-row justify-between bg-surface-container p-5 rounded-2xl mb-6">
            <View className="items-center flex-1">
              <MaterialIcons name="schedule" size={20} color="#e9c349" />
              <Text className="text-white font-bold text-sm mt-2">{recipe.prep_time}</Text>
              <Text className="text-on-surface-variant text-[10px] uppercase tracking-wider mt-1">Prep Time</Text>
            </View>
            <View className="w-px bg-outline-variant/20" />
            <View className="items-center flex-1">
              <MaterialIcons name="people" size={20} color="#e9c349" />
              <Text className="text-white font-bold text-sm mt-2">{recipe.servings}</Text>
              <Text className="text-on-surface-variant text-[10px] uppercase tracking-wider mt-1">Servings</Text>
            </View>
            <View className="w-px bg-outline-variant/20" />
            <View className="items-center flex-1">
              <MaterialIcons name="local-fire-department" size={20} color="#e9c349" />
              <Text className="text-white font-bold text-sm mt-2">{recipe.calories}</Text>
              <Text className="text-on-surface-variant text-[10px] uppercase tracking-wider mt-1">Calories</Text>
            </View>
          </View>
        </Animated.View>

        {/* Why Recommended */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <View className="bg-primary/10 border border-primary/15 p-4 rounded-2xl mb-6 flex-row items-center">
            <MaterialIcons name="auto-awesome" size={18} color="#e9c349" />
            <Text className="text-secondary text-sm ml-3 flex-1 italic">{recipe.reason}</Text>
          </View>
        </Animated.View>

        {/* Description */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text className="text-on-surface-variant text-base leading-relaxed mb-8">{recipe.description}</Text>
        </Animated.View>

        {/* Macro Nutrition Grid */}
        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-4">Calories</Text>
              <View className="flex-row items-baseline">
                <Text className="text-2xl font-headline font-bold text-white">{recipe.calories}</Text>
                <Text className="text-primary text-xs font-medium ml-1">kcal</Text>
              </View>
            </View>
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-secondary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-4">Protein</Text>
              <View className="flex-row items-baseline">
                <Text className="text-2xl font-headline font-bold text-white">{recipe.protein}</Text>
                <Text className="text-secondary text-xs font-medium ml-1">g</Text>
              </View>
            </View>
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-tertiary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-4">Carbs</Text>
              <View className="flex-row items-baseline">
                <Text className="text-2xl font-headline font-bold text-white">{recipe.carbs}</Text>
                <Text className="text-tertiary text-xs font-medium ml-1">g</Text>
              </View>
            </View>
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary-container/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-4">Fat</Text>
              <View className="flex-row items-baseline">
                <Text className="text-2xl font-headline font-bold text-white">{recipe.fat}</Text>
                <Text className="text-primary-container text-xs font-medium ml-1">g</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Ingredients */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View className="bg-surface-container p-6 rounded-3xl mb-6">
            <View className="flex-row items-center mb-5">
              <MaterialIcons name="shopping-cart" size={20} color="#ff8c00" />
              <Text className="text-lg font-headline font-bold text-white ml-3">Ingredients</Text>
              <View className="bg-surface-container-high px-2 py-1 rounded-full ml-auto">
                <Text className="text-[10px] text-on-surface-variant font-bold">{recipe.ingredients.length} items</Text>
              </View>
            </View>
            {recipe.ingredients.map((ingredient: string, i: number) => (
              <View key={i} className="flex-row items-center py-3 border-b border-outline-variant/10">
                <View className="w-6 h-6 rounded-full bg-primary/10 items-center justify-center mr-4">
                  <Text className="text-primary text-[10px] font-bold">{i + 1}</Text>
                </View>
                <Text className="text-on-surface text-sm flex-1">{ingredient}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Instructions */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <View className="bg-surface-container p-6 rounded-3xl mb-8">
            <View className="flex-row items-center mb-5">
              <MaterialIcons name="menu-book" size={20} color="#ff8c00" />
              <Text className="text-lg font-headline font-bold text-white ml-3">Instructions</Text>
            </View>
            {recipe.instructions.map((step: string, i: number) => (
              <View key={i} className="flex-row mb-5">
                <View className="w-8 h-8 rounded-xl bg-primary items-center justify-center mr-4 mt-0.5 shrink-0">
                  <Text className="text-on-primary font-bold text-sm">{i + 1}</Text>
                </View>
                <Text className="text-on-surface text-sm leading-relaxed flex-1">{step}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};
