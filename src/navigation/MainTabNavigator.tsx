import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { UploadScreen } from '../screens/UploadScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { TwinScreen } from '../screens/TwinScreen';

export type MainTabParamList = {
  Home: undefined;
  Upload: undefined;
  History: undefined;
  Twin: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(28, 27, 27, 0.95)',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 70,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          shadowColor: '#ff8c00',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.08,
          shadowRadius: 40,
        },
        tabBarActiveTintColor: '#ff8c00',
        tabBarInactiveTintColor: '#6b7280', // gray-500 equivalent
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 10,
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginTop: 4,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'circle';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Upload') iconName = 'add-a-photo';
          else if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Twin') iconName = 'people'; // using people instead of custom
          else if (route.name === 'Profile') iconName = 'person';

          return <MaterialIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Twin" component={TwinScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
