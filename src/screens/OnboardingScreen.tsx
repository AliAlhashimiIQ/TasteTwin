import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  title: string;
  highlight: string;
  description: string;
  features: { icon: keyof typeof MaterialIcons.glyphMap; text: string }[];
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    icon: 'camera-alt',
    iconBg: '#ff8c00',
    title: 'Scan &',
    highlight: 'Identify',
    description: 'Point your camera at any meal and our AI instantly identifies the dish, ingredients, and provides a full nutritional breakdown.',
    features: [
      { icon: 'restaurant', text: 'Identify any dish instantly' },
      { icon: 'science', text: 'AI-powered ingredient detection' },
      { icon: 'photo-camera', text: 'Camera or gallery upload' },
    ],
  },
  {
    id: '2',
    icon: 'local-fire-department',
    iconBg: '#e9c349',
    title: 'Track Your',
    highlight: 'Macros',
    description: 'Get a complete nutritional breakdown — calories, protein, carbs, fat, fiber, sodium, and sugar — for every meal you scan.',
    features: [
      { icon: 'monitor-weight', text: 'Calories & macro tracking' },
      { icon: 'insights', text: 'Fiber, sodium & sugar breakdown' },
      { icon: 'history', text: 'Full meal history & trends' },
    ],
  },
  {
    id: '3',
    icon: 'people',
    iconBg: '#ffb77d',
    title: 'Find Your',
    highlight: 'Taste Twin',
    description: 'Our AI analyzes your unique flavor DNA to match you with global epicureans who share your palate. Discover the recipes they love.',
    features: [
      { icon: 'psychology', text: 'AI flavor profile analysis' },
      { icon: 'favorite', text: 'Personalized meal recommendations' },
      { icon: 'groups', text: 'Connect with flavor soulmates' },
    ],
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => (
    <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 32 }} className="flex-1 justify-center">
      {/* Icon Hero */}
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <View className="items-center mb-8">
          <View 
            className="w-28 h-28 rounded-[32px] items-center justify-center mb-6"
            style={{ backgroundColor: item.iconBg + '20', borderWidth: 1, borderColor: item.iconBg + '30' }}
          >
            <MaterialIcons name={item.icon} size={56} color={item.iconBg} />
          </View>
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View entering={FadeInDown.delay(200).springify()}>
        <View className="items-center mb-6">
          <Text className="text-4xl font-headline font-extrabold text-on-surface tracking-tighter text-center">
            {item.title}{' '}
            <Text className="text-primary">{item.highlight}</Text>
          </Text>
        </View>
      </Animated.View>

      {/* Description */}
      <Animated.View entering={FadeInDown.delay(300).springify()}>
        <Text className="text-base text-on-surface-variant leading-relaxed font-body text-center px-4 mb-10">
          {item.description}
        </Text>
      </Animated.View>

      {/* Feature List */}
      <Animated.View entering={FadeInDown.delay(400).springify()}>
        <View className="bg-surface-container-low/50 rounded-3xl p-6 border border-outline-variant/10">
          {item.features.map((feature, i) => (
            <View key={i} className={`flex-row items-center ${i < item.features.length - 1 ? 'mb-5' : ''}`}>
              <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-4">
                <MaterialIcons name={feature.icon} size={20} color="#ff8c00" />
              </View>
              <Text className="text-on-surface font-body text-sm flex-1">{feature.text}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background relative overflow-hidden">
      {/* Ambient Decorative Background */}
      <View className="absolute top-0 left-0 w-full h-full" style={styles.radialGlow} />
      <View className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full" style={styles.blur} />

      {/* Top Bar with Skip */}
      <View className="flex-row justify-between items-center px-8 pt-4 relative z-10">
        {/* Progress Dots */}
        <View className="flex-row space-x-2">
          {SLIDES.map((_, i) => (
            <View
              key={i}
              className={`h-1 rounded-full ${i === currentIndex ? 'w-12 bg-primary-container' : 'w-8 bg-surface-container-high'}`}
              style={i > 0 ? { marginLeft: 8 } : {}}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-on-surface-variant/60 text-sm font-label uppercase tracking-widest">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        className="flex-1"
        scrollEventThrottle={16}
      />

      {/* Fixed Action Bottom Section */}
      <View className="p-8 relative z-10">
        <View className="w-full space-y-6">
          {/* Primary CTA */}
          <TouchableOpacity 
            className="w-full py-5 rounded-2xl bg-primary items-center justify-center overflow-hidden flex-row"
            onPress={handleNext}
          >
            <Text className="text-on-primary font-headline font-bold text-lg tracking-tight">
              {currentIndex < SLIDES.length - 1 ? 'Next' : 'Get Started'}
            </Text>
            <MaterialIcons 
              name={currentIndex < SLIDES.length - 1 ? 'arrow-forward' : 'restaurant'} 
              size={20} 
              color="#4d2600" 
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>

          {/* Secondary Action */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')} className="mt-4 items-center">
            <Text className="text-on-surface-variant/60 text-sm font-label uppercase tracking-widest">
              Already have an account? Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blur: {
    opacity: 0.3,
  },
  radialGlow: {
    backgroundColor: 'transparent',
    shadowColor: "#ff8c00",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 100,
    elevation: 20,
  }
});
