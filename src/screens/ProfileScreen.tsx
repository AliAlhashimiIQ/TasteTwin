import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/90 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDClgfjDJKO3UzG6d9JAncNI_lo9jYh24wBIHo5BQNiMsiEJp_kCZmzypa70rMJNQ1GwW48f5lkMmMk7FkTyg7MQJ8rrRC3yaw4raOit9Mzu36pNSIhSclbzg84LqAfy-tLSGlwGLZVKSy2-B68eNjKyAXwwn7vezC13KamnscrMu2t7QtvBGSplIeW7MOrrKuaFZYlKenW_Ov4u1JU_Uzp7dThyfUUjEWQwyAoPT6W2bDsIL_tdkgukkJw7GHf4A12Whwhx-6ABtCq' }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter ml-3">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Profile Section */}
        <View className="items-center mb-12">
          <View className="relative mb-6">
            {/* Premium Avatar Border simulated with multiple views */}
            <View className="w-32 h-32 rounded-full p-1 bg-primary border-4 border-background overflow-visible">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKr9_c2HwoxvlnWgsZtf3ADvmBO0Ke5kmqg0JuP-v2k9PUCACWoxQrDsd7iWty_1cli5Ep__dQ_whTre9FVdPqYs-srDLUFkaC4cpwlc3wISDJou8ALw9WFYJbealJR5RXPbZE9CHVj4e26_0kyot2KCynsqi76LOGytCT2cniUNQkyDDjSQgZCebN9pYhlxQGO-uuDETaBLpV28livtU5Z-8Vln54280fusxTbaeCh76VcYx2elhSozmfYp3ejalNQm1K_8PqdyD3' }}
                className="w-full h-full rounded-full object-cover"
              />
            </View>
            <View className="absolute bottom-1 right-1 bg-primary w-8 h-8 rounded-full items-center justify-center shadow-lg shadow-black">
              <MaterialIcons name="verified" size={16} color="#4d2600" />
            </View>
          </View>
          
          <Text className="text-3xl font-headline font-extrabold tracking-tight text-white mb-1">Julian Thorne</Text>
          <Text className="text-on-surface-variant font-medium mb-8">Executive Taste Explorer</Text>
          
          {/* Stats Grid */}
          <View className="flex-row w-full max-w-md bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-primary mb-1">124</Text>
              <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Analyzed</Text>
            </View>
            <View className="items-center flex-1 border-x border-outline-variant/10">
              <Text className="text-2xl font-bold text-secondary mb-1">48</Text>
              <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Recipes</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-white mb-1">9.2</Text>
              <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Palate Score</Text>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View className="flex-row gap-4 mb-12">
          <TouchableOpacity className="flex-1 bg-primary-container py-4 rounded-xl flex-row items-center justify-center gap-2">
            <MaterialIcons name="edit" size={20} color="#4d2600" />
            <Text className="text-on-primary font-headline font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-16 bg-surface-container-high rounded-xl items-center justify-center border border-outline-variant/10"
            onPress={signOut} // Add logout logic to settings icon for testing MVP flow
          >
            <MaterialIcons name="logout" size={24} color="#e5e2e1" />
          </TouchableOpacity>
        </View>

        {/* Flavor Profile Chips */}
        <View className="mb-12">
          <View className="flex-row justify-between items-end mb-6">
            <Text className="text-xl font-headline font-bold text-white">Flavor DNA</Text>
            <TouchableOpacity><Text className="text-secondary text-sm font-medium">Update</Text></TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap gap-3">
            <View className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-outline-variant/15"><Text className="text-[11px] font-bold uppercase tracking-widest text-primary">Umami Rich</Text></View>
            <View className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-outline-variant/15"><Text className="text-[11px] font-bold uppercase tracking-widest text-secondary">Modern Nordic</Text></View>
            <View className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-outline-variant/15"><Text className="text-[11px] font-bold uppercase tracking-widest text-on-surface">Spicy Szechuan</Text></View>
            <View className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-outline-variant/15"><Text className="text-[11px] font-bold uppercase tracking-widest text-[#cac99f]">Citrus Zest</Text></View>
            <View className="bg-surface-variant/40 px-5 py-2.5 rounded-full border border-outline-variant/15"><Text className="text-[11px] font-bold uppercase tracking-widest text-white">Fermented</Text></View>
          </View>
        </View>

        {/* Premium Feature Bento */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-4">
          <View className="w-full bg-surface-container p-6 rounded-xl relative overflow-hidden border border-outline-variant/10">
            <View className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/20 rounded-full" />
            <Text className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">Membership</Text>
            <Text className="text-2xl font-headline font-bold text-white mb-2">TasteTwin Gold</Text>
            <Text className="text-on-surface-variant text-sm mb-4 leading-relaxed pr-8">Unlock unlimited AI sommelier pairings and exclusive hidden kitchen access.</Text>
            <TouchableOpacity className="bg-white self-start px-6 py-2 rounded-full">
              <Text className="text-background font-bold text-xs uppercase tracking-widest">Upgrade Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="w-[48%] bg-surface-container p-6 rounded-xl border border-outline-variant/5"
            onPress={() => navigation.navigate('Favorites' as never)}
          >
            <MaterialIcons name="favorite" size={24} color="#e9c349" className="mb-4" />
            <Text className="text-lg font-headline font-bold text-white mb-1 mt-2">Saved</Text>
            <Text className="text-xs text-on-surface-variant">32 curated items</Text>
          </TouchableOpacity>

          <View className="w-[48%] bg-surface-container p-6 rounded-xl border border-outline-variant/5">
            <MaterialIcons name="restaurant-menu" size={24} color="#ffb77d" className="mb-4" />
            <Text className="text-lg font-headline font-bold text-white mb-1 mt-2">Menus</Text>
            <Text className="text-xs text-on-surface-variant">12 digital cards</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
