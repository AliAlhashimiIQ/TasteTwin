import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { MainStackParamList } from '../navigation/MainStack';
import { useCreateMeal } from '../hooks/useMeals';
import { useAuth } from '../lib/AuthContext';

type PredictionScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'PredictionResult'>;
type PredictionScreenRouteProp = RouteProp<MainStackParamList, 'PredictionResult'>;

export const PredictionResultScreen = () => {
  const navigation = useNavigation<PredictionScreenNavigationProp>();
  const route = useRoute<PredictionScreenRouteProp>();
  const mealData = route.params?.mealData;
  const { user } = useAuth();
  const createMeal = useCreateMeal();

  const handleSaveMeal = async () => {
    if (!user || !mealData) return;
    try {
      await createMeal.mutateAsync({
        user_id: user.id,
        ...mealData
      });
      Alert.alert('Success', 'Meal saved to your history!');
      navigation.navigate('MainTabs', { screen: 'Home' });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save meal.');
    }
  };

  if (!mealData) {
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
        <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#e5e2e1" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section / Food Image */}
        <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative mb-8">
          <Image 
            source={{ uri: mealData.image_url || 'https://via.placeholder.com/400' }} 
            className="w-full h-full object-cover" 
          />
          <View className="absolute inset-0 bg-black/40" />
          <View className="absolute bottom-6 left-6 right-6">
            <View className="bg-primary/20 self-start px-3 py-1 rounded-full border border-primary/20 mb-2">
              <Text className="text-primary text-xs font-bold tracking-widest uppercase">{mealData.match_score}% Match</Text>
            </View>
            <Text className="font-headline text-3xl font-extrabold text-white tracking-tight">{mealData.name}</Text>
          </View>
        </View>

        {/* Dashboard Layout */}
        <View className="space-y-8">
          {/* Nutrition Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {/* Calories Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Calories</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{mealData.calories || 0}</Text>
                <Text className="text-primary text-xs font-medium ml-1">kcal</Text>
              </View>
            </View>

            {/* Protein Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-secondary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Protein</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{mealData.protein || 0}</Text>
                <Text className="text-secondary text-xs font-medium ml-1">g</Text>
              </View>
            </View>

            {/* Carbs Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-tertiary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Carbs</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{mealData.carbs || 0}</Text>
                <Text className="text-tertiary text-xs font-medium ml-1">g</Text>
              </View>
            </View>

            {/* Fats Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary-container/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Fats</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">{mealData.fat || 0}</Text>
                <Text className="text-primary-container text-xs font-medium ml-1">g</Text>
              </View>
            </View>
          </View>

          {/* Bento: Ingredients & Insights */}
          <View className="space-y-6">
            <View className="bg-surface-container p-6 rounded-3xl">
              <Text className="text-lg font-headline font-bold text-white mb-4">Identified Ingredients</Text>
              <View className="flex-row flex-wrap gap-2">
                {mealData.ingredients && mealData.ingredients.length > 0 ? (
                  mealData.ingredients.map((ingredient: string, i: number) => (
                    <View key={i} className="bg-surface-variant px-4 py-2 rounded-full">
                      <Text className="text-xs font-medium text-on-surface">{ingredient}</Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-on-surface-variant">No ingredients identified.</Text>
                )}
              </View>
            </View>

            <View className="bg-surface-container p-6 rounded-3xl border border-primary/10 relative">
              <MaterialIcons name="auto-awesome" size={20} color="#e9c349" className="absolute top-6 right-6" />
              <Text className="text-lg font-headline font-bold text-white mb-4">TasteTwin Insight</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {mealData.ai_insight || "A delicious meal!"}
              </Text>
              
              <View className="pt-6 border-t border-outline-variant/10 flex-row items-center">
                <View className="w-12 h-12 bg-secondary/10 rounded-xl items-center justify-center mr-4">
                  <MaterialIcons name="wine-bar" size={24} color="#e9c349" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-1">Pairing Suggestion</Text>
                  <Text className="text-sm font-bold text-white">{mealData.pairing_suggestion || "Water or Tea"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Sidebar */}
          <View className="bg-surface-container-high p-6 rounded-3xl mt-6 border border-outline-variant/5">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-6 text-center">Log Transaction</Text>
            
            <TouchableOpacity 
              className="w-full py-4 bg-primary rounded-2xl flex-row items-center justify-center mb-4"
              onPress={handleSaveMeal}
              disabled={createMeal.isPending}
            >
              {createMeal.isPending ? (
                <ActivityIndicator color="#4d2600" />
              ) : (
                <>
                  <MaterialIcons name="bookmark" size={20} color="#4d2600" />
                  <Text className="text-on-primary font-headline font-bold text-base ml-2">Save Meal</Text>
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity className="w-full py-4 bg-transparent border border-outline-variant/30 rounded-2xl flex-row items-center justify-center mb-6">
              <MaterialIcons name="restaurant" size={20} color="#e5e2e1" />
              <Text className="text-on-surface font-headline font-bold text-base ml-2">View Similar Meals</Text>
            </TouchableOpacity>

            <View className="pt-6 border-t border-outline-variant/10 space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Sodium</Text>
                <Text className="text-white font-medium text-sm">{mealData.sodium || 0}mg</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Fiber</Text>
                <Text className="text-white font-medium text-sm">{mealData.fiber || 0}g</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Sugar</Text>
                <Text className="text-white font-medium text-sm">{mealData.sugar || 0}g</Text>
              </View>
            </View>
          </View>

          <View className="bg-surface-container-low p-6 rounded-3xl items-center mb-8">
            <Text className="text-xs text-on-surface-variant mb-2">Did we get it wrong?</Text>
            <TouchableOpacity>
              <Text className="text-secondary text-sm font-bold underline">Edit Prediction</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
