import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useMeals } from '../hooks/useMeals';
import { useProfile } from '../hooks/useProfile';
import { SkeletonCard } from '../components/SkeletonCard';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export const HistoryScreen = () => {
  const { data: meals, isLoading, refetch, isRefetching } = useMeals();
  const { data: profileData } = useProfile();
  const profile = profileData?.profile;

  const formatDate = (isoString: string | undefined) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
            <Image
              source={profile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfyTJsazlUgbP1jfRf1x8A9Cb7m7dGw6HnyaDkLmAapDkHj9VhW2_28FWEvs9lGJQgqQelPl9JiRDN389u7_T9kRsZ_hkCWCHs5DSt4U_iy4fFeIz85fWsUFMrOEVlK_l7jGiHOyURbVFfuksGpDhcm5wdfm3F_jQliABQVaezuMm1WMTLy6NuG0Y1uueRDp3xiKQfVSTSgkeoTy0Ar6peYZLRevapRuCCNJHYKQIpnvU8LpUtbST9khF1tlRFOIU_pZlBdwE9nSoN'}
              placeholder={BLURHASH}
              contentFit="cover"
              transition={200}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
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
        <View className="mb-10">
          <Text className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">History</Text>
          <Text className="text-on-surface-variant font-body">Your digital sommelier's archive of culinary explorations.</Text>
        </View>

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
                <TouchableOpacity className="bg-surface-container-low rounded-[24px] p-1 shadow-lg mb-2">
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
