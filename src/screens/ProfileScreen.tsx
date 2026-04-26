import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../lib/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../hooks/useProfile';
import { useMeals } from '../hooks/useMeals';
import { useFavorites } from '../hooks/useFavorites';
import type { FlavorAffinities } from '../types/database';

const getTopFlavors = (affinities: FlavorAffinities | undefined): string[] => {
  if (!affinities) return [];
  const entries = Object.entries(affinities) as [string, number][];
  return entries
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => {
      const labels: Record<string, string> = {
        spicy: 'Spicy Heat', umami: 'Umami Rich', sweet: 'Sweet Notes',
        sour: 'Sour Tang', bitter: 'Bitter Edge',
      };
      return labels[key] || key;
    });
};

export const ProfileScreen = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const { data: profileData, isLoading } = useProfile();
  const { data: meals } = useMeals();
  const { data: favorites } = useFavorites();

  const displayName = profileData?.profile?.full_name || user?.email?.split('@')[0] || 'Explorer';
  const avatarUrl = profileData?.profile?.avatar_url;
  const analyzedCount = meals?.length ?? 0;
  const favoritesCount = favorites?.length ?? 0;
  const flavorChips = getTopFlavors(profileData?.tasteProfile?.flavor_affinities);
  const palateScore = profileData?.tasteProfile?.flavor_affinities
    ? ((Object.values(profileData.tasteProfile.flavor_affinities).filter(v => v > 0).length / 5) * 10).toFixed(1)
    : '0.0';

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#ffb77d" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/90 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            {avatarUrl ? (
              <Image source={avatarUrl} placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4" contentFit="cover" transition={200} style={{ width: '100%', height: '100%' }} />
            ) : (
              <View className="w-full h-full bg-primary/20 items-center justify-center">
                <MaterialIcons name="person" size={20} color="#ffb77d" />
              </View>
            )}
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter ml-3">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View className="items-center mb-12">
          <View className="relative mb-6">
            <View className="w-32 h-32 rounded-full p-1 bg-primary border-4 border-background overflow-visible">
              {avatarUrl ? (
                <Image source={avatarUrl} placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4" contentFit="cover" transition={200} style={{ width: '100%', height: '100%', borderRadius: 999 }} />
              ) : (
                <View className="w-full h-full rounded-full bg-surface-container items-center justify-center">
                  <MaterialIcons name="person" size={48} color="#ffb77d" />
                </View>
              )}
            </View>
            <View className="absolute bottom-1 right-1 bg-primary w-8 h-8 rounded-full items-center justify-center shadow-lg shadow-black">
              <MaterialIcons name="verified" size={16} color="#4d2600" />
            </View>
          </View>
          <Text className="text-3xl font-headline font-extrabold tracking-tight text-white mb-1">{displayName}</Text>
          <Text className="text-on-surface-variant font-medium mb-8">Executive Taste Explorer</Text>
          <View className="flex-row w-full max-w-md bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-primary mb-1">{analyzedCount}</Text>
              <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Analyzed</Text>
            </View>
            <View className="items-center flex-1 border-x border-outline-variant/10">
              <Text className="text-2xl font-bold text-secondary mb-1">{favoritesCount}</Text>
              <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Recipes</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-white mb-1">{palateScore}</Text>
              <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Palate Score</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-4 mb-12">
          <TouchableOpacity className="flex-1 bg-primary-container py-4 rounded-xl flex-row items-center justify-center gap-2">
            <MaterialIcons name="edit" size={20} color="#4d2600" />
            <Text className="text-on-primary font-headline font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-16 bg-surface-container-high rounded-xl items-center justify-center border border-outline-variant/10" onPress={signOut}>
            <MaterialIcons name="logout" size={24} color="#e5e2e1" />
          </TouchableOpacity>
        </View>

        <View className="mb-12">
          <View className="flex-row justify-between items-end mb-6">
            <Text className="text-xl font-headline font-bold text-white">Flavor DNA</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Preferences' as never)}>
              <Text className="text-secondary text-sm font-medium">Update</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {flavorChips.length > 0 ? (
              flavorChips.map((chip, index) => {
                const colors = ['text-primary', 'text-secondary', 'text-on-surface', 'text-[#cac99f]', 'text-white'];
                return (
                  <View key={chip} className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-outline-variant/15">
                    <Text className={`text-[11px] font-bold uppercase tracking-widest ${colors[index % colors.length]}`}>{chip}</Text>
                  </View>
                );
              })
            ) : (
              <TouchableOpacity className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-primary/30" onPress={() => navigation.navigate('Preferences' as never)}>
                <Text className="text-[11px] font-bold uppercase tracking-widest text-primary/60">Set up your flavor profile →</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-4 mb-4">
          <View className="w-full bg-surface-container p-6 rounded-xl relative overflow-hidden border border-outline-variant/10">
            <View className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/20 rounded-full" />
            <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">Membership</Text>
            <Text className="text-2xl font-headline font-bold text-white mb-2">TasteTwin Gold</Text>
            <Text className="text-on-surface-variant text-sm mb-4 leading-relaxed pr-8">Unlock unlimited AI sommelier pairings and exclusive hidden kitchen access.</Text>
            <TouchableOpacity className="bg-white self-start px-6 py-2 rounded-full">
              <Text className="text-background font-bold text-xs uppercase tracking-widest">Upgrade Now</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="w-[48%] bg-surface-container p-6 rounded-xl border border-outline-variant/5" onPress={() => navigation.navigate('Favorites' as never)}>
            <MaterialIcons name="favorite" size={24} color="#e9c349" />
            <Text className="text-lg font-headline font-bold text-white mb-1 mt-2">Saved</Text>
            <Text className="text-xs text-on-surface-variant">{favoritesCount} curated items</Text>
          </TouchableOpacity>
          <View className="w-[48%] bg-surface-container p-6 rounded-xl border border-outline-variant/5">
            <MaterialIcons name="restaurant-menu" size={24} color="#ffb77d" />
            <Text className="text-lg font-headline font-bold text-white mb-1 mt-2">Menus</Text>
            <Text className="text-xs text-on-surface-variant">{analyzedCount} analyzed</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
