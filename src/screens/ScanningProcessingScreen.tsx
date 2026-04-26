import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { MainStackParamList } from '../navigation/MainStack';
import { useAnalyze } from '../hooks/useAnalyze';
import { useAuth } from '../lib/AuthContext';
import Toast from 'react-native-toast-message';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

type ScanningScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'ScanningProcessing'>;
type ScanningScreenRouteProp = RouteProp<MainStackParamList, 'ScanningProcessing'>;

export const ScanningProcessingScreen = () => {
  const navigation = useNavigation<ScanningScreenNavigationProp>();
  const route = useRoute<ScanningScreenRouteProp>();
  const imageUri = route.params?.imageUri;

  const { user } = useAuth();
  const analyzeMutation = useAnalyze();

  // Reanimated scanning line
  const scanY = useSharedValue(0);

  useEffect(() => {
    scanY.value = withRepeat(
      withTiming(300, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanY.value }],
  }));

  useEffect(() => {
    const analyzeImage = async () => {
      if (!imageUri || !user) {
        Toast.show({
          type: 'error',
          text1: 'Missing Data',
          text2: 'No image or user session found.',
        });
        navigation.goBack();
        return;
      }

      try {
        const result = await analyzeMutation.mutateAsync({ imageUri, userId: user.id });
        navigation.replace('PredictionResult', { mealData: result as any });
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Analysis Failed',
          text2: error.message || 'Could not analyze image. Try again.',
        });
        navigation.goBack();
      }
    };

    analyzeImage();
  }, []);

  const displayImage = imageUri
    ? { uri: imageUri }
    : { uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbar-FlVw5dj_D2Hlh-uQaHiZZcKxbLJAcxDw9l2Mrcw3Wvlrph8RX7egHSi2-lm7xaetSe43g-sspRToTDB4-jKgSU3hFtbLL4PLWYvqnDCf2Zg8Mov6Q911sA9xdMeaWQ7UpHZiWnkIDUUrsmDuXsEq9SBLm6lwyoVB4oS8N1_vs18AULXqFsXLNSeM0JOQrCYmdUsqdbXcse4BWSdOOCEub5FsDXbGYdty-qI6SQaRA0mgOgzeFmCGcExlIR5vgwxiSREotv3vw' };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
            <Image
              source="https://lh3.googleusercontent.com/aida-public/AB6AXuDEtRKq0nDx9tDpDKSFkYBZ-K3gSlJCEhswujWIdXfBRO6uh9NP8jCjtiUGstBoT6EgjSrwzYLW8w-VyicBUhMugWjx-ckfEkgAgsZk0t4HKsA35ZnNESQxQa3q62KF4jDkanGpnGWxIBQIbt3bXWUCe4EtmEctZnLAeMHLoZ_6HQqklUMXW-Ha48Kradgbr9to6OeutCtY1ULIRoZRhjLo2rsY_9E87dfb0M4Gd17GrvKlWpbRoIlkuCBe6O1Yxood7od6Bd9MZ7yc"
              placeholder={BLURHASH}
              contentFit="cover"
              transition={200}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center px-6 pb-20">
        {/* Scanning Interface */}
        <View className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-surface-container border border-outline-variant/10">
          <Image
            source={displayImage}
            placeholder={BLURHASH}
            contentFit="cover"
            transition={300}
            style={{ width: '100%', height: '100%', opacity: imageUri ? 1 : 0.7 }}
          />
          <View className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Animated Scanning Line — Reanimated */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                width: '100%',
                height: 2,
                backgroundColor: '#ffb77d',
                shadowColor: '#ffb77d',
                shadowOpacity: 0.8,
                shadowRadius: 8,
                elevation: 4,
              },
              scanLineStyle,
            ]}
          />

          {/* Floating Glass Elements */}
          <View className="absolute top-12 left-6 bg-[#1c1b1b]/70 rounded-xl p-3 border border-outline-variant/20 shadow-lg flex-row items-center gap-2">
            <MaterialIcons name="restaurant" size={14} color="#e9c349" />
            <Text className="font-label text-[10px] uppercase tracking-widest text-secondary">Analyzing Texture</Text>
          </View>

          <View className="absolute bottom-24 right-6 bg-[#1c1b1b]/70 rounded-xl p-3 border border-outline-variant/20 shadow-lg flex-row items-center gap-2">
            <MaterialIcons name="psychology" size={14} color="#ffb77d" />
            <Text className="font-label text-[10px] uppercase tracking-widest text-primary">Flavor Mapping</Text>
          </View>

          {/* Focus Corners */}
          <View className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
          <View className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
          <View className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
          <View className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />
        </View>

        {/* Processing Feedback */}
        <View className="mt-12 text-center items-center w-full">
          <Text className="font-headline text-2xl font-extrabold tracking-tight text-white mb-3 text-center">
            Analyzing your meal...
          </Text>
          <Text className="font-body text-sm text-on-surface-variant max-w-xs text-center leading-relaxed mb-6">
            Our AI sommelier is identifying ingredients and matching your unique taste profile.
          </Text>

          {/* Loading Bento Blocks */}
          <View className="flex-row justify-between w-full max-w-md">
            <View className="w-[48%] bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
              <MaterialIcons name="science" size={20} color="#e9c349" />
              <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 mt-2">Nutrients</Text>
              <View className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                <View className="h-full bg-secondary w-2/3 animate-pulse" />
              </View>
            </View>
            <View className="w-[48%] bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
              <MaterialIcons name="local-fire-department" size={20} color="#ffb77d" />
              <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 mt-2">Est. Calories</Text>
              <Text className="font-headline font-bold text-white text-lg opacity-50">--- kcal</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
