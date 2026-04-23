import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const RecommendationsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-primary/20">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADQiBhSi1QK8rSCyi1mdfASXAQK7kzAPXT_yN2fWyhi-aNtPreuqKgSrtTbytf3TH20t0fDUmU2chgkc67CYwVGYkg3LBJQLD1VdaEf3JoSX2r2t35O0MeQMXOkQI2TCeAAEjv6IM5xhLViS2TNNv1anbeNArwr-4CtAKmbmM_u0HNu184qMyS_SuaUL0lo2uO6g1pvxSA279fTf05eY6siVv9nFFzUEfxZZTX4YVDugYDqJsfRFuSpDPc0vVZgFgx0QX3O6F0GCZ-' }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="mb-12">
          <View className="flex-row items-center self-start px-4 py-2 rounded-full bg-surface-variant/30 mb-4">
            <MaterialIcons name="psychology" size={14} color="#e9c349" className="mr-2" />
            <Text className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-secondary ml-2">AI Curated Picks</Text>
          </View>
          <Text className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4 leading-tight">
            Perfect Matches for <Text className="text-primary">Your Palate</Text>
          </Text>
          <Text className="text-on-surface-variant text-base leading-relaxed">
            Our digital sommelier has analyzed your recent history to find the most intense flavor profiles in town.
          </Text>
        </View>

        {/* Bento Recommendations Grid */}
        <View className="space-y-8">
          {/* Featured Recommendation (Large) */}
          <TouchableOpacity className="w-full bg-surface-container rounded-xl overflow-hidden shadow-2xl relative border border-outline-variant/5">
            <View className="h-[400px] w-full relative">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABo9-on4uBoRWouDr3hEstMICMx8Ftdh49km6ELGAP_Lw_zp3-fapcSD6xFXP2iyi0QSfi9ve46RwRX3I3kLmIdTOXxwG3yFRzP6enPaHIHUVzKXFrc1Tf9nExItP1OcTXtDxBdX6vf_QTkpxFGtZYgarbRGarZiK9GzUl2-rftSGyg7L9X6Ik2SQYLHXWuaZ-tGx85UYrf8GSUCIyqcGPxXM-wMI7oem1bFpaRlwZzsEzsIsij0M1lepX9sns82o-az644wDWCTKE' }}
                className="w-full h-full object-cover"
              />
              <View className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <View className="absolute bottom-6 left-6 right-6">
                <View className="flex-row items-center gap-3 mb-3">
                  <View className="bg-primary/20 px-3 py-1 rounded-full border border-primary/20"><Text className="text-primary text-xs font-bold tracking-wider uppercase">98% Match</Text></View>
                  <View className="bg-secondary/20 px-3 py-1 rounded-full border border-secondary/20"><Text className="text-secondary text-xs font-bold tracking-wider uppercase">Chef's Choice</Text></View>
                </View>
                <Text className="font-headline text-3xl font-bold text-white mb-2 leading-tight">Heritage Ribeye with Miso Butter</Text>
                <Text className="text-on-surface-variant text-sm mb-6 leading-relaxed">45-day dry-aged beef, served with charred broccolini and a rich, umami-heavy miso emulsion.</Text>
                <View className="flex-row gap-6 border-t border-outline-variant/15 pt-4">
                  <View>
                    <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Calories</Text>
                    <Text className="text-primary font-bold">740 kcal</Text>
                  </View>
                  <View>
                    <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Protein</Text>
                    <Text className="text-white font-bold">58g</Text>
                  </View>
                  <View>
                    <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Fat</Text>
                    <Text className="text-white font-bold">42g</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Secondary Cards Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-6">
            <TouchableOpacity className="w-[48%] bg-surface-container rounded-xl overflow-hidden shadow-xl border border-outline-variant/5">
              <View className="h-40 relative">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5i58qw-ORXUDfyZFGVzVEE4pgeVWDmmmdwzsChPGZ8VAyGMzb5XU_8Kr_-hMFtLsGh_IPI2LJbpyxnadGbbtsU4HyPjZ8e4Gpdm4RXFUDXVQOaMZjhwOVH8iWL7IuYe1R6hSD9N54Bqt-SSQJbF67Qhbe95BHHdI6oZA2bmYLbC4bb6IUupvhpkIViRTDjdGP6fLmLqFsrB-0NkAj6ETW_ggN8HCrExxPgzWPsTgfQmL7OSQyNlF8nV14AREwvw9o0ZmInm9LNHX' }} className="w-full h-full object-cover" />
                <View className="absolute top-2 right-2 bg-background/60 px-2 py-1 rounded-full"><Text className="text-white text-[8px] font-black uppercase">92% Match</Text></View>
              </View>
              <View className="p-4">
                <Text className="font-headline text-lg font-bold text-white mb-2 leading-tight">Arctic Char & Quinoa</Text>
                <Text className="text-on-surface-variant text-xs mb-4" numberOfLines={2}>Lean protein paired with complex ancient grains and a lemon-tahini drizzle.</Text>
                <View className="flex-row justify-between border-t border-outline-variant/10 pt-3">
                  <View className="items-center"><Text className="text-[8px] text-on-surface-variant uppercase">P</Text><Text className="text-xs font-bold text-white">32g</Text></View>
                  <View className="items-center"><Text className="text-[8px] text-on-surface-variant uppercase">C</Text><Text className="text-xs font-bold text-white">45g</Text></View>
                  <View className="items-center"><Text className="text-[8px] text-on-surface-variant uppercase">F</Text><Text className="text-xs font-bold text-white">12g</Text></View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-surface-container rounded-xl overflow-hidden shadow-xl border border-outline-variant/5">
              <View className="h-40 relative">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH2t76lb18Gjo3W2M3uDIrk11p4Db9mhnwr_tQ3T5tpACbqaXKTtiJZ_cvG9_v-2sQag38q2TwDJ3avhX_7yshUFqObD1tL8rnLcuais0i_xbKbT-hAXluTcsFGwssajdi99b0DsocgjN4qx_MtkDvpcXg3BULXOUi9T6sbSLXugQCSam3mASGSpsMPdrTu9ObVZ3oLbPLVBqvYFgvupw8ptqs2eKlxJBVU66mKkvTyemTWrzp9CfWH8OarBSV7lxQGWgs2DPyXcer' }} className="w-full h-full object-cover" />
                <View className="absolute top-2 right-2 bg-background/60 px-2 py-1 rounded-full"><Text className="text-white text-[8px] font-black uppercase">89% Match</Text></View>
              </View>
              <View className="p-4">
                <Text className="font-headline text-lg font-bold text-white mb-2 leading-tight">Truffle Tagliatelle</Text>
                <Text className="text-on-surface-variant text-xs mb-4" numberOfLines={2}>Handmade pasta tossed in black truffle butter and 24-month aged parmesan.</Text>
                <View className="flex-row justify-between border-t border-outline-variant/10 pt-3">
                  <View className="items-center"><Text className="text-[8px] text-on-surface-variant uppercase">P</Text><Text className="text-xs font-bold text-white">14g</Text></View>
                  <View className="items-center"><Text className="text-[8px] text-on-surface-variant uppercase">C</Text><Text className="text-xs font-bold text-white">68g</Text></View>
                  <View className="items-center"><Text className="text-[8px] text-on-surface-variant uppercase">F</Text><Text className="text-xs font-bold text-white">22g</Text></View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Small List Horizontal Scroll */}
        <View className="mt-10">
          <View className="flex-row items-center gap-2 mb-6">
            <MaterialIcons name="local-fire-department" size={20} color="#ffb77d" />
            <Text className="font-headline text-lg font-bold text-white">Trending Near You</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6 pb-4" contentContainerStyle={{ paddingRight: 24 }}>
            <TouchableOpacity className="w-32 bg-surface-container-low p-3 rounded-xl border border-outline-variant/5 mr-4">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhq6k0dTYkv878mK3H_vvKI29flaBoT3i6bi45Dnq-qKxIfsEtmcoTM29XxHqWfrboKod4lA9eHex6CQiW-YvsD0l-oyIAlZO4wDxMOu7HFR-0lUlWQkfsmTWYkoJpnSrqgD_hYyiTSIk7MuAT4Phfp-byj9Qq2V9d0zKT5IovKSKGJIbihVb3NtAKeDNg-yv_9XsTMgp9Yt1TXbD8DUsnaeC4tzJ6GBKqY0sfChAYpOmKxGyWNQJslzJ9_ATsVpXy6oix-EFm1fUF' }} className="w-full h-20 object-cover rounded-lg mb-3" />
              <Text className="text-xs font-bold text-white leading-tight mb-1" numberOfLines={1}>Zesty Kale Crunch</Text>
              <Text className="text-[10px] text-primary">4.9 ★</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-32 bg-surface-container-low p-3 rounded-xl border border-outline-variant/5 mr-4">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIVfjm-IrzcDJ-rjncyHQNbKZBvDnfbqvzkAZWEJyUjRAM-E73vohtCH6a_r97_m63VddRVc3YFEDPqKxjDtKW6JFuRFT_MlI8D2DArTdSLZIMcMIaC2JPugAeJ6JPUaoThYMnpLVM7A-8GhY1w2MLhz3xCoah1-uPdjSf947SJLdb7LRyx42LDLfKJ5XC9zSbS1_vqzwDjVfe7yW3OP4SeywK1d1t_FoLo8jZBSmdTDTt8p-Ase8PmY-KzqACbAogVYD0iC2U-qa7' }} className="w-full h-20 object-cover rounded-lg mb-3" />
              <Text className="text-xs font-bold text-white leading-tight mb-1" numberOfLines={1}>Smoky Slider</Text>
              <Text className="text-[10px] text-primary">4.8 ★</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-32 bg-surface-container-low p-3 rounded-xl border border-outline-variant/5">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJrBOf2qOlGiLRBnBaeXodqRcCwYa53zzmAMvO1GDuGTEov0gt7IleEM0ba_tBdjzZRmkaURlVwJ4Wh5VsOCn1z7ncDy1vAfANVLNhEG1IY08BdlhrPtAWnIMNvWV5Uo98ZvG9PWuMsDK0N6f_OZEdKWOzNhSGxTu3O5htDFhzyT7NNDYMzXbxisuu_1iJSmPr02SytyF1VgVzEIljC4PFXWN8dTbwsroVfj5-l-C4fUSBG1v2-0ocCuZ3LHbKc9mi_ZWcqpHFY3Us' }} className="w-full h-20 object-cover rounded-lg mb-3" />
              <Text className="text-xs font-bold text-white leading-tight mb-1" numberOfLines={1}>Ahi Ginger Poke</Text>
              <Text className="text-[10px] text-primary">4.7 ★</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
