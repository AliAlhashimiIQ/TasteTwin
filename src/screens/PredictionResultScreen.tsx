import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const PredictionResultScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full items-center justify-center bg-surface-container-high"
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
        {/* Hero Section / Food Image */}
        <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative mb-8">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArkdL_zGFN5J6RnxXHeO6LrnqPFGZMesj0tVQHvV1avt17izNrCqBjp8mk-2e39J2bkE150ULr9p_U-AhbbW993MNMXiZnGsuHW1G8nmiTL-BVHmYPghSjZYwvRM8vCQungPN7eNI5OnEgmL2OLeorC-T-VsaIBG98SqpL6nVGTdeaX3pf-AhJ96VxSTzsWflVQ2Fggbyq9zVnyX5DoFLmxKSjfaCbIYW1Vl8Cg12rNGoAcSNqOxvnMlwh5FC3VK1ADRbJkgS_P6M8' }} 
            className="w-full h-full object-cover" 
          />
          <View className="absolute inset-0 bg-black/40" />
          <View className="absolute bottom-6 left-6 right-6">
            <View className="bg-primary/20 self-start px-3 py-1 rounded-full border border-primary/20 mb-2">
              <Text className="text-primary text-xs font-bold tracking-widest uppercase">98% Match</Text>
            </View>
            <Text className="font-headline text-3xl font-extrabold text-white tracking-tight">Truffle Mushroom Risotto</Text>
          </View>
        </View>

        {/* Dashboard Layout */}
        <View className="space-y-8">
          {/* Nutrition Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {/* Calories Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Calories</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">482</Text>
                <Text className="text-primary text-xs font-medium ml-1">kcal</Text>
              </View>
            </View>

            {/* Protein Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-secondary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Protein</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">12</Text>
                <Text className="text-secondary text-xs font-medium ml-1">g</Text>
              </View>
            </View>

            {/* Carbs Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-tertiary/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Carbs</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">64</Text>
                <Text className="text-tertiary text-xs font-medium ml-1">g</Text>
              </View>
            </View>

            {/* Fats Card */}
            <View className="w-[48%] bg-surface-container-low p-5 rounded-3xl overflow-hidden relative">
              <View className="absolute -right-4 -top-4 w-20 h-20 bg-primary-container/10 rounded-full" />
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold mb-6">Fats</Text>
              <View className="flex-row items-baseline">
                <Text className="text-3xl font-headline font-bold text-white">21</Text>
                <Text className="text-primary-container text-xs font-medium ml-1">g</Text>
              </View>
            </View>
          </View>

          {/* Bento: Ingredients & Insights */}
          <View className="space-y-6">
            <View className="bg-surface-container p-6 rounded-3xl">
              <Text className="text-lg font-headline font-bold text-white mb-4">Identified Ingredients</Text>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-surface-variant px-4 py-2 rounded-full"><Text className="text-xs font-medium text-on-surface">Arborio Rice</Text></View>
                <View className="bg-surface-variant px-4 py-2 rounded-full"><Text className="text-xs font-medium text-on-surface">Black Truffle</Text></View>
                <View className="bg-surface-variant px-4 py-2 rounded-full"><Text className="text-xs font-medium text-on-surface">Porcini Mushrooms</Text></View>
                <View className="bg-surface-variant px-4 py-2 rounded-full"><Text className="text-xs font-medium text-on-surface">Parmesan</Text></View>
                <View className="bg-surface-variant px-4 py-2 rounded-full"><Text className="text-xs font-medium text-on-surface">Vegetable Broth</Text></View>
                <View className="bg-surface-variant px-4 py-2 rounded-full"><Text className="text-xs font-medium text-on-surface">Shallots</Text></View>
              </View>
            </View>

            <View className="bg-surface-container p-6 rounded-3xl border border-primary/10 relative">
              <MaterialIcons name="auto-awesome" size={20} color="#e9c349" className="absolute top-6 right-6" />
              <Text className="text-lg font-headline font-bold text-white mb-4">TasteTwin Insight</Text>
              <Text className="text-on-surface-variant text-sm leading-relaxed mb-6">
                This dish is rich in Vitamin B and antioxidants from the mushrooms. The glycemic load is moderate due to the creamy starch content. Perfect for a restorative evening meal.
              </Text>
              
              <View className="pt-6 border-t border-outline-variant/10 flex-row items-center">
                <View className="w-12 h-12 bg-secondary/10 rounded-xl items-center justify-center mr-4">
                  <MaterialIcons name="wine-bar" size={24} color="#e9c349" />
                </View>
                <View>
                  <Text className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-1">Pairing Suggestion</Text>
                  <Text className="text-sm font-bold text-white">Chardonnay or Pinot Noir</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Sidebar */}
          <View className="bg-surface-container-high p-6 rounded-3xl mt-6 border border-outline-variant/5">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-6 text-center">Log Transaction</Text>
            
            <TouchableOpacity className="w-full py-4 bg-primary rounded-2xl flex-row items-center justify-center mb-4">
              <MaterialIcons name="bookmark" size={20} color="#4d2600" />
              <Text className="text-on-primary font-headline font-bold text-base ml-2">Save Meal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-full py-4 bg-transparent border border-outline-variant/30 rounded-2xl flex-row items-center justify-center mb-6">
              <MaterialIcons name="restaurant" size={20} color="#e5e2e1" />
              <Text className="text-on-surface font-headline font-bold text-base ml-2">View Similar Meals</Text>
            </TouchableOpacity>

            <View className="pt-6 border-t border-outline-variant/10 space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Sodium</Text>
                <Text className="text-white font-medium text-sm">840mg</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Fiber</Text>
                <Text className="text-white font-medium text-sm">4g</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-on-surface-variant text-sm">Sugar</Text>
                <Text className="text-white font-medium text-sm">3g</Text>
              </View>
            </View>
          </View>

          <View className="bg-surface-container-low p-6 rounded-3xl items-center mb-8">
            <Text className="text-xs text-on-surface-variant mb-2">Did we get it wrong?</Text>
            <TouchableOpacity>
              <Text className="text-secondary text-sm font-bold underline">Edit Prediction</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
