import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const SplashScreen = () => {
  const navigation = useNavigation();

  // Simulate loading delay then navigate to Onboarding
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding' as never);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 bg-[#131313] items-center justify-center relative">
      {/* Background Ambience */}
      <View className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#ffb77d]/10" style={styles.blur} />
      <View className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#e9c349]/10" style={styles.blur} />

      {/* Hero Canvas Image */}
      <View className="absolute inset-0 opacity-40">
        <Image 
          source="https://lh3.googleusercontent.com/aida-public/AB6AXuB9sPVd3iSBVwdclo6E5TVKi_307bv1ZcuO_YIQpwDV3or-2DQI-XqnbprOQNzJ-TWdU6Azq7I8f6kizlheO9wlHqte7IbABT5wysKMgHoEMDJqi3SW3KWufsUzl7nIW5bWkf2iMZ4VYvFvKExgNCeUAOSfPBzPb_9d0W9Vsp-fxANxWjAXRpxPbLtMEsQiHa-FqXSD9c7kwJceBJbcRXVsQPIoorEIwZMPzfoGzSCnFqS99mb4Ucl5NaqErN_0Sar2v-dAlKWQgRTQ"
          contentFit="cover"
          transition={300}
          style={{ width: '100%', height: '100%', opacity: 0.5 }}
        />
        <View className="absolute inset-0 bg-[#131313]/80" />
      </View>

      {/* Main Content */}
      <View className="z-10 flex-col items-center mt-[20%]">
        {/* Brand Logo */}
        <View className="mb-8 p-6 rounded-3xl bg-[#1c1b1b]/40 border border-[#564334]/30">
          <MaterialIcons name="restaurant-menu" size={60} color="#ffb77d" />
        </View>

        {/* Headline */}
        <Text className="font-headline text-6xl font-extrabold text-white tracking-tighter">
          TasteTwin
        </Text>

        {/* Tagline */}
        <Text className="font-body text-[#e9c349] mt-6 text-xs uppercase tracking-[4px] opacity-80 font-medium">
          Discover food through AI
        </Text>

        {/* Loading Indicator */}
        <View className="mt-20 items-center">
          <View className="w-48 h-[2px] bg-[#2a2a2a] rounded-full overflow-hidden">
             {/* Note: Advanced Shimmer requires Reanimated. Using a static primary line for the skeleton MVP */}
             <View className="h-full w-1/3 bg-[#ffb77d]" />
          </View>
          <Text className="font-body text-[#ddc1ae]/60 text-[10px] uppercase tracking-widest mt-6">
            Initializing Sommelier Engine
          </Text>
        </View>
      </View>

      {/* Bottom Anchors */}
      <SafeAreaView className="absolute bottom-8 left-8 right-8 flex-row justify-between items-end">
        <Text className="font-headline font-bold text-[10px] text-[#ddc1ae]/40 tracking-widest leading-relaxed">
          NOCTURNAL{'\n'}EPICUREAN v1.0
        </Text>
        <View className="flex-row space-x-4">
          <MaterialIcons name="restaurant" size={20} color="rgba(255, 183, 125, 0.4)" />
          <MaterialIcons name="camera-alt" size={20} color="rgba(255, 183, 125, 0.4)" />
          <MaterialIcons name="auto-awesome" size={20} color="rgba(255, 183, 125, 0.4)" />
        </View>
      </SafeAreaView>
    </View>
  );
};

// React Native lacks true CSS blur filters out of the box without extra packages, 
// so we fall back to opacity for now, or you can add `@react-native-community/blur`.
const styles = StyleSheet.create({
  blur: {
    opacity: 0.3,
  }
});
