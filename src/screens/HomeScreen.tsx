import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../hooks/useProfile';
import { useMeals } from '../hooks/useMeals';
import { SkeletonCard } from '../components/SkeletonCard';
import { AnimatedPressable } from '../components/AnimatedPressable';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: profileData, isLoading: isLoadingProfile } = useProfile();
  const { data: mealsData, isLoading: isLoadingMeals } = useMeals();
  const profile = profileData?.profile;

  const filteredMeals = useMemo(() => {
    if (!mealsData) return [];
    if (!searchQuery.trim()) return mealsData.slice(0, 2);
    return mealsData.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [mealsData, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/90 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <Image
              source={profile?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLQhzh_0yMEhsWmEYll1mte5bm8kq8dnO9By8Nzk_8BMXsbraVeWRIlDbBnVb_lyO5E4J8316wwvRBQcvvVFsa5GuS74kcGgcfX5KVLpZ-BBWJlYKVIbcfXM_wHn6TpSkL1Aoev3daHPqCDLlLWgNTYEKu2aLgOe78a2WrllN6kRFJ4lVxrHUTNzATH8_jQYO2FurkQIOWLZwWQ5zluKhDK3eKUXSJDkKCAf1eXecvwip6l8J4cYpJp5-bEvL_I9qmwM4ri1eB5CZ'}
              placeholder={BLURHASH}
              contentFit="cover"
              transition={200}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter ml-3">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        {/* Greeting & Search Section */}
        <View className="space-y-6 mb-8">
          <View className="space-y-1 mb-6">
            <Text className="text-on-surface-variant font-body text-sm uppercase tracking-widest">Welcome back</Text>
            <Text className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mt-1">Good evening, {profile?.full_name?.split(' ')[0] || 'Chef'}</Text>
          </View>

          {/* Glassmorphic Search */}
          <View className="relative justify-center">
            <MaterialIcons name="search" size={20} color="#e9c349" className="absolute left-4 z-10" />
            <TextInput
              className="w-full bg-surface-container-lowest rounded-xl py-4 pl-12 pr-4 text-on-surface font-body"
              placeholder="Find a recipe or flavor profile..."
              placeholderTextColor="#a48c7a"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Bento Layout: Upload & Taste Twin Preview */}
        <View className="mb-8">
          {/* Upload CTA */}
          <AnimatedPressable
            style={{ width: '100%', height: 256, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}
            onPress={() => navigation.navigate('Upload' as never)}
          >
            <View className="w-full h-full bg-surface-container justify-end p-6 border border-outline-variant/10 relative">
              <View className="absolute inset-0">
                <Image
                  source="https://lh3.googleusercontent.com/aida-public/AB6AXuD31DvAk-M65Owr07aLGGcu-rqmTMVFNEZZYqp---5GtCGxJdilGfZQuTp8PH0htIowKndMLwwGbgYZ9IQ2-udAAcC1hHdlex50USL5rVXprCXs0PjrTm9iBagHIy7NRk81_A9f2a6XsR2NirOlPQehRsF9uqe1lgnY3CRI1_arWQWPuuZjEjQEqkojmoGS59nUCnlIXEP5KRz9B3UIq-XjEtFZ-pkx5VkeWh4N4szJ0rlx0xPGpQEFjfuaazv8Opk9qBXd1btMXRmi"
                  placeholder={BLURHASH}
                  contentFit="cover"
                  transition={300}
                  style={{ width: '100%', height: '100%', opacity: 0.4 }}
                />
                <View className="absolute inset-0 bg-background/50" />
              </View>
              <View className="relative z-10 space-y-4">
                <View className="flex-row items-center space-x-2 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full self-start mb-4">
                  <MaterialIcons name="add-a-photo" size={14} color="#ffb77d" />
                  <Text className="text-primary font-label text-[10px] font-bold uppercase tracking-widest ml-1">New Discovery</Text>
                </View>
                <Text className="font-headline text-3xl font-bold text-white max-w-[250px] leading-tight mb-4">Identify your culinary masterpiece</Text>
                <View className="bg-primary-container px-6 py-3 rounded-lg flex-row items-center self-start">
                  <Text className="text-on-primary font-headline font-bold mr-2">Upload Food</Text>
                  <MaterialIcons name="arrow-forward" size={18} color="#4d2600" />
                </View>
              </View>
            </View>
          </AnimatedPressable>

          {/* Taste Twin Card */}
          <AnimatedPressable
            style={{ width: '100%', borderRadius: 12 }}
          >
            <View className="w-full bg-surface-container-low rounded-xl p-5 border border-outline-variant/5">
              <View className="mb-4">
                <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest mb-3">Your Taste Twin</Text>
                <View className="flex-row items-center space-x-4">
                  <View className="w-14 h-14 rounded-full border-2 border-secondary p-0.5">
                    <Image
                      source="https://lh3.googleusercontent.com/aida-public/AB6AXuAxO-KWictEmRT91M6nh653tY0G0O_o-SSu5K3vxh0CktWvzOPrTazgMxwS_elyFib6rZiyt4meOC2R046EHoXF-VminjtHqzkSzUkpj8Wbz7DvdhKgJP2W-Pd8KPr-l8EStxJaQNO3ogK0n5lkdYCT_11kolUSbyLDsVok8O3V2jrHX4ONrbc7neCL8x8jAEITgeKSo2nzKn8fZ4q4f_CrpI3e_xiNAySUK9z3UPSzKvrx_XR96z25yZ-96qkRD6ga53nGQOqURzPk"
                      placeholder={BLURHASH}
                      contentFit="cover"
                      transition={200}
                      style={{ width: '100%', height: '100%', borderRadius: 999 }}
                    />
                  </View>
                  <View className="ml-3">
                    <Text className="font-headline font-bold text-white text-base">Elena Vance</Text>
                    <Text className="text-secondary text-xs">94% Flavor Match</Text>
                  </View>
                </View>
              </View>
              <View className="space-y-3">
                <View className="flex-row space-x-2 mb-2">
                  <View className="bg-surface-variant/60 px-3 py-1 rounded-full"><Text className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Umami</Text></View>
                  <View className="bg-surface-variant/60 px-3 py-1 rounded-full ml-2"><Text className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Smoky</Text></View>
                </View>
                <Text className="text-xs text-outline italic">"Elena just discovered a hidden truffle bistro in Florence."</Text>
              </View>
            </View>
          </AnimatedPressable>
        </View>

        {/* Recommended Meals Carousel */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-headline text-2xl font-bold text-on-surface">Curated</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendations' as never)}>
              <Text className="text-secondary text-sm font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible" contentContainerStyle={{ paddingRight: 24 }}>
            {/* Card 1 */}
            <AnimatedPressable style={{ width: 260, marginRight: 16 }}>
              <View className="h-64 rounded-xl overflow-hidden mb-3 relative">
                <Image
                  source="https://lh3.googleusercontent.com/aida-public/AB6AXuDgXS3cJRL3X_eJMKlbRQpD-MyUs8VRqOaAiH2c5rm3SCWyhms-HK2S2j0RCrzqhpbgnYOwlaJC5KokOGVFlxpFOFbLDhQlRlz5DJemCNElYhrVN05KveDB10edfkAn7vP4N4z7MCNEZlB7BBxBASh62T5JRoMn_3YIiikbieykpr0xFMYfnyI9J16rO3HtWrqfsDi1IHfhw3iDlj1Oubxb71jRe_FiTaAem9mDh1h0D9moWttO-zV37A7AMem8QpL5LEm1fsTR7BXI"
                  placeholder={BLURHASH}
                  contentFit="cover"
                  transition={300}
                  style={{ width: '100%', height: '100%' }}
                />
                <View className="absolute top-3 right-3 bg-background/80 px-2 py-1 rounded-full">
                  <Text className="text-secondary text-xs font-bold">★ 4.9</Text>
                </View>
              </View>
              <Text className="font-headline font-bold text-lg text-white">Braised Short Ribs</Text>
              <Text className="text-on-surface-variant text-xs mt-1">Modern French Cuisine</Text>
            </AnimatedPressable>

            {/* Card 2 */}
            <AnimatedPressable style={{ width: 260, marginRight: 16 }}>
              <View className="h-64 rounded-xl overflow-hidden mb-3 relative">
                <Image
                  source="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQ1fqIx1dXumGyZfQexCePgaPAHEZsGdQuCUz1A4J7in__MK151vI-m4KH9LSyYsHVaASxtsyjDmp7RvxkdtQ390azTXJRQ_tNE7Je9Vag3tNirRYHNdlqpOmeGxWetoQMl4E2U4-5zo1K_bNY0khWPWwXGJiyMi29uCybD3SjXF20czS7Iy8-Dig9FXcn6auf9Bp0vp9C6r0vcPhUXfi6vz0qCB4VWVDcXCUqUQ0_KvlbwoV4_9rWjV0fKscNjxO5oRUX-rRQrR4"
                  placeholder={BLURHASH}
                  contentFit="cover"
                  transition={300}
                  style={{ width: '100%', height: '100%' }}
                />
                <View className="absolute top-3 right-3 bg-background/80 px-2 py-1 rounded-full">
                  <Text className="text-secondary text-xs font-bold">★ 4.8</Text>
                </View>
              </View>
              <Text className="font-headline font-bold text-lg text-white">Wild Mushroom Tagliatelle</Text>
              <Text className="text-on-surface-variant text-xs mt-1">Artisan Italian</Text>
            </AnimatedPressable>
          </ScrollView>
        </View>

        {/* Recent Meals Vertical List */}
        <View className="mb-4">
          <Text className="font-headline text-2xl font-bold text-on-surface mb-4">
            {searchQuery.trim() ? 'Search Results' : 'Recent Journey'}
          </Text>
          <View className="space-y-4">
            {isLoadingMeals ? (
              <View>
                <SkeletonCard variant="row" />
                <SkeletonCard variant="row" />
              </View>
            ) : filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => (
                <AnimatedPressable key={meal.id} style={{ borderRadius: 12, marginBottom: 8 }}>
                  <View className="flex-row items-center bg-surface-container rounded-xl p-4">
                    <View className="w-20 h-20 rounded-lg overflow-hidden border border-outline-variant/10">
                      <Image
                        source={meal.image_url || 'https://via.placeholder.com/150'}
                        placeholder={BLURHASH}
                        contentFit="cover"
                        transition={200}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className="font-headline font-bold text-white text-base truncate pr-2 flex-1" numberOfLines={1}>{meal.name}</Text>
                        <Text className="text-outline text-[10px] font-medium uppercase tracking-tighter shrink-0">
                          {meal.created_at ? new Date(meal.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                        </Text>
                      </View>
                      <Text className="text-on-surface-variant text-xs">{meal.restaurant || 'Home Cooked'}</Text>
                      {meal.location && (
                        <View className="flex-row items-center mt-2">
                          <MaterialIcons name="location-on" size={12} color="#e9c349" />
                          <Text className="text-outline text-[10px] ml-1">{meal.location}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </AnimatedPressable>
              ))
            ) : (
              <View className="bg-surface-container rounded-xl p-6 items-center border border-outline-variant/10">
                <MaterialIcons name="restaurant-menu" size={36} color="#4d2600" />
                <Text className="text-on-surface-variant text-sm text-center mt-3">
                  {searchQuery.trim() ? 'No meals found matching your search.' : 'No meals logged yet. Scan your first dish!'}
                </Text>
              </View>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
