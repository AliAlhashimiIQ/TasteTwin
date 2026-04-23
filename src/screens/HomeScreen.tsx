import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/90 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLQhzh_0yMEhsWmEYll1mte5bm8kq8dnO9By8Nzk_8BMXsbraVeWRIlDbBnVb_lyO5E4J8316wwvRBQcvvVFsa5GuS74kcGgcfX5KVLpZ-BBWJlYKVIbcfXM_wHn6TpSkL1Aoev3daHPqCDLlLWgNTYEKu2aLgOe78a2WrllN6kRFJ4lVxrHUTNzATH8_jQYO2FurkQIOWLZwWQ5zluKhDK3eKUXSJDkKCAf1eXecvwip6l8J4cYpJp5-bEvL_I9qmwM4ri1eB5CZ' }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter ml-3">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        {/* Greeting & Search Section */}
        <View className="space-y-6 mb-8">
          <View className="space-y-1 mb-6">
            <Text className="text-on-surface-variant font-body text-sm uppercase tracking-widest">Welcome back</Text>
            <Text className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mt-1">Good evening, Alex</Text>
          </View>

          {/* Glassmorphic Search */}
          <View className="relative justify-center">
            <MaterialIcons name="search" size={20} color="#e9c349" className="absolute left-4 z-10" />
            <TextInput 
              className="w-full bg-surface-container-lowest rounded-xl py-4 pl-12 pr-4 text-on-surface font-body"
              placeholder="Find a recipe or flavor profile..."
              placeholderTextColor="#a48c7a"
            />
          </View>
        </View>

        {/* Bento Layout: Upload & Taste Twin Preview */}
        <View className="mb-8">
          {/* Upload CTA */}
          <TouchableOpacity 
            className="w-full h-64 rounded-xl bg-surface-container overflow-hidden justify-end p-6 mb-4 border border-outline-variant/10 relative"
            onPress={() => navigation.navigate('Upload' as never)}
          >
            <View className="absolute inset-0">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD31DvAk-M65Owr07aLGGcu-rqmTMVFNEZZYqp---5GtCGxJdilGfZQuTp8PH0htIowKndMLwwGbgYZ9IQ2-udAAcC1hHdlex50USL5rVXprCXs0PjrTm9iBagHIy7NRk81_A9f2a6XsR2NirOlPQehRsF9uqe1lgnY3CRI1_arWQWPuuZjEjQEqkojmoGS59nUCnlIXEP5KRz9B3UIq-XjEtFZ-pkx5VkeWh4N4szJ0rlx0xPGpQEFjfuaazv8Opk9qBXd1btMXRmi' }}
                className="w-full h-full object-cover opacity-40"
              />
              <View className="absolute inset-0 bg-background/50" />
            </View>
            <View className="relative z-10 space-y-4">
              <View className="flex-row items-center space-x-2 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full self-start mb-4">
                <MaterialIcons name="add-a-photo" size={14} color="#ffb77d" />
                <Text className="text-primary font-label text-[10px] font-bold uppercase tracking-widest ml-1">New Discovery</Text>
              </View>
              <Text className="font-headline text-3xl font-bold text-white max-w-[250px] leading-tight mb-4">Identify your culinary masterpiece</Text>
              <View className="bg-primary-container px-6 py-3 rounded-lg flex-row items-center self-start">
                <Text className="text-on-primary font-headline font-bold mr-2">Upload Food</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#4d2600" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Taste Twin Card */}
          <TouchableOpacity className="w-full bg-surface-container-low rounded-xl p-5 border border-outline-variant/5">
            <View className="mb-4">
              <Text className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest mb-3">Your Taste Twin</Text>
              <View className="flex-row items-center space-x-4">
                <View className="w-14 h-14 rounded-full border-2 border-secondary p-0.5">
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxO-KWictEmRT91M6nh653tY0G0O_o-SSu5K3vxh0CktWvzOPrTazgMxwS_elyFib6rZiyt4meOC2R046EHoXF-VminjtHqzkSzUkpj8Wbz7DvdhKgJP2W-Pd8KPr-l8EStxJaQNO3ogK0n5lkdYCT_11kolUSbyLDsVok8O3V2jrHX4ONrbc7neCL8x8jAEITgeKSo2nzKn8fZ4q4f_CrpI3e_xiNAySUK9z3UPSzKvrx_XR96z25yZ-96qkRD6ga53nGQOqURzPk' }}
                    className="w-full h-full rounded-full object-cover"
                  />
                </View>
                <View className="ml-3">
                  <Text className="font-headline font-bold text-white text-base">Elena Vance</Text>
                  <Text className="text-secondary text-xs">94% Flavor Match</Text>
                </View>
              </View>
            </View>
            <View className="space-y-3">
              <View className="flex-row space-x-2 mb-2">
                <View className="bg-surface-variant/60 px-3 py-1 rounded-full"><Text className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Umami</Text></View>
                <View className="bg-surface-variant/60 px-3 py-1 rounded-full ml-2"><Text className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Smoky</Text></View>
              </View>
              <Text className="text-xs text-outline italic">"Elena just discovered a hidden truffle bistro in Florence."</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recommended Meals Carousel */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-headline text-2xl font-bold text-on-surface">Curated</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendations' as never)}>
              <Text className="text-secondary text-sm font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible" contentContainerStyle={{ paddingRight: 24 }}>
            {/* Card 1 */}
            <TouchableOpacity className="w-[260px] mr-4">
              <View className="h-64 rounded-xl overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgXS3cJRL3X_eJMKlbRQpD-MyUs8VRqOaAiH2c5rm3SCWyhms-HK2S2j0RCrzqhpbgnYOwlaJC5KokOGVFlxpFOFbLDhQlRlz5DJemCNElYhrVN05KveDB10edfkAn7vP4N4z7MCNEZlB7BBxBASh62T5JRoMn_3YIiikbieykpr0xFMYfnyI9J16rO3HtWrqfsDi1IHfhw3iDlj1Oubxb71jRe_FiTaAem9mDh1h0D9moWttO-zV37A7AMem8QpL5LEm1fsTR7BXI' }} className="w-full h-full object-cover" />
                <View className="absolute top-3 right-3 bg-background/80 px-2 py-1 rounded-full">
                  <Text className="text-secondary text-xs font-bold">★ 4.9</Text>
                </View>
              </View>
              <Text className="font-headline font-bold text-lg text-white">Braised Short Ribs</Text>
              <Text className="text-on-surface-variant text-xs mt-1">Modern French Cuisine</Text>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity className="w-[260px] mr-4">
              <View className="h-64 rounded-xl overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhQ1fqIx1dXumGyZfQexCePgaPAHEZsGdQuCUz1A4J7in__MK151vI-m4KH9LSyYsHVaASxtsyjDmp7RvxkdtQ390azTXJRQ_tNE7Je9Vag3tNirRYHNdlqpOmeGxWetoQMl4E2U4-5zo1K_bNY0khWPWwXGJiyMi29uCybD3SjXF20czS7Iy8-Dig9FXcn6auf9Bp0vp9C6r0vcPhUXfi6vz0qCB4VWVDcXCUqUQ0_KvlbwoV4_9rWjV0fKscNjxO5oRUX-rRQrR4' }} className="w-full h-full object-cover" />
                <View className="absolute top-3 right-3 bg-background/80 px-2 py-1 rounded-full">
                  <Text className="text-secondary text-xs font-bold">★ 4.8</Text>
                </View>
              </View>
              <Text className="font-headline font-bold text-lg text-white">Wild Mushroom Tagliatelle</Text>
              <Text className="text-on-surface-variant text-xs mt-1">Artisan Italian</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Meals Vertical List */}
        <View className="mb-4">
          <Text className="font-headline text-2xl font-bold text-on-surface mb-4">Recent Journey</Text>
          <View className="space-y-4">
            {/* Item 1 */}
            <TouchableOpacity className="flex-row items-center bg-surface-container rounded-xl p-4 mb-4">
              <View className="w-20 h-20 rounded-lg overflow-hidden">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPsgxFXZlcbdkjvA7kxfJnk6msowmGsPRmK2RxAI79v9cydqJNTiJgOHMWo6DDGjaDbEHUrhzp0KWDVXW7u2y_1R_cm3txyebcsIWdxbGf8pQcwTzPn1ixWrD5TVOyqukTQW6Rm5sCIOQYPRoLVIsCGnCsqtHOanfRoeqITthdUq37WylP1tsOvT5Bam-dQtWncuXuAZvtfVR5Ed_GglWv7P9s9XQet_uy6YooxyBZYrSM68aA9507XRZN0LKMUoyv_JaLENXFXVk9' }} className="w-full h-full object-cover" />
              </View>
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="font-headline font-bold text-white text-base">Miyagi Oysters</Text>
                  <Text className="text-outline text-[10px] font-medium uppercase tracking-tighter">2h ago</Text>
                </View>
                <Text className="text-on-surface-variant text-xs">The Oyster Bar & Grille</Text>
                <View className="flex-row items-center mt-2">
                  <MaterialIcons name="location-on" size={12} color="#e9c349" />
                  <Text className="text-outline text-[10px] ml-1">San Francisco, CA</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity className="flex-row items-center bg-surface-container rounded-xl p-4">
              <View className="w-20 h-20 rounded-lg overflow-hidden">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxoOCxr1a4znwf0oRY3m4mDuW_W0zgbWxkigbgG03ujBGvmqbLjAbnyhKpuDmDRy30yoQVb-gvziVAxarX1xIZT6JWlGNN9FpZ9Ijm71YPghzpof89zGHyAoIWgdeR4Segp1bvTjktluec42flqOC0a_uHorY6vSr2kSlv30Q9k3UOmw9DILoTiGQUCravx0T_ALDCz_W9NlcVtD9gPEzpzHv9rnAOSGGlBv600yxClE89xF8nsCLLb8a53aGidfNTPAOoTVPoteJS' }} className="w-full h-full object-cover" />
              </View>
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="font-headline font-bold text-white text-base">Har Gow Dim Sum</Text>
                  <Text className="text-outline text-[10px] font-medium uppercase tracking-tighter">Yesterday</Text>
                </View>
                <Text className="text-on-surface-variant text-xs">Red Lantern Bistro</Text>
                <View className="flex-row items-center mt-2">
                  <MaterialIcons name="location-on" size={12} color="#e9c349" />
                  <Text className="text-outline text-[10px] ml-1">Chinatown District</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
