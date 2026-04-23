import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const HistoryScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-[#131313]/80 z-50">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfyTJsazlUgbP1jfRf1x8A9Cb7m7dGw6HnyaDkLmAapDkHj9VhW2_28FWEvs9lGJQgqQelPl9JiRDN389u7_T9kRsZ_hkCWCHs5DSt4U_iy4fFeIz85fWsUFMrOEVlK_l7jGiHOyURbVFfuksGpDhcm5wdfm3F_jQliABQVaezuMm1WMTLy6NuG0Y1uueRDp3xiKQfVSTSgkeoTy0Ar6peYZLRevapRuCCNJHYKQIpnvU8LpUtbST9khF1tlRFOIU_pZlBdwE9nSoN' }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="font-headline font-black text-xl text-white tracking-tighter">TasteTwin</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#e5e2e1" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Editorial Header Section */}
        <View className="mb-10">
          <Text className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">History</Text>
          <Text className="text-on-surface-variant font-body">Your digital sommelier's archive of culinary explorations.</Text>
        </View>

        {/* Modern Filter and Sort */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 overflow-visible" contentContainerStyle={{ paddingRight: 24 }}>
          <TouchableOpacity className="flex-row items-center space-x-2 bg-surface-container-high px-5 py-2.5 rounded-full border border-outline-variant/15 mr-3">
            <MaterialIcons name="tune" size={16} color="#e9c349" />
            <Text className="text-sm font-medium text-white ml-1">All Types</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center space-x-2 bg-surface-container px-5 py-2.5 rounded-full border border-outline-variant/10 mr-3">
            <MaterialIcons name="calendar-today" size={16} color="#e9c349" />
            <Text className="text-sm font-medium text-white ml-1">Last 7 Days</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-2 bg-surface-container px-5 py-2.5 rounded-full border border-outline-variant/10">
            <MaterialIcons name="sort" size={16} color="#e9c349" />
            <Text className="text-sm font-medium text-white ml-1">Newest First</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Meal History List */}
        <View className="space-y-6">
          {/* Entry 1 */}
          <TouchableOpacity className="bg-surface-container-low rounded-[24px] p-1 shadow-lg shadow-primary/5 mb-6">
            <View className="flex-row p-4 bg-surface-container rounded-[20px]">
              <View className="w-28 h-28 rounded-xl overflow-hidden mr-4">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnkxlx2QK_CH7d7J7vA5xkQcNELKQOIhsFojPh5DhYAWre7o-NbOKg2-HrWUI5TKkBpvDpn2jUZ0nZIDBYiueCM77-CxsjjWWNY7KmEPJ8ao7eppeROdaCID1zfiib3E6HRt24fCVRxuvZvi1xYZ1wRC5mOzXur4lWqOYF2cCPmor4dJItUl4sm_TG2ywdjhF6emLCxhXiWkqzblDVc0iM6jibWkWyU01Ggo4QuCpgMQXXOlUiQVEqE7l3gpMXePqLybn_IuRK1tt2' }} className="w-full h-full object-cover" />
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-xl font-headline font-bold text-on-surface leading-tight flex-1">Summer Quinoa Oasis</Text>
                  <MaterialIcons name="arrow-forward-ios" size={14} color="#a48c7a" />
                </View>
                <Text className="text-on-surface-variant text-xs mb-4">Monday, Oct 23 • 12:45 PM</Text>
                <View className="flex-row items-center flex-wrap gap-2">
                  <View className="flex-row items-center px-3 py-1 bg-surface-container-high rounded-full">
                    <MaterialIcons name="local-fire-department" size={14} color="#e9c349" />
                    <Text className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">420 KCAL</Text>
                  </View>
                  <View className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <Text className="text-[10px] font-black text-primary uppercase tracking-widest">High Fiber</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Entry 2 */}
          <TouchableOpacity className="bg-surface-container-low rounded-[24px] p-1 shadow-lg shadow-primary/5 mb-6">
            <View className="flex-row p-4 bg-surface-container rounded-[20px]">
              <View className="w-28 h-28 rounded-xl overflow-hidden mr-4">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM9aNrFK_ClyxMxIFxGsXUkFUg1p8ZirVsDmS0cZiQZRRoz3_e2-wGnfTD6Gs4B8hBZd6NXWYY2cK66Ob2sTUM6A3mgMFExnnx1Q9YAGKJyDUubL68RcUp1RheldrUMrdiTpGYLPbS60vQ2pp7aKuoeDcINC6mYn76X9FZMSL0I1OSM80SNH0c7OjsrxSunmQCrMo1mYONuytFuhqLOppFTQ2Vdv8TI7p7yFj8mk9PfZ87rAiYDdrzP0Q6pb62ExzLrA6JqpRk9ElC' }} className="w-full h-full object-cover" />
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-xl font-headline font-bold text-on-surface leading-tight flex-1">Ahi Tuna Meditation</Text>
                  <MaterialIcons name="arrow-forward-ios" size={14} color="#a48c7a" />
                </View>
                <Text className="text-on-surface-variant text-xs mb-4">Sunday, Oct 22 • 7:15 PM</Text>
                <View className="flex-row items-center flex-wrap gap-2">
                  <View className="flex-row items-center px-3 py-1 bg-surface-container-high rounded-full">
                    <MaterialIcons name="local-fire-department" size={14} color="#e9c349" />
                    <Text className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">580 KCAL</Text>
                  </View>
                  <View className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <Text className="text-[10px] font-black text-primary uppercase tracking-widest">Protein+</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Entry 3 */}
          <TouchableOpacity className="bg-surface-container-low rounded-[24px] p-1 shadow-lg shadow-primary/5">
            <View className="flex-row p-4 bg-surface-container rounded-[20px]">
              <View className="w-28 h-28 rounded-xl overflow-hidden mr-4">
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLfbUNjNP12rDgTaS82IeXfeOO0eYDwnz5b_VyIHxAdP9yDR95wPf1VsESQ927deSuRnvOz8E4Wxy42T3R5vNNis0LqMWCeuhZxNicIeUbQU9DLn4W1DeJS6onuGVPtub3FC_2JyX6QXk7W00dcC0Z4cDUfKhtmfNZgyKhav0l6IED_0zjtWoqubAhs17nszrVBSQgGf0UNDOk83c7qV8ID3WitXprUMGD-Qmzy8wZg6VpZqlBq60-NQnBajVWSkerzntkxFPp_euK' }} className="w-full h-full object-cover" />
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-xl font-headline font-bold text-on-surface leading-tight flex-1">Morning Berry Infusion</Text>
                  <MaterialIcons name="arrow-forward-ios" size={14} color="#a48c7a" />
                </View>
                <Text className="text-on-surface-variant text-xs mb-4">Sunday, Oct 22 • 08:30 AM</Text>
                <View className="flex-row items-center flex-wrap gap-2">
                  <View className="flex-row items-center px-3 py-1 bg-surface-container-high rounded-full">
                    <MaterialIcons name="local-fire-department" size={14} color="#e9c349" />
                    <Text className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">310 KCAL</Text>
                  </View>
                  <View className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <Text className="text-[10px] font-black text-primary uppercase tracking-widest">Antioxidant</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
