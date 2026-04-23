import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const TwinScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcT2epnVv1zK230bSGAuLRwI6Gc22ujhWh07qrRh4NPZsk0CVAwZYyMIiy_J0fs2-0GVOYb9mfDs-58CqpicET165BRbsPWXDyBtdUGrtIwVONW---R-AwG_waz2qr6j3G3tUMY6qL9H2LIVIec12SMf_xjRNsCkR4_LTUUaZWGJHerfQsf53ndZmt2gOfh9d1a3uu2Tvd-wUZ1FiESUB9gW5OEFy7j9x_M6mn0kKTZmVxXP979obeeT8X71pXufUU_3d4C5X4a2j' }}
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
          <Text className="font-body text-[10px] font-medium uppercase tracking-widest text-secondary mb-2">The Digital Sommelier</Text>
          <Text className="font-headline font-extrabold text-4xl tracking-tighter leading-tight text-white mb-4">
            Your Culinary <Text className="text-primary">Soulmate</Text> Awaits.
          </Text>
          <Text className="font-body text-on-surface-variant text-base leading-relaxed">
            Discover local epicureans who share your obsession for precise flavors and hidden dining gems.
          </Text>
        </View>

        {/* Matched Users List */}
        <View className="space-y-8 mb-12">
          {/* Profile Card 1 */}
          <View className="bg-surface-container rounded-[24px] overflow-hidden shadow-2xl mb-8 border border-outline-variant/10">
            <View className="aspect-[4/5] relative">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEXMuQNPfeAqXzd4EUFLmVE8lk_VcTRzF8Q93qxprpZ6n8zKUK6JAOaAW8RVbzbGny3EvevUOne8dfjrbCym3aMrFsTEVra7rZd4BgXwjtzy2I3Qf0MIVzApQGUG1WBhQiVgu8KLfgFfGq8IrKkoL1enknI3j09U0NIzfre15Yiuzry3MTQ81J-6Mriu4g11MOfS_KY0hypEgpyMfKwPpdT8jUhvRm8YgSfdmxELLgYFwTDaJpZkovbvXqPE3nYU3B1notoLPad9E8' }} className="w-full h-full object-cover" />
              <View className="absolute inset-0 bg-background/30" />
              <View className="absolute top-4 right-4 bg-primary/20 px-4 py-2 rounded-full border border-primary/20">
                <Text className="font-headline font-bold text-primary">98% Match</Text>
              </View>
            </View>
            <View className="p-6 -mt-16 bg-surface-container rounded-t-3xl border-t border-outline-variant/5">
              <View className="mb-4">
                <Text className="font-headline font-bold text-2xl text-white">Elena Vance</Text>
                <Text className="font-body text-on-surface-variant text-sm">Sommelier & Pastry Critic</Text>
              </View>
              <View className="mb-6">
                <Text className="font-label text-[10px] uppercase tracking-widest text-secondary font-semibold mb-2">Shared Cravings</Text>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5"><Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">Truffle Risotto</Text></View>
                  <View className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5"><Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">Natural Wine</Text></View>
                  <View className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5"><Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">Omakase</Text></View>
                </View>
              </View>
              <TouchableOpacity className="w-full py-4 rounded-xl bg-primary items-center">
                <Text className="text-on-primary font-headline font-bold text-base">Connect over Dinner</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Card 2 */}
          <View className="bg-surface-container rounded-[24px] overflow-hidden shadow-2xl mb-8 border border-outline-variant/10">
            <View className="aspect-[4/5] relative">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz_SHBmOXZEKTWH4YKUp1tk7w5rDjIIhPwB0I76y6QPpKmmSjp0hzJ4BKKa_xLDa70ui8xiSrO92Z1fGxtf5nR1IgD9EMEcAw__mCjVroZTjwDTaLGwkr2U0lgR2uGrJIESV-6Ey2JBn9rsMSeBB0osFMiUIhNhvkME5qWjo_ET3SPfN2EkQpmunwa_J7a6_vX9Tz_L9eQWM9oCRq6NH_nl8HvJrCbDZNbkVCL2PIvK-RhhKfADCHSXuOeFySPXlby_E1naFw-aG7e' }} className="w-full h-full object-cover" />
              <View className="absolute inset-0 bg-background/30" />
              <View className="absolute top-4 right-4 bg-secondary/20 px-4 py-2 rounded-full border border-secondary/20">
                <Text className="font-headline font-bold text-secondary">92% Match</Text>
              </View>
            </View>
            <View className="p-6 -mt-16 bg-surface-container rounded-t-3xl border-t border-outline-variant/5">
              <View className="mb-4">
                <Text className="font-headline font-bold text-2xl text-white">Julian Thorne</Text>
                <Text className="font-body text-on-surface-variant text-sm">Coffee Roaster & Mixologist</Text>
              </View>
              <View className="mb-6">
                <Text className="font-label text-[10px] uppercase tracking-widest text-secondary font-semibold mb-2">Shared Cravings</Text>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5"><Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">Dry-Aged Steak</Text></View>
                  <View className="bg-surface-variant/50 px-3 py-1.5 rounded-full border border-white/5"><Text className="text-[11px] font-medium text-on-surface uppercase tracking-wider">Smoked Old Fashioned</Text></View>
                </View>
              </View>
              <TouchableOpacity className="w-full py-4 rounded-xl bg-primary items-center">
                <Text className="text-on-primary font-headline font-bold text-base">Connect over Dinner</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bento Spotlight Section */}
        <View className="mb-8">
          <Text className="font-headline font-bold text-2xl text-white mb-6">Trending in your Circle</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Large Card */}
            <View className="w-full h-64 relative rounded-3xl overflow-hidden mb-4">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAHF15k6vhH5sD9EmVbJ_InrqPVRJNXmaRLt7k-bogjLcbIe1VF2SGXgAYPJzZ4U8T5lq5c7ToJE5TJhSktqR5sYVag2fgdlnsnh12_PBg2udZhLpaP44cnljmEH3B4zFuoBawJQBRHUJjYogJy-rnGfMnB6YYWqVc02cNzshoxEpiu-l97W1xTVe5urjxeJEXyHvDCR7uVPFvkigDdNdyhKYnOgBwgXO0STyfL99eoK0h41AMo8_xzjjfDDL4CJPpPhUaJ70uUiRS' }} className="w-full h-full object-cover opacity-80" />
              <View className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <View className="absolute bottom-6 left-6">
                <View className="bg-secondary px-2 py-1 rounded mb-2 self-start">
                  <Text className="text-on-secondary text-[10px] font-bold uppercase tracking-widest">Hottest Match</Text>
                </View>
                <Text className="text-white font-headline font-bold text-2xl">Hokkaido Uni</Text>
              </View>
            </View>

            {/* Two small cards */}
            <View className="w-[48%] h-32 relative rounded-3xl overflow-hidden mb-4">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPES4mU0-2aBrkTSd46xTy9YkmojBEsqZ6ZWYXE3akEOI_-2CeVLlAn7AbVsUm1hyCe57BycZZp614kwoclUX5uomTLI8kSTJyneLRAmu0WPiM-SbkmZcPfNV2w6g-Bg4NL8kxiG15eUGWDIm4UboX6XVgh7xgmhlD68z4XTpuwL9KI5cru9QisFdmBFcnu8aOs2Zr1wg6YLxnJdODiMEs-4mv_BJUSYmsZ0d4sCCYL94kjadfRD2sRZjbARTCBiSbpH4Pz83ni16d' }} className="w-full h-full object-cover opacity-60" />
              <View className="absolute inset-0 items-center justify-center bg-black/30">
                <Text className="text-white font-headline font-bold text-lg">Mixology</Text>
              </View>
            </View>

            <View className="w-[48%] h-32 relative rounded-3xl overflow-hidden mb-4">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjgRTHENybuh-lX386mIsZsCD1GjDo1MdG5NQe9SSTncnJWNfFRxX5u63SG8o9I92KKHtb-1dyt6a15mbeKs0H8H9hAxYyJ3j_1AYgaYd71bIwNB3fQBiDlGHlnxiBJKVclDj1FSO6bUOUyE9obf22LIrynQKn2OI6qIEtpSyEF1sJvikHaUoM5lAc9-HSy65sbOmzg79SIGMDP3dnTuB-8hwnetUC88hB0miy-LE4q_G9Phx67tUIj1l9X8PcLPA39PEbtyMtYakL' }} className="w-full h-full object-cover opacity-60" />
              <View className="absolute inset-0 items-center justify-center bg-black/30">
                <Text className="text-white font-headline font-bold text-lg">Cacao</Text>
              </View>
            </View>

            {/* Medium Card */}
            <View className="w-full h-40 relative rounded-3xl overflow-hidden">
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNsS4KAaeZ8N1gSyIY52NlE4pXjswfP3TPmPZDb9THMU_Hy1rn3K-pJWXa_UBudjtoHVodpVlbh6xgKPG0jCqCaSmLH_tg3pxvxHpWd0iBuh97Z3t-iXGQ_BzEa43_CplprcGwClvsZeZ3rLKNQzpmWg_qLG-Dqx3GirSPFskfVSZXlFvCUdNV5OiXoKbPEf1m9t6N4-WKetfPWum34P3WVfsOeLHLMREUd6pzrINOE_mrLtTbDM9xWVlp6AUMP4bbD8EjPwQipWi' }} className="w-full h-full object-cover opacity-60" />
              <View className="absolute inset-0 items-center justify-center bg-black/30">
                <Text className="text-white font-headline font-bold text-xl">Neapolitan Nights</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
