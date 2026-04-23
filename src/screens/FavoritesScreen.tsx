import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const FavoritesScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background" >
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

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
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
          {/* Large Featured Card */}
          <TouchableOpacity className="w-full relative overflow-hidden rounded-xl bg-surface-container shadow-2xl">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv95MhlSPvKSqW_H-ufIrmhwN_Au9qFYZ1T4DZtfhNfGA2ZC6iOUt76L4wEn8Dt1Nz_29V_Zkjwq2aUo_2xN_AVldO-OAGaCPzea-5l1cRPMRCKSZEHBZ8PKXDnMHH8_TG81CYRXGdKvMkL4A4lZEsX5FEvIoSJBfZKZ9kz2nlgbarrrB_mEfCTmZUZjrmZKUlQ21bpAPtrIi7NSOg2htUbJVZM4dh6bWgYhuQPNRZhHiFmNBWkmhKG0iDw1M51JYc5QXkm8273Xu6' }} 
              className="h-96 w-full object-cover" 
            />
            <View className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <View className="absolute bottom-0 left-0 p-6 w-full">
              <View className="bg-primary/20 self-start px-3 py-1 rounded-full border border-primary/20 mb-3">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-primary">98% Match</Text>
              </View>
              <Text className="font-headline text-3xl font-bold text-white mb-2">Honey Glazed Atlantic Salmon</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row gap-4">
                  <View className="flex-row items-center gap-1"><MaterialIcons name="schedule" size={14} color="#ddc1ae" /><Text className="text-on-surface-variant text-sm font-body">25m</Text></View>
                  <View className="flex-row items-center gap-1"><MaterialIcons name="bolt" size={14} color="#ddc1ae" /><Text className="text-on-surface-variant text-sm font-body">420 kcal</Text></View>
                </View>
                <MaterialIcons name="favorite" size={24} color="#ffb77d" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Row of Standard Cards */}
          <View className="flex-row justify-between">
            <TouchableOpacity className="w-[48%] overflow-hidden rounded-xl bg-surface-container">
              <View className="aspect-[4/5] w-full relative">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4wvvlSJok6du1Q1Xuvmmh8JSZ-VWg8z8dw7-PE1TvoxVLLWVUKL--uMmapv4nAAZNOocOUwIQR8Fd_ZM7Jx1IJGe0cLq6UffmUD-sIxpOP26I2Dn2eKEnGB7X-hMrWpkzpuPWgpJYgnHF6f9i4jD2mk_mcbwO3wCW56OPGQHxgTs8o5ic7gs_XQxznPxtdFDB5S0UT8kWnVlTf3JAxA0FRfM46BYUmWZlPfmepR5db3yRzLNUlczAYKxVu77cy6VKuf11BfHkl62W' }} className="h-full w-full object-cover" />
                <View className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <View className="absolute top-4 right-4 bg-background/50 p-2 rounded-full"><MaterialIcons name="favorite" size={16} color="#ffb77d" /></View>
              </View>
              <View className="p-4">
                <Text className="font-headline text-lg font-bold text-white mb-1">Genoese Pesto Rigatoni</Text>
                <Text className="text-on-surface-variant text-xs mb-3">Herbal, Rich, Nutty</Text>
                <View className="flex-row flex-wrap gap-1">
                  <View className="px-2 py-1 rounded-full bg-surface-variant"><Text className="text-[8px] font-bold uppercase tracking-wider text-secondary">Dinner</Text></View>
                  <View className="px-2 py-1 rounded-full bg-surface-variant"><Text className="text-[8px] font-bold uppercase tracking-wider text-tertiary">Vegetarian</Text></View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] overflow-hidden rounded-xl bg-surface-container">
              <View className="aspect-[4/5] w-full relative">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOpiEOp2-DQ-YeUx0Ig3jyl4yQZO33jS4x_WjpML-Fvb2iZ5S45V2LPu8hqhf-gbngjB68CF9CTNDdEN4G-yxRIEYNQIopqZFS1fHCQCKaqY2xez1qWZnvWeTRl-xRoDmgfRvglWonL4sOrd57wuoYJohmUrdW_sehnz9ZBvzDKnryQ6oA5tpcfUMcwhHQJ4jKo-mI13xF3rsUxsitamdycgIsnXFiCB31M7n4IPJbOsXrNAxg2DR1Va53QiuE3xpK41EkP-jVTIDC' }} className="h-full w-full object-cover" />
                <View className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <View className="absolute top-4 right-4 bg-background/50 p-2 rounded-full"><MaterialIcons name="favorite" size={16} color="#ffb77d" /></View>
              </View>
              <View className="p-4">
                <Text className="font-headline text-lg font-bold text-white mb-1">Mediterranean Shakshuka</Text>
                <Text className="text-on-surface-variant text-xs mb-3">Spicy, Savory, Hearty</Text>
                <View className="flex-row flex-wrap gap-1">
                  <View className="px-2 py-1 rounded-full bg-surface-variant"><Text className="text-[8px] font-bold uppercase tracking-wider text-secondary">Breakfast</Text></View>
                  <View className="px-2 py-1 rounded-full bg-surface-variant"><Text className="text-[8px] font-bold uppercase tracking-wider text-[#cac99f]">Spicy</Text></View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Asymmetric Horizontal Card */}
          <TouchableOpacity className="w-full flex-row overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/10">
            <View className="w-[40%]">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk4nOWHdIIv6FYIkQ1JuNxkdKKC_4y_1uxNcK_lj2CHxfolOmKyPJM7f2P-EjlT-8wUX8PKrLwAJuIkU9PdhfmofeVB3U04ZA49mu5XhAwu-ykXC_KaW1Ms9IkUjTFhIMk4KOWOAlXMoYg08gMFLaAa6G6u48eVipFaJYgj_ZQmJNUrcP9ymdU2d3wNJyk7AIM-VDi6-L5n6-eCXyLwM_tnkAAiiHwoDel4r8M8nleV5HXlBJEOYG3e-YkZ4leDBprRdwHH2XFnoST' }} className="h-full w-full object-cover min-h-[200px]" />
            </View>
            <View className="w-[60%] p-5 flex-col justify-center">
              <View className="flex-row items-center gap-1 mb-2">
                <MaterialIcons name="auto-awesome" size={14} color="#e9c349" />
                <Text className="font-label text-[8px] font-bold tracking-widest text-secondary uppercase">AI Optimized</Text>
              </View>
              <Text className="font-headline text-xl font-bold text-white mb-2">Antioxidant Power Bowl</Text>
              <Text className="text-on-surface-variant font-body text-xs leading-relaxed mb-4">
                Designed to balance your metabolic profile.
              </Text>
              <View className="mt-auto flex-row items-center justify-between border-t border-outline-variant/10 pt-3">
                <Text className="text-[10px] text-on-surface-variant">Added 3 days ago</Text>
                <MaterialIcons name="favorite" size={16} color="#ffb77d" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
