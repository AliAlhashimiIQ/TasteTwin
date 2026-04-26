import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../navigation/MainStack';
import * as ImagePicker from 'expo-image-picker';

type UploadScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'MainTabs'>;

export const UploadScreen = () => {
  const navigation = useNavigation<UploadScreenNavigationProp>();

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'TasteTwin needs camera access to scan your meals.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate('ScanningProcessing', { imageUri: result.assets[0].uri });
    }
  };

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'TasteTwin needs access to your photos to analyze meals.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate('ScanningProcessing', { imageUri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/90 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              source="https://lh3.googleusercontent.com/aida-public/AB6AXuBfGlgffT_nQXdyMy2r_CERmExVomxko-N84X2Hsww4bUQUtDypeuf0pvIebee4lEPqrMGM1Xyh2JmpYFekk-DOgH20Lskt2RX68NrZnnkurJhVeKayoSnM4hM4sc89EkfwXun5g0fHzfr4-CpEjjRT9JqqNtmAqnrwi-pMNFuaSMFZEGstlI62wrXl3q1qSoZyEg3fVFxi6dvzVjbaL9JDFbg5OwwU-XSiplyHbSs1T-NgB7p782HLyfIQDYkjr4KMUW-kkNAeo3HP"
              placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
              contentFit="cover"
              transition={200}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter ml-3">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#e5e2e1" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View className="mb-10 items-center">
          <Text className="text-4xl font-headline font-extrabold text-white mb-2 tracking-tight">Capture Your Plate</Text>
          <Text className="text-on-surface-variant font-body text-base text-center">AI-powered flavor profile analysis starts here.</Text>
        </View>

        {/* Scanning Interface Container */}
        <View className="relative mb-8 items-center">
          {/* Asymmetric Glow */}
          <View className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full" style={styles.blur} />
          <View className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/10 rounded-full" style={styles.blur} />

          {/* Upload Area */}
          <TouchableOpacity 
            className="w-full aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden justify-center items-center border border-outline-variant/10 relative"
            onPress={handleGallery}
          >
            {/* Corner Accents */}
            <View className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <View className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
            <View className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
            <View className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

            {/* Static Scan Line Simulation */}
            <View className="absolute top-[30%] w-full h-[2px] bg-primary/50 shadow-sm shadow-primary" />

            {/* Background Texture */}
            <View className="absolute inset-0 opacity-10">
              <Image 
                source="https://lh3.googleusercontent.com/aida-public/AB6AXuAa1z4ZQR4RPycgEiAaGhGn--TWXNXZIfFoowb-VLKuN0lbL9besE4vbxEUKusoozxY7eF2QWKItbRPOi2SJrryToIJXHOHLWnAoDnLMqT2epgQV0F7bY4Krkqtr5VT4aLHiNNchr92wA_XU7HxaoT_jpv8PSW5lTeDYU2_-kutY5jLDsXRfrZ6l9wR6srJfe8KnoCuJpVGAIoRlMIQACcwJ90C7cWiiEHOMg7JNX8bf3w00L0mwhkYktQ9RZqO4Nse0IKdB7X6npz0"
                placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
                contentFit="cover"
                transition={200}
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            {/* Center Content */}
            <View className="items-center z-10">
              <View className="w-24 h-24 bg-surface-container-high rounded-full items-center justify-center mb-6 border border-outline-variant/20 shadow-lg shadow-black/50">
                <MaterialIcons name="cloud-upload" size={40} color="#ffb77d" />
              </View>
              <Text className="text-xl font-headline font-bold text-white mb-2">Drop image or tap</Text>
              <Text className="text-on-surface-variant text-sm font-body tracking-wide">JPG, PNG or HEIC up to 20MB</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Grid */}
        <View className="flex-row space-x-4 mb-12">
          <TouchableOpacity 
            className="flex-1 bg-primary flex-row items-center justify-center py-5 rounded-xl"
            onPress={handleCamera}
          >
            <MaterialIcons name="photo-camera" size={24} color="#4d2600" />
            <Text className="text-on-primary font-headline font-bold ml-2 text-base">Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-surface-container flex-row items-center justify-center py-5 rounded-xl border border-outline-variant/10"
            onPress={handleGallery}
          >
            <MaterialIcons name="photo-library" size={24} color="#e9c349" />
            <Text className="text-white font-headline font-bold ml-2 text-base">Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Flavor Tokens */}
        <View className="items-center">
          <Text className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-4">Quick Analyze</Text>
          <View className="flex-row flex-wrap justify-center gap-3">
            <View className="bg-surface-variant/40 px-4 py-2 rounded-full border border-outline-variant/15"><Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Szechuan</Text></View>
            <View className="bg-surface-variant/40 px-4 py-2 rounded-full border border-outline-variant/15"><Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Mediterranean</Text></View>
            <View className="bg-surface-variant/40 px-4 py-2 rounded-full border border-outline-variant/15"><Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Modern Nordic</Text></View>
            <View className="bg-surface-variant/40 px-4 py-2 rounded-full border border-outline-variant/15"><Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Street Food</Text></View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blur: {
    opacity: 0.2,
  }
});
