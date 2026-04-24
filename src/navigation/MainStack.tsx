import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { PredictionResultScreen } from '../screens/PredictionResultScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { PreferencesScreen } from '../screens/PreferencesScreen';
import { RecommendationsScreen } from '../screens/RecommendationsScreen';
import { ScanningProcessingScreen } from '../screens/ScanningProcessingScreen';
import type { MealLog } from '../types/database';

export type MainStackParamList = {
  MainTabs: undefined;
  PredictionResult: { mealData?: MealLog } | undefined;
  Favorites: undefined;
  Preferences: undefined;
  Recommendations: undefined;
  ScanningProcessing: { imageUri: string } | undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
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
    </Stack.Navigator>
  );
};
