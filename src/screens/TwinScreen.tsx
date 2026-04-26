import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useTwinMatch } from '../hooks/useTwinMatch';
import type { TwinMatch } from '../hooks/useTwinMatch';

const MatchCard = ({ match, index }: { match: TwinMatch; index: number }) => {
  // Alternate accent color for visual variety
  const isFirst = index === 0;
  const badgeBg = isFirst ? 'bg-primary/20' : 'bg-secondary/20';
  const badgeBorder = isFirst ? 'border-primary/20' : 'border-secondary/20';
  const badgeText = isFirst ? 'text-primary' : 'text-secondary';

  return (
    <View className="bg-surface-container rounded-[24px] overflow-hidden shadow-2xl mb-8 border border-outline-variant/10">
      <View className="aspect-[4/5] relative">
        <Image
          source={{ uri: match.profile.avatar_url || 'https://via.placeholder.com/400' }}
          className="w-full h-full object-cover"
        />
        <View className="absolute inset-0 bg-background/30" />
        <View className={`absolute top-4 right-4 ${badgeBg} px-4 py-2 rounded-full border ${badgeBorder}`}>
          <Text className={`font-headline font-bold ${badgeText}`}>{match.matchScore}% Match</Text>
        </View>
      </View>
      <View className="p-6 -mt-16 bg-surface-container rounded-t-3xl border-t border-outline-variant/5">
        <View className="mb-4">
          <Text className="font-headline font-bold text-2xl text-white">{match.profile.full_name || 'Mystery Foodie'}</Text>
          <Text className="font-body text-on-surface-variant text-sm">
            {match.tasteProfile.favorite_cuisines.slice(0, 2).join(' & ')} Enthusiast
          </Text>
        </View>
        <View className="mb-6">
          <Text className="font-label text-[10px] uppercase tracking-widest text-secondary font-semibold mb-2">Shared Cravings</Text>
          <View className="flex-row flex-wrap gap-2">
            {match.sharedFlavors.length > 0 ? (
              match.sharedFlavors.map((flavor, i) => (
                <View key={i} className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5">
                  <Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">{flavor}</Text>
                </View>
              ))
            ) : (
              // Show top cuisines as shared interests when flavor overlap is low
              match.tasteProfile.favorite_cuisines.slice(0, 3).map((cuisine, i) => (
                <View key={i} className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5">
                  <Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">{cuisine}</Text>
                </View>
              ))
            )}
          </View>
        </View>
        <TouchableOpacity className="w-full py-4 rounded-xl bg-primary items-center">
          <Text className="text-on-primary font-headline font-bold text-base">Connect over Dinner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CompactMatchCard = ({ match }: { match: TwinMatch }) => (
  <View className="w-[48%] bg-surface-container rounded-3xl overflow-hidden mb-4 border border-outline-variant/10">
    <View className="h-32 relative">
      <Image
        source={{ uri: match.profile.avatar_url || 'https://via.placeholder.com/200' }}
        className="w-full h-full object-cover opacity-80"
      />
      <View className="absolute inset-0 bg-black/30 items-center justify-center">
        <Text className="text-white font-headline font-bold text-lg">{match.matchScore}%</Text>
      </View>
    </View>
    <View className="p-3">
      <Text className="text-white font-headline font-bold text-sm" numberOfLines={1}>{match.profile.full_name}</Text>
      <Text className="text-on-surface-variant text-[10px] mt-0.5" numberOfLines={1}>
        {match.sharedFlavors.length > 0 ? match.sharedFlavors.join(' · ') : match.tasteProfile.favorite_cuisines.slice(0, 2).join(' · ')}
      </Text>
    </View>
  </View>
);

export const TwinScreen = () => {
  const { data: matches, isLoading, error } = useTwinMatch();

  const topMatch = matches?.[0];
  const secondaryMatches = matches?.slice(1, 3) || [];
  const remainingMatches = matches?.slice(3) || [];

  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcT2epnVv1zK230bSGAuLRwI6Gc22ujhWh07qrRh4NPZsk0CVAwZYyMIiy_J0fs2-0GVOYb9mfDs-58CqpicET165BRbsPWXDyBtdUGrtIwVONW---R-AwG_waz2qr6j3G3tUMY6qL9H2LIVIec12SMf_xjRNsCkR4_LTUUaZWGJHerfQsf53ndZmt2gOfh9d1a3uu2Tvd-wUZ1FiESUB9gW5OEFy7j9x_M6mn0kKTZmVxXP979obeeT8X71pXufUU_3d4C5X4a2j' }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="mb-12">
          <Text className="font-body text-[10px] font-medium uppercase tracking-widest text-secondary mb-2">The Digital Sommelier</Text>
          <Text className="font-headline font-extrabold text-4xl tracking-tighter leading-tight text-white mb-4">
            Your Culinary <Text className="text-primary">Soulmate</Text> Awaits.
          </Text>
          <Text className="font-body text-on-surface-variant text-base leading-relaxed">
            Discover local epicureans who share your obsession for precise flavors and hidden dining gems.
          </Text>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="items-center py-20">
            <ActivityIndicator size="large" color="#ff8c00" />
            <Text className="text-on-surface-variant text-sm mt-4">Finding your flavor matches...</Text>
          </View>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <View className="bg-surface-container rounded-xl p-6 items-center mb-8 border border-outline-variant/10">
            <MaterialIcons name="error-outline" size={32} color="#ff8c00" />
            <Text className="text-on-surface-variant text-sm mt-3 text-center">
              Could not load matches. Make sure you've set up your taste profile in Preferences.
            </Text>
          </View>
        )}

        {/* Matched Users */}
        {!isLoading && matches && matches.length > 0 && (
          <>
            {/* Top Match — Full card */}
            <View className="space-y-8 mb-12">
              {topMatch && <MatchCard match={topMatch} index={0} />}
              {secondaryMatches.map((match, i) => (
                <MatchCard key={match.profile.id} match={match} index={i + 1} />
              ))}
            </View>

            {/* Remaining matches — Bento grid */}
            {remainingMatches.length > 0 && (
              <View className="mb-8">
                <Text className="font-headline font-bold text-2xl text-white mb-6">More Flavor Twins</Text>
                <View className="flex-row flex-wrap justify-between">
                  {remainingMatches.map(match => (
                    <CompactMatchCard key={match.profile.id} match={match} />
                  ))}
                </View>
              </View>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && matches && matches.length === 0 && (
          <View className="bg-surface-container rounded-xl p-8 items-center border border-outline-variant/10">
            <MaterialIcons name="people-outline" size={48} color="#a48c7a" />
            <Text className="font-headline font-bold text-xl text-white mt-4 mb-2">No Twins Yet</Text>
            <Text className="text-on-surface-variant text-sm text-center">
              Complete your taste profile in Preferences to start finding your culinary soulmates.
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};
