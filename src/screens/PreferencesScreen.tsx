import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../lib/AuthContext';
import { useProfile, useUpdateTasteProfile } from '../hooks/useProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DIET_OPTIONS = [
  { key: 'Vegetarian', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk8Ma7zfm-fe9Oxok_4bOO2gpwjvMaoOqEaVg-Hm413KdvYQRgEcDk2rwr84akN7FqufvdocS-YxJfYWKFvFlSuvErHsBayhQIKnvgQ7JlO9Sq5-m8bh2Hva5UOocOgAUlkcODEmtd7IQKZ-hTlM9KUozutpKj8D4XnZxLneDsnTMA1ysqXURbH6qpVkPhkD6UPmXYnQDeTtUgUcfMkrS7STHLWIgvPuecGbOiadBVFxQjo2OWenyDcxOK4XHPWgHbQJ3HE0ZF80Mb' },
  { key: 'Keto', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXa67Hw4tZFB4bGaJ-fIBPkakS4e9ujXv7PQ4p8dsAaLOAp9zDYVFFbJJE0TCIsR1VOHUex2m3oo29mhNtgxB3k1chV6zJHJcPDVdqLV7fA2r5D0YEujX5EyRgQpq_pnkbBf5OgnlmExQ_LAzQ4_UNdkGBbjuDmxgo06VKLmuTyfKVCPChs89OUMC5t99ahgb2SPiQkV706ZdCk8tUA8Q5cBRZxXn7m9DmOP774QlW0sO8PtAkuUac3sOsmGesJEdYWOnVIvO9FL2Y' },
  { key: 'Vegan', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bS15sEiliRrsjVVND2jBwUzc1CVNEqlJX1HM6MTfg6N0mT2dehcdJTwZU2C2kcHZiIT4AzyDJZwgg07I1MoNoe7ymMhtSLlUHQhMWwXmB7aMkzFe7Q8qem9Rxxt197TIfr3_5sl8dYOF9kpZQkYiAfVZbbEtFCd3jum8R5sGlN6xoz5FAzVy7pApUHRP_Db95X18ZZQZnAJurVQbfIyFx1Z1rVbreVr22Sx5WE-IghsqybCEP1E67jQhN-bnMdb3oY0o6esj6eJV' },
  { key: 'Paleo', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzC175YEPZ3aH3OVUUMkCmeb65VwUdXhYESwXUe3T_HrtUgAfLcKjO32W6-39GDbvxmsSg_o6FlNR0E3fAP6sAnaw0cXLOQ7L48cUaduM1yVG-rVfG1iASYU7Q1LL5xzIfs41dW43zsN5ohGzlhKLTGNEx3kcgs8GFJQPp5s-qHX84Y0fNfJVW2gxikK9nXXfVmf7u21-FY6x9E9PEwlrjU417nmFLY4Al1iDC3IhPLhcLWqn-W_qZZjL3OboW46EyQYSI4qDxi2tY' },
  { key: 'Mediterranean', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgXS3cJRL3X_eJMKlbRQpD-MyUs8VRqOaAiH2c5rm3SCWyhms-HK2S2j0RCrzqhpbgnYOwlaJC5KokOGVFlxpFOFbLDhQlRlz5DJemCNElYhrVN05KveDB10edfkAn7vP4N4z7MCNEZlB7BBxBASh62T5JRoMn_3YIiikbieykpr0xFMYfnyI9J16rO3HtWrqfsDi1IHfhw3iDlj1Oubxb71jRe_FiTaAem9mDh1h0D9moWttO-zV37A7AMem8QpL5LEm1fsTR7BXI' },
  { key: 'Carnivore', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhQ1fqIx1dXumGyZfQexCePgaPAHEZsGdQuCUz1A4J7in__MK151vI-m4KH9LSyYsHVaASxtsyjDmp7RvxkdtQ390azTXJRQ_tNE7Je9Vag3tNirRYHNdlqpOmeGxWetoQMl4E2U4-5zo1K_bNY0khWPWwXGJiyMi29uCybD3SjXF20czS7Iy8-Dig9FXcn6auf9Bp0vp9C6r0vcPhUXfi6vz0qCB4VWVDcXCUqUQ0_KvlbwoV4_9rWjV0fKscNjxO5oRUX-rRQrR4' },
];

const ALLERGY_OPTIONS = [
  'Dairy', 'Peanuts', 'Gluten', 'Shellfish', 'Soy', 'Tree Nuts',
  'Eggs', 'Fish', 'Sesame', 'Wheat', 'Corn', 'Sulfites'
];

const TASTE_OPTIONS = ['Spicy', 'Umami', 'Sweet', 'Sour', 'Bitter', 'Savory', 'Smoky', 'Tangy'];

const CUISINE_OPTIONS = [
  'Mediterranean', 'Japanese', 'Mexican', 'Thai', 'Nordic', 'Indian',
  'Italian', 'Chinese', 'Korean', 'French', 'Middle Eastern', 'Vietnamese',
  'Greek', 'Turkish', 'Brazilian', 'Ethiopian'
];

const COOKING_STYLE_OPTIONS = [
  'Quick & Easy', 'Gourmet', 'Comfort Food', 'Street Food',
  'Raw / No Cook', 'Grilled / BBQ', 'Baked', 'Slow Cooked'
];

const SPICE_LEVELS = [
  { key: 'mild', label: 'Mild', icon: '🌶️', desc: 'Little to no heat' },
  { key: 'medium', label: 'Medium', icon: '🌶️🌶️', desc: 'Moderate warmth' },
  { key: 'hot', label: 'Hot', icon: '🌶️🌶️🌶️', desc: 'Bring the fire' },
  { key: 'extreme', label: 'Extreme', icon: '🔥', desc: 'Burn it down' },
];

export const PreferencesScreen = ({ navigation }: any) => {
  const { isAuthenticated } = useAuth();
  
  // Only fetch profile data when the user is authenticated
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateTasteProfile = useUpdateTasteProfile();

  const [selectedDiet, setSelectedDiet] = useState<string>('None');
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedCookingStyles, setSelectedCookingStyles] = useState<string[]>([]);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>('medium');

  // Pre-populate from saved data (only runs when authenticated and data loads)
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

  const toggleCookingStyle = (style: string) => {
    setSelectedCookingStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleSave = async () => {
    const flavorAffinities: Record<string, number> = {
      spicy: selectedTastes.includes('Spicy') ? 1 : 0,
      umami: selectedTastes.includes('Umami') ? 1 : 0,
      sweet: selectedTastes.includes('Sweet') ? 1 : 0,
      sour: selectedTastes.includes('Sour') ? 1 : 0,
      bitter: selectedTastes.includes('Bitter') ? 1 : 0,
    };

    if (selectedTastes.includes('Savory')) flavorAffinities.savory = 1;
    if (selectedTastes.includes('Smoky')) flavorAffinities.smoky = 1;
    if (selectedTastes.includes('Tangy')) flavorAffinities.tangy = 1;

    try {
      await updateTasteProfile.mutateAsync({
        dietary_regimen: selectedDiet,
        allergies: selectedAllergies,
        flavor_affinities: flavorAffinities as any,
        favorite_cuisines: selectedCuisines,
      });
      // Mark onboarding as complete so we never auto-redirect again
      await AsyncStorage.setItem('tastetwin.onboarding_complete', 'true');
      await AsyncStorage.removeItem('tastetwin.needs_preferences');
      Alert.alert('Palate Saved! 🎉', 'Your taste profile is ready. Enjoy your personalized experience!', [
        { text: 'Let\'s Go', onPress: () => navigation.goBack() },
      ]);
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
          {navigation.canGoBack() && (
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center bg-surface-container-high"
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={20} color="#e5e2e1" />
            </TouchableOpacity>
          )}
          <Text className="text-xl font-black text-white tracking-tighter font-headline">TasteTwin</Text>
        </View>
        {/* Skip — marks onboarding done and goes straight to home */}
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.setItem('tastetwin.onboarding_complete', 'true');
          await AsyncStorage.removeItem('tastetwin.needs_preferences');
          navigation.goBack();
        }}>
          <Text className="text-secondary text-sm font-medium">Skip</Text>
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
                  <Image source={diet.image} contentFit="cover" transition={200} style={{ width: '100%', height: '100%', opacity: isActive ? 1 : 0.6 }} />
                  <View className="absolute bottom-4 left-4 z-20">
                    <Text className={`font-headline font-bold uppercase tracking-wider text-sm mb-1 ${isActive ? 'text-white' : 'text-on-surface opacity-80'}`}>{diet.key}</Text>
                    {isActive && <View className="w-6 h-1 bg-primary rounded-full" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Spice Tolerance */}
        <View className="mb-14">
          <View className="flex-row items-center gap-3 mb-6">
            <MaterialIcons name="local-fire-department" size={24} color="#ff8c00" />
            <Text className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface">Spice Tolerance</Text>
          </View>
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {SPICE_LEVELS.map((level) => {
              const isActive = selectedSpiceLevel === level.key;
              return (
                <TouchableOpacity
                  key={level.key}
                  className={`w-[48%] p-4 rounded-xl border ${isActive ? 'bg-primary/15 border-primary/40' : 'bg-surface-container-low border-outline-variant/15'}`}
                  onPress={() => setSelectedSpiceLevel(level.key)}
                >
                  <Text className="text-2xl mb-2">{level.icon}</Text>
                  <Text className={`font-headline font-bold text-sm mb-1 ${isActive ? 'text-primary' : 'text-white'}`}>{level.label}</Text>
                  <Text className="text-[10px] text-on-surface-variant">{level.desc}</Text>
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
                  className={`px-5 py-3 rounded-full flex-row items-center gap-2 ${isActive ? 'bg-error-container shadow-lg' : 'bg-surface-container-low border border-outline-variant/15'}`}
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

        {/* Cooking Style */}
        <View className="mb-14">
          <View className="mb-8">
            <View className="flex-row items-center gap-3 mb-2">
              <MaterialIcons name="outdoor-grill" size={24} color="#ffb77d" />
              <Text className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface">Cooking Style</Text>
            </View>
            <Text className="text-sm text-on-surface-variant">What kind of meals do you prefer?</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {COOKING_STYLE_OPTIONS.map((style) => {
              const isActive = selectedCookingStyles.includes(style);
              return (
                <TouchableOpacity
                  key={style}
                  className={`px-5 py-3 rounded-full border ${isActive ? 'bg-secondary/20 border-secondary/30' : 'bg-surface-container-low border-outline-variant/15'}`}
                  onPress={() => toggleCookingStyle(style)}
                >
                  <Text className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-secondary' : 'text-on-surface/60'}`}>{style}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Save CTA */}
        <View className="mt-8">
          <TouchableOpacity
            className="w-full py-5 rounded-2xl bg-primary flex-row items-center justify-center gap-3 shadow-lg shadow-primary/20"
            onPress={handleSave}
            disabled={updateTasteProfile.isPending}
          >
            {updateTasteProfile.isPending ? (
              <ActivityIndicator color="#4d2600" />
            ) : (
              <>
                <Text className="text-on-primary font-headline font-extrabold text-lg">
                  Save My Palate Profile
                </Text>
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
