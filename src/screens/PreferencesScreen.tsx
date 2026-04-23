import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../navigation/RootNavigator';

export const PreferencesScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
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
        {/* Hero Section */}
        <View className="mb-12">
          <Text className="text-4xl md:text-5xl font-black text-on-surface font-headline tracking-tight mb-4">Refine Your Palate</Text>
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
            {/* Diet Card 1 (Active) */}
            <TouchableOpacity className="w-[48%] h-40 rounded-xl overflow-hidden relative border-2 border-primary">
              <View className="absolute inset-0 bg-black/40 z-10" />
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk8Ma7zfm-fe9Oxok_4bOO2gpwjvMaoOqEaVg-Hm413KdvYQRgEcDk2rwr84akN7FqufvdocS-YxJfYWKFvFlSuvErHsBayhQIKnvgQ7JlO9Sq5-m8bh2Hva5UOocOgAUlkcODEmtd7IQKZ-hTlM9KUozutpKj8D4XnZxLneDsnTMA1ysqXURbH6qpVkPhkD6UPmXYnQDeTtUgUcfMkrS7STHLWIgvPuecGbOiadBVFxQjo2OWenyDcxOK4XHPWgHbQJ3HE0ZF80Mb' }} className="w-full h-full object-cover" />
              <View className="absolute bottom-4 left-4 z-20">
                <Text className="font-headline font-bold text-white uppercase tracking-wider text-sm mb-1">Vegetarian</Text>
                <View className="w-6 h-1 bg-primary rounded-full" />
              </View>
            </TouchableOpacity>

            {/* Diet Card 2 */}
            <TouchableOpacity className="w-[48%] h-40 rounded-xl overflow-hidden relative bg-surface-container">
              <View className="absolute inset-0 bg-black/60 z-10" />
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXa67Hw4tZFB4bGaJ-fIBPkakS4e9ujXv7PQ4p8dsAaLOAp9zDYVFFbJJE0TCIsR1VOHUex2m3oo29mhNtgxB3k1chV6zJHJcPDVdqLV7fA2r5D0YEujX5EyRgQpq_pnkbBf5OgnlmExQ_LAzQ4_UNdkGBbjuDmxgo06VKLmuTyfKVCPChs89OUMC5t99ahgb2SPiQkV706ZdCk8tUA8Q5cBRZxXn7m9DmOP774QlW0sO8PtAkuUac3sOsmGesJEdYWOnVIvO9FL2Y' }} className="w-full h-full object-cover opacity-60" />
              <View className="absolute bottom-4 left-4 z-20">
                <Text className="font-headline font-bold text-on-surface uppercase tracking-wider text-sm opacity-80">Keto</Text>
              </View>
            </TouchableOpacity>

            {/* Diet Card 3 */}
            <TouchableOpacity className="w-[48%] h-40 rounded-xl overflow-hidden relative bg-surface-container">
              <View className="absolute inset-0 bg-black/60 z-10" />
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bS15sEiliRrsjVVND2jBwUzc1CVNEqlJX1HM6MTfg6N0mT2dehcdJTwZU2C2kcHZiIT4AzyDJZwgg07I1MoNoe7ymMhtSLlUHQhMWwXmB7aMkzFe7Q8qem9Rxxt197TIfr3_5sl8dYOF9kpZQkYiAfVZbbEtFCd3jum8R5sGlN6xoz5FAzVy7pApUHRP_Db95X18ZZQZnAJurVQbfIyFx1Z1rVbreVr22Sx5WE-IghsqybCEP1E67jQhN-bnMdb3oY0o6esj6eJV' }} className="w-full h-full object-cover opacity-60" />
              <View className="absolute bottom-4 left-4 z-20">
                <Text className="font-headline font-bold text-on-surface uppercase tracking-wider text-sm opacity-80">Vegan</Text>
              </View>
            </TouchableOpacity>

            {/* Diet Card 4 */}
            <TouchableOpacity className="w-[48%] h-40 rounded-xl overflow-hidden relative bg-surface-container">
              <View className="absolute inset-0 bg-black/60 z-10" />
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzC175YEPZ3aH3OVUUMkCmeb65VwUdXhYESwXUe3T_HrtUgAfLcKjO32W6-39GDbvxmsSg_o6FlNR0E3fAP6sAnaw0cXLOQ7L48cUaduM1yVG-rVfG1iASYU7Q1LL5xzIfs41dW43zsN5ohGzlhKLTGNEx3kcgs8GFJQPp5s-qHX84Y0fNfJVW2gxikK9nXXfVmf7u21-FY6x9E9PEwlrjU417nmFLY4Al1iDC3IhPLhcLWqn-W_qZZjL3OboW46EyQYSI4qDxi2tY' }} className="w-full h-full object-cover opacity-60" />
              <View className="absolute bottom-4 left-4 z-20">
                <Text className="font-headline font-bold text-on-surface uppercase tracking-wider text-sm opacity-80">Paleo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Allergies */}
        <View className="mb-14">
          <View className="flex-row items-center gap-3 mb-6">
            <MaterialIcons name="warning" size={24} color="#e9c349" />
            <Text className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface">Critical Allergies</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="px-5 py-3 rounded-full bg-surface-container-low border border-outline-variant/15 flex-row items-center gap-2">
              <MaterialIcons name="close" size={16} color="#e5e2e1" />
              <Text className="text-sm font-medium text-on-surface">Dairy</Text>
            </TouchableOpacity>
            
            {/* Active Allergy */}
            <TouchableOpacity className="px-5 py-3 rounded-full bg-error-container flex-row items-center gap-2 shadow-lg shadow-error/10">
              <MaterialIcons name="check" size={16} color="#ffffff" />
              <Text className="text-sm font-bold text-white">Peanuts</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-5 py-3 rounded-full bg-surface-container-low border border-outline-variant/15 flex-row items-center gap-2">
              <MaterialIcons name="close" size={16} color="#e5e2e1" />
              <Text className="text-sm font-medium text-on-surface">Gluten</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-3 rounded-full bg-surface-container-low border border-outline-variant/15 flex-row items-center gap-2">
              <MaterialIcons name="close" size={16} color="#e5e2e1" />
              <Text className="text-sm font-medium text-on-surface">Shellfish</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-3 rounded-full bg-surface-container-low border border-outline-variant/15 flex-row items-center gap-2">
              <MaterialIcons name="close" size={16} color="#e5e2e1" />
              <Text className="text-sm font-medium text-on-surface">Soy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-3 rounded-full bg-surface-container-low border border-outline-variant/15 flex-row items-center gap-2">
              <MaterialIcons name="close" size={16} color="#e5e2e1" />
              <Text className="text-sm font-medium text-on-surface">Tree Nuts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Culinary Preferences */}
        <View className="mb-14">
          <View className="mb-8">
            <Text className="text-lg font-bold font-headline uppercase tracking-widest text-on-surface mb-2">Flavor Profile</Text>
            <Text className="text-sm text-on-surface-variant">What makes your taste buds dance?</Text>
          </View>
          
          <View className="space-y-8">
            <View>
              <Text className="text-xs uppercase tracking-tighter text-on-surface-variant mb-4 font-bold">Tastes</Text>
              <View className="flex-row flex-wrap gap-2">
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10 flex-row items-center gap-2">
                  <MaterialIcons name="local-fire-department" size={14} color="#ffb77d" />
                  <Text className="text-xs font-bold uppercase tracking-widest text-primary">Spicy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Umami</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-secondary">Sweet</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Sour</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Bitter</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-xs uppercase tracking-tighter text-on-surface-variant mb-4 font-bold mt-6">Cuisines</Text>
              <View className="flex-row flex-wrap gap-2">
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Mediterranean</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-primary">Japanese</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Mexican</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Thai</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Nordic</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-5 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/10">
                  <Text className="text-xs font-bold uppercase tracking-widest text-on-surface/60">Indian</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Premium CTA */}
        <View className="mt-8">
          <TouchableOpacity 
            className="w-full py-5 rounded-2xl bg-primary flex-row items-center justify-center gap-3 shadow-lg shadow-primary/20"
            onPress={() => isAuthenticated ? navigation.goBack() : navigation.navigate('Login' as never)}
          >
            <Text className="text-on-primary font-headline font-extrabold text-lg">Save Palate Profile</Text>
            <MaterialIcons name="restaurant" size={20} color="#4d2600" />
          </TouchableOpacity>
          <Text className="text-center text-on-surface-variant text-xs mt-6 opacity-60 px-4">
            Your preferences are encrypted and used only for AI personalization.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
