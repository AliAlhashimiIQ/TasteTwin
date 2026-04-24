import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../lib/AuthContext';
import { useProfile, useUpdateTasteProfile } from '../hooks/useProfile';

const DIET_OPTIONS = [
  { key: 'Vegetarian', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk8Ma7zfm-fe9Oxok_4bOO2gpwjvMaoOqEaVg-Hm413KdvYQRgEcDk2rwr84akN7FqufvdocS-YxJfYWKFvFlSuvErHsBayhQIKnvgQ7JlO9Sq5-m8bh2Hva5UOocOgAUlkcODEmtd7IQKZ-hTlM9KUozutpKj8D4XnZxLneDsnTMA1ysqXURbH6qpVkPhkD6UPmXYnQDeTtUgUcfMkrS7STHLWIgvPuecGbOiadBVFxQjo2OWenyDcxOK4XHPWgHbQJ3HE0ZF80Mb' },
  { key: 'Keto', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXa67Hw4tZFB4bGaJ-fIBPkakS4e9ujXv7PQ4p8dsAaLOAp9zDYVFFbJJE0TCIsR1VOHUex2m3oo29mhNtgxB3k1chV6zJHJcPDVdqLV7fA2r5D0YEujX5EyRgQpq_pnkbBf5OgnlmExQ_LAzQ4_UNdkGBbjuDmxgo06VKLmuTyfKVCPChs89OUMC5t99ahgb2SPiQkV706ZdCk8tUA8Q5cBRZxXn7m9DmOP774QlW0sO8PtAkuUac3sOsmGesJEdYWOnVIvO9FL2Y' },
  { key: 'Vegan', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bS15sEiliRrsjVVND2jBwUzc1CVNEqlJX1HM6MTfg6N0mT2dehcdJTwZU2C2kcHZiIT4AzyDJZwgg07I1MoNoe7ymMhtSLlUHQhMWwXmB7aMkzFe7Q8qem9Rxxt197TIfr3_5sl8dYOF9kpZQkYiAfVZbbEtFCd3jum8R5sGlN6xoz5FAzVy7pApUHRP_Db95X18ZZQZnAJurVQbfIyFx1Z1rVbreVr22Sx5WE-IghsqybCEP1E67jQhN-bnMdb3oY0o6esj6eJV' },
  { key: 'Paleo', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzC175YEPZ3aH3OVUUMkCmeb65VwUdXhYESwXUe3T_HrtUgAfLcKjO32W6-39GDbvxmsSg_o6FlNR0E3fAP6sAnaw0cXLOQ7L48cUaduM1yVG-rVfG1iASYU7Q1LL5xzIfs41dW43zsN5ohGzlhKLTGNEx3kcgs8GFJQPp5s-qHX84Y0fNfJVW2gxikK9nXXfVmf7u21-FY6x9E9PEwlrjU417nmFLY4Al1iDC3IhPLhcLWqn-W_qZZjL3OboW46EyQYSI4qDxi2tY' },
];

const ALLERGY_OPTIONS = ['Dairy', 'Peanuts', 'Gluten', 'Shellfish', 'Soy', 'Tree Nuts'];
const TASTE_OPTIONS = ['Spicy', 'Umami', 'Sweet', 'Sour', 'Bitter'];
const CUISINE_OPTIONS = ['Mediterranean', 'Japanese', 'Mexican', 'Thai', 'Nordic', 'Indian'];

export const PreferencesScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateTasteProfile = useUpdateTasteProfile();

  const [selectedDiet, setSelectedDiet] = useState<string>('None');
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  // Pre-populate from saved data
  useEffect(() => {
    if (profileData?.tasteProfile) {
      const tp = profileData.tasteProfile;
      setSelectedDiet(tp.dietary_regimen || 'None');
      setSelectedAllergies(tp.allergies || []);
      setSelectedCuisines(tp.favorite_cuisines || []);
      // Convert flavor_affinities to selected tastes
      if (tp.flavor_affinities) {
        const activeTastes = Object.entries(tp.flavor_affinities)
          .filter(([_, v]) => (v as number) > 0)
          .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));
        setSelectedTastes(activeTastes);
      }
    }
  }, [profileData]);

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const toggleTaste = (taste: string) => {
    setSelectedTastes(prev =>
      prev.includes(taste) ? prev.filter(t => t !== taste) : [...prev, taste]
    );
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleSave = async () => {
    const flavorAffinities = {
      spicy: selectedTastes.includes('Spicy') ? 1 : 0,
      umami: selectedTastes.includes('Umami') ? 1 : 0,
      sweet: selectedTastes.includes('Sweet') ? 1 : 0,
      sour: selectedTastes.includes('Sour') ? 1 : 0,
      bitter: selectedTastes.includes('Bitter') ? 1 : 0,
    };

    try {
      await updateTasteProfile.mutateAsync({
        dietary_regimen: selectedDiet,
        allergies: selectedAllergies,
        flavor_affinities: flavorAffinities,
        favorite_cuisines: selectedCuisines,
      });
      Alert.alert('Success', 'Your palate profile has been saved!');
      if (isAuthenticated && navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save preferences.');
    }
  };

  if (profileLoading && isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#ffb77d" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeRLdJGD5fKE-4iQa-FWVv1EL0nJPyW6W4WNETy1K7x2PgnAAzh6vXGemIzXG03tv38iJ-1CX47z1mKqXzLGcXrrr8XTRaiP_0mO4kH9kNDP5hpZT1rjC3MOXa6nx95GxTHP1HEDBpL3W_zNsb2jorzUn83zuy4dR5q6cwRWZbtsSfRkVfyBehVEeHGn5ap8EtoU6Uee4efM4lc26_CihVjkokGIF7PancRe58v7Rvy8eTwYpm42p0tDQdTVIhKuzlcE8DQtlXC_t8' }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="text-xl font-black text-white tracking-tighter font-headline">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#e5e2e1" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View className="mb-12">
          <Text className="text-4xl font-black text-on-surface font-headline tracking-tight mb-4">Refine Your Palate</Text>
          <Text className="text-on-surface-variant font-body text-base max-w-lg leading-relaxed">
            Customize your TasteTwin AI to match your dietary needs and culinary obsessions.
          </Text>
        </View>

        {/* Diet Selection */}
        <View className="mb-14">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-bold font-headline uppercase tracking-widest text-primary">Dietary Regimen</Text>
            <Text className="text-xs text-on-surface-variant font-label">Select one</Text>
          </View>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {DIET_OPTIONS.map((diet) => {
              const isActive = selectedDiet === diet.key;
              return (
                <TouchableOpacity
                  key={diet.key}
                  className={`w-[48%] h-40 rounded-xl overflow-hidden relative ${isActive ? 'border-2 border-primary' : 'bg-surface-container'}`}
                  onPress={() => setSelectedDiet(isActive ? 'None' : diet.key)}
                >
                  <View className={`absolute inset-0 ${isActive ? 'bg-black/40' : 'bg-black/60'} z-10`} />
                  <Image source={{ uri: diet.image }} className={`w-full h-full object-cover ${isActive ? '' : 'opacity-60'}`} />
                  <View className="absolute bottom-4 left-4 z-20">
                    <Text className={`font-headline font-bold uppercase tracking-wider text-sm mb-1 ${isActive ? 'text-white' : 'text-on-surface opacity-80'}`}>{diet.key}</Text>
                    {isActive && <View className="w-6 h-1 bg-primary rounded-full" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Allergies */}
        <View className="mb-14">
          <View className="flex-row items-center gap-3 mb-6">
            <MaterialIcons name="warning" size={24} color="#e9c349" />
            <Text className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface">Critical Allergies</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {ALLERGY_OPTIONS.map((allergy) => {
              const isActive = selectedAllergies.includes(allergy);
              return (
                <TouchableOpacity
                  key={allergy}
                  className={`px-5 py-3 rounded-full flex-row items-center gap-2 ${isActive ? 'bg-error-container shadow-lg shadow-error/10' : 'bg-surface-container-low border border-outline-variant/15'}`}
                  onPress={() => toggleAllergy(allergy)}
                >
                  <MaterialIcons name={isActive ? 'check' : 'close'} size={16} color={isActive ? '#ffffff' : '#e5e2e1'} />
                  <Text className={`text-sm ${isActive ? 'font-bold text-white' : 'font-medium text-on-surface'}`}>{allergy}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Flavor Profile */}
        <View className="mb-14">
          <View className="mb-8">
            <Text className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface mb-2">Flavor Profile</Text>
            <Text className="text-sm text-on-surface-variant">What makes your taste buds dance?</Text>
          </View>
          <View className="space-y-8">
            <View>
              <Text className="text-xs uppercase tracking-tighter text-on-surface-variant mb-4 font-bold">Tastes</Text>
              <View className="flex-row flex-wrap gap-2">
                {TASTE_OPTIONS.map((taste) => {
                  const isActive = selectedTastes.includes(taste);
                  return (
                    <TouchableOpacity
                      key={taste}
                      className={`px-5 py-2 rounded-full border border-outline-variant/10 flex-row items-center gap-2 ${isActive ? 'bg-primary/20' : 'bg-surface-variant/40'}`}
                      onPress={() => toggleTaste(taste)}
                    >
                      {taste === 'Spicy' && isActive && <MaterialIcons name="local-fire-department" size={14} color="#ffb77d" />}
                      <Text className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-on-surface/60'}`}>{taste}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View>
              <Text className="text-xs uppercase tracking-tighter text-on-surface-variant mb-4 font-bold mt-6">Cuisines</Text>
              <View className="flex-row flex-wrap gap-2">
                {CUISINE_OPTIONS.map((cuisine) => {
                  const isActive = selectedCuisines.includes(cuisine);
                  return (
                    <TouchableOpacity
                      key={cuisine}
                      className={`px-5 py-2 rounded-full border border-outline-variant/10 ${isActive ? 'bg-primary/20' : 'bg-surface-variant/40'}`}
                      onPress={() => toggleCuisine(cuisine)}
                    >
                      <Text className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-on-surface/60'}`}>{cuisine}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Save CTA */}
        <View className="mt-8">
          <TouchableOpacity
            className="w-full py-5 rounded-2xl bg-primary flex-row items-center justify-center gap-3 shadow-lg shadow-primary/20"
            onPress={isAuthenticated ? handleSave : () => navigation.navigate('Login' as never)}
            disabled={updateTasteProfile.isPending}
          >
            {updateTasteProfile.isPending ? (
              <ActivityIndicator color="#4d2600" />
            ) : (
              <>
                <Text className="text-on-primary font-headline font-extrabold text-lg">Save Palate Profile</Text>
                <MaterialIcons name="restaurant" size={20} color="#4d2600" />
              </>
            )}
          </TouchableOpacity>
          <Text className="text-center text-on-surface-variant text-xs mt-6 opacity-60 px-4">
            Your preferences are encrypted and used only for AI personalization.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
