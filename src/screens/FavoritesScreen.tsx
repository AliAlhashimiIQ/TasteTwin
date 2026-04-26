import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFavorites, useToggleFavorite } from '../hooks/useFavorites';
import { SkeletonCard } from '../components/SkeletonCard';
import { AnimatedPressable } from '../components/AnimatedPressable';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { data: favorites, isLoading, refetch, isRefetching } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  const handleToggle = (mealLogId: string | null) => {
    if (mealLogId) toggleFavorite.mutate(mealLogId);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center bg-surface-container"
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#e5e2e1" />
        </TouchableOpacity>
        <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#e5e2e1" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#e9c349" colors={['#e9c349']} />
        }
      >
        {/* Editorial Header */}
        <View className="mb-12">
          <Text className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">Curated Collection</Text>
          <Text className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-2">Your Favorites</Text>
          <Text className="text-on-surface-variant text-base font-body leading-relaxed">
            A personal archive of your culinary soulmates and AI-matched masterpieces.
          </Text>
        </View>

        {/* Favorites Bento Grid */}
        <View className="space-y-8">
          {isLoading ? (
            <View>
              <SkeletonCard variant="card" height={384} borderRadius={16} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SkeletonCard variant="card" width="48%" height={280} borderRadius={16} />
                <SkeletonCard variant="card" width="48%" height={280} borderRadius={16} />
              </View>
            </View>
          ) : !favorites || favorites.length === 0 ? (
            <View className="py-10 items-center justify-center bg-surface-container-low rounded-[24px] px-6">
              <MaterialIcons name="favorite-border" size={48} color="#4d2600" />
              <Text className="font-headline text-lg text-white font-bold mb-2 mt-4">No Favorites Yet</Text>
              <Text className="text-on-surface-variant text-center font-body text-sm">Save your favorite meals to build your personal curated collection.</Text>
            </View>
          ) : (
            <>
              {/* Large Featured Card (First Item) */}
              {favorites[0] && (
                <AnimatedPressable style={{ width: '100%', borderRadius: 16, overflow: 'hidden' }}>
                  <View className="w-full relative bg-surface-container shadow-2xl rounded-xl overflow-hidden">
                    <Image
                      source={favorites[0].meal_logs?.image_url || 'https://via.placeholder.com/400'}
                      placeholder={BLURHASH}
                      contentFit="cover"
                      transition={300}
                      style={{ height: 384, width: '100%' }}
                    />
                    <View className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    <View className="absolute bottom-0 left-0 p-6 w-full">
                      <View className="bg-primary/20 self-start px-3 py-1 rounded-full border border-primary/20 mb-3">
                        <Text className="text-[10px] font-bold uppercase tracking-widest text-primary">{favorites[0].meal_logs?.match_score || 85}% Match</Text>
                      </View>
                      <Text className="font-headline text-3xl font-bold text-white mb-2">{favorites[0].meal_logs?.name}</Text>
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row gap-4">
                          {favorites[0].meal_logs?.flavor_tags && favorites[0].meal_logs.flavor_tags.length > 0 && (
                            <View className="flex-row items-center gap-1"><MaterialIcons name="auto-awesome" size={14} color="#ddc1ae" /><Text className="text-on-surface-variant text-sm font-body">{favorites[0].meal_logs.flavor_tags[0]}</Text></View>
                          )}
                          <View className="flex-row items-center gap-1"><MaterialIcons name="bolt" size={14} color="#ddc1ae" /><Text className="text-on-surface-variant text-sm font-body">{favorites[0].meal_logs?.calories} kcal</Text></View>
                        </View>
                        <TouchableOpacity onPress={() => handleToggle(favorites[0].meal_log_id)}>
                          <MaterialIcons name="favorite" size={24} color="#ffb77d" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </AnimatedPressable>
              )}

              {/* Row of Standard Cards */}
              {favorites.length > 1 && (
                <View className="flex-row justify-between flex-wrap gap-y-4">
                  {favorites.slice(1).map((fav) => (
                    <AnimatedPressable key={fav.id} style={{ width: '48%', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
                      <View className="bg-surface-container rounded-xl overflow-hidden">
                        <View className="aspect-[4/5] w-full relative">
                          <Image
                            source={fav.meal_logs?.image_url || 'https://via.placeholder.com/300'}
                            placeholder={BLURHASH}
                            contentFit="cover"
                            transition={200}
                            style={{ height: '100%', width: '100%' }}
                          />
                          <View className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                          <TouchableOpacity
                            className="absolute top-4 right-4 bg-background/50 p-2 rounded-full"
                            onPress={() => handleToggle(fav.meal_log_id)}
                          >
                            <MaterialIcons name="favorite" size={16} color="#ffb77d" />
                          </TouchableOpacity>
                        </View>
                        <View className="p-4">
                          <Text className="font-headline text-lg font-bold text-white mb-1" numberOfLines={2}>{fav.meal_logs?.name}</Text>
                          <Text className="text-on-surface-variant text-xs mb-3" numberOfLines={1}>
                            {fav.meal_logs?.ingredients ? fav.meal_logs.ingredients.slice(0,2).join(', ') : ''}
                          </Text>
                          <View className="flex-row flex-wrap gap-1">
                            {fav.meal_logs?.flavor_tags && fav.meal_logs.flavor_tags.slice(0, 2).map((tag: string, i: number) => (
                              <View key={i} className="px-2 py-1 rounded-full bg-surface-variant">
                                <Text className="text-[8px] font-bold uppercase tracking-wider text-secondary">{tag}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </AnimatedPressable>
                  ))}
                </View>
              )}
            </>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
