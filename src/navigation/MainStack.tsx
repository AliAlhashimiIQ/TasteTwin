import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainerRef } from '@react-navigation/native';
import { MainTabNavigator } from './MainTabNavigator';
import { PredictionResultScreen } from '../screens/PredictionResultScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { PreferencesScreen } from '../screens/PreferencesScreen';
import { RecommendationsScreen } from '../screens/RecommendationsScreen';
import { ScanningProcessingScreen } from '../screens/ScanningProcessingScreen';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';
import type { MealLog } from '../types/database';
import type { Recommendation } from '../hooks/useRecommendations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MainStackParamList = {
  MainTabs: undefined;
  PredictionResult: { mealData?: MealLog } | undefined;
  MealDetail: { meal: MealLog };
  Favorites: undefined;
  Preferences: undefined;
  Recommendations: undefined;
  RecipeDetail: { recipe: Recommendation };
  ScanningProcessing: { imageUri: string } | undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

// Wrapper around MainTabs that redirects new users to Preferences on first launch
const MainTabsWithOnboardingCheck = ({ navigation }: any) => {
  useEffect(() => {
    const checkOnboarding = async () => {
      const needsPreferences = await AsyncStorage.getItem('tastetwin.needs_preferences');
      if (needsPreferences === 'true') {
        // Clear the flag first so it only happens once
        await AsyncStorage.removeItem('tastetwin.needs_preferences');
        await AsyncStorage.setItem('tastetwin.onboarding_complete', 'true');
        // Navigate to Preferences screen (in MainStack, so the user is authenticated)
        navigation.navigate('Preferences');
      }
    };
    checkOnboarding();
  }, [navigation]);

  return <MainTabNavigator />;
};

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabsWithOnboardingCheck} />
      <Stack.Screen
        name="ScanningProcessing"
        component={ScanningProcessingScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="PredictionResult"
        component={PredictionResultScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="Recommendations"
        component={RecommendationsScreen}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
      />
    </Stack.Navigator>
  );
};
