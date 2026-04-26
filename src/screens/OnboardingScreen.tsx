import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background relative overflow-hidden">
      {/* Ambient Decorative Background */}
      <View className="absolute top-0 left-0 w-full h-full" style={styles.radialGlow} />
      <View className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full" style={styles.blur} />

      {/* Progress Indicator */}
      <View className="flex-row justify-center space-x-2 mt-8 mb-4 relative z-10">
        <View className="h-1 w-12 rounded-full bg-primary-container" />
        <View className="h-1 w-8 rounded-full bg-surface-container-high" />
        <View className="h-1 w-8 rounded-full bg-surface-container-high" />
      </View>

      {/* Hero Content Section */}
      <View className="flex-1 px-8 pt-6 relative z-10 items-center">
        {/* Asymmetric Bento-style Visual Container (Approximation for Mobile) */}
        <View className="w-full max-w-lg mb-12 h-[45%] flex-row flex-wrap justify-between">
          
          {/* Main Twin Visual */}
          <View className="w-[65%] h-[60%] rounded-3xl overflow-hidden shadow-2xl relative mb-4">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARHXoQT_EDC7Q8qVFfAWGCnxNBKJQjlOh7RDEKDggAhVu24D7DELInglj1DzER_hBq_mTo104duGGD1lhpojPN4AXhAgncV543RC-EJFYxgLOSeAL0260sv1w2yTWz7HTf06NANuGn_nhkP6kQWg4bbfi54l97vqn1s8P_8e0heFDDA6plGv0-F2JDyTnjWYNPokRw99d7ETfFVugQHCncq3xTpc9nTqVctyj-QmMnytg4my1ytK6txFqDhTwyZsnOlrU_GguIOYwB' }}
              className="w-full h-full object-cover grayscale-[30%]"
            />
            <View className="absolute inset-0 bg-background/30" />
            <View className="absolute bottom-4 left-4 flex-row items-center space-x-2">
              <View className="w-2 h-2 rounded-full bg-primary" />
              <Text className="text-[10px] font-label uppercase tracking-widest text-primary-fixed">AI Matching Live</Text>
            </View>
          </View>

          {/* Secondary Taste Profile Visual */}
          <View className="w-[30%] h-[40%] rounded-3xl overflow-hidden bg-surface-container-low/70 border border-outline-variant/10">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ74exu1_huCrgy1H1Yd2Im2TPM4mvMwXxmsnu4_HkLAv1da1k0CBqhVZFVcu1O9QLInL_BnDzocoPgWTpFXj3EKAr-4TGEjWakp7Dlt1wstTFECEFNlzCEd9zSgde7y_BJMUmSCJBIC5cpAIL0rkutzipU5HpmaeIf1U2k5T-tiZZqfOCcDqRtu37mKyeQmTmZ5vA8C1lse9RJnHb6ZaRWM8Zjcc_ay2sNbQBp-hIzfFqNHsfkZGUULHs8lt4qaQpN-XnQ4OgMwDY' }}
              className="w-full h-full object-cover"
            />
          </View>

          {/* Twin Connectivity Nodes */}
          <View className="w-full h-[30%] flex-row items-center justify-between px-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/10">
            <View className="flex-row">
              <View className="w-12 h-12 rounded-full border-2 border-background bg-surface-container overflow-hidden z-10">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDhpg2ioRjWv748Amz2LLykmK9zASk51cU5_IuoSQI5siP80sER2vbie80gvd7AT1pbdyxbPPFiR0hAxpeQBpgoLs3PMMMdAZlz0jCnSRq6LcOHYztXnA-Hz7iI4JAQFhEWRFs5wKeIJYZOv-nl9MOmLdTlkEWOixdHMdCzF_1t_Npc1nVrwnrq5UWx1PdO5A007kkuPSZSyWsu7F4Z6tec37D68yAMkhWHOOLG53ihbCioigMyOq76d6v_tC0209Aa2DGIcRs2eN8' }} className="w-full h-full" />
              </View>
              <View className="w-12 h-12 rounded-full border-2 border-background bg-surface-container overflow-hidden -ml-4">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzF3pdRlpgExff8ID33DqfJVXyMcK0EJzQQ0psgRon5D9tY3dwbZ4KT9Xr-gCeAPv7-pkAk4tDA1E8rJuyZEmlGbiBBejB2N1CILdpf70H_JwTCaVcdb3h2bzEWUQdhx1Fo4sukCQ5G3RIJB0CTyVn_JW4nCy5lhdE80smu9vHX4vCk4D-boP2TOreMICkUq-zLn_b7YU5ggarKRmEsW-HVAGE3AorWfUWLkhgD6EsYUU8nNfKNB-6xHsH2CN4pF7pYuuBWDLvJniv' }} className="w-full h-full" />
              </View>
            </View>
            <View className="flex-1 h-[1px] mx-4 bg-[#ffb77d]/50" />
            <View className="items-end">
              <Text className="text-[10px] text-on-surface-variant uppercase tracking-widest font-label">98% Match</Text>
              <Text className="text-primary font-headline font-bold text-sm">Taste Twins</Text>
            </View>
          </View>
        </View>

        {/* Typography Header */}
        <View className="items-center max-w-md w-full">
          <Text className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tighter text-center mb-4">
            Find Your <Text className="text-primary">Taste Twin</Text>
          </Text>
          <Text className="text-base text-on-surface-variant leading-relaxed font-body text-center px-4">
            Our AI analyzes your unique flavor DNA to match you with global epicureans who share your palate. Discover the recipes they love.
          </Text>
        </View>
      </View>

      {/* Fixed Action Bottom Section */}
      <View className="p-8 relative z-10">
        <View className="w-full space-y-6">
          {/* Primary CTA */}
          <TouchableOpacity 
            className="w-full py-5 rounded-2xl bg-primary items-center justify-center overflow-hidden"
            onPress={() => navigation.navigate('Preferences' as never)}
          >
            <Text className="text-on-primary font-headline font-bold text-lg tracking-tight">Get Started</Text>
          </TouchableOpacity>

          {/* Secondary Action */}
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} className="mt-4 items-center">
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
    // Approximation of radial glow in RN
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
