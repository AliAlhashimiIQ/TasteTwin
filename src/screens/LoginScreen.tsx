import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import Toast from 'react-native-toast-message';

export const LoginScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: error.message,
      });
    }
    // On success, onAuthStateChange in RootNavigator handles navigation
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim() || undefined,
        },
      },
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: error.message,
      });
    } else if (data.session === null) {
      // This happens when email confirmation is enabled in Supabase
      Toast.show({
        type: 'success',
        text1: 'Verification Sent',
        text2: 'Please check your email to confirm your account.',
        visibilityTime: 5000,
      });
      setIsSignUp(false); // Switch to sign in view
    }
    // The trigger in Supabase will auto-create profile + taste_profile
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background relative">
      {/* Ambient Decoration */}
      <View className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full opacity-30" />
      <View className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full opacity-30" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 32 }}>
          
          {/* Mobile Logo */}
          <View className="mb-12 items-center">
            <Text className="font-headline font-black text-4xl tracking-tighter text-white">TasteTwin</Text>
          </View>

          <View className="w-full max-w-md mx-auto space-y-10">
            {/* Header Text */}
            <View className="space-y-2 mb-8">
              <Text className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">
                {isSignUp ? 'Create Account' : 'Welcome back'}
              </Text>
              <Text className="font-body text-on-surface-variant text-base">
                {isSignUp ? 'Join your culinary sanctuary' : 'Sign in to your culinary sanctuary'}
              </Text>
            </View>

            {/* Social Auth Grid */}
            <View className="flex-row space-x-4 mb-6">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
                <FontAwesome5 name="apple" size={20} color="#e5e2e1" />
                <Text className="text-sm font-semibold tracking-wide text-on-surface ml-3">Apple</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-4 rounded-xl bg-surface-container-high border border-outline-variant/10">
                <FontAwesome5 name="google" size={18} color="#e5e2e1" />
                <Text className="text-sm font-semibold tracking-wide text-on-surface ml-3">Google</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center py-2 mb-6">
              <View className="flex-1 h-[1px] bg-outline-variant/20" />
              <Text className="mx-4 text-xs font-label uppercase tracking-widest text-outline">Or via email</Text>
              <View className="flex-1 h-[1px] bg-outline-variant/20" />
            </View>

            {/* Auth Form */}
            <View className="space-y-6">
              {/* Full Name (Sign Up only) */}
              {isSignUp && (
                <View className="space-y-1.5 mb-4">
                  <Text className="text-xs font-label uppercase tracking-widest text-outline ml-1 mb-2">Full Name</Text>
                  <View className="relative justify-center">
                    <MaterialIcons name="person" size={20} color="#a48c7a" style={{ position: 'absolute', left: 16, zIndex: 10 }} />
                    <TextInput 
                      className="w-full bg-surface-container-lowest border-0 rounded-xl py-4 pl-12 pr-4 text-on-surface font-body text-base"
                      placeholder="Your full name"
                      placeholderTextColor="#353534"
                      value={fullName}
                      onChangeText={setFullName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              )}

              <View className="space-y-1.5 mb-4">
                <Text className="text-xs font-label uppercase tracking-widest text-outline ml-1 mb-2">Email Address</Text>
                <View className="relative justify-center">
                  <MaterialIcons name="mail" size={20} color="#a48c7a" style={{ position: 'absolute', left: 16, zIndex: 10 }} />
                  <TextInput 
                    className="w-full bg-surface-container-lowest border-0 rounded-xl py-4 pl-12 pr-4 text-on-surface font-body text-base"
                    placeholder="gourmet@tastetwin.ai"
                    placeholderTextColor="#353534"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => { setEmail(text); setError(null); }}
                  />
                </View>
              </View>

              <View className="space-y-1.5 mb-8">
                <View className="flex-row justify-between items-center ml-1 mb-2">
                  <Text className="text-xs font-label uppercase tracking-widest text-outline">Password</Text>
                  {!isSignUp && (
                    <TouchableOpacity>
                      <Text className="text-xs font-label text-primary">Forgot?</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View className="relative justify-center">
                  <MaterialIcons name="lock" size={20} color="#a48c7a" style={{ position: 'absolute', left: 16, zIndex: 10 }} />
                  <TextInput 
                    className="w-full bg-surface-container-lowest border-0 rounded-xl py-4 pl-12 pr-12 text-on-surface font-body text-base"
                    placeholder="••••••••••••"
                    placeholderTextColor="#353534"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => { setPassword(text); setError(null); }}
                  />
                  <TouchableOpacity 
                    className="absolute right-4 z-10"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#a48c7a" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Error Message */}
              {error && (
                <View className="bg-error-container/20 rounded-xl px-4 py-3 mb-4">
                  <Text className="text-red-400 font-body text-sm text-center">{error}</Text>
                </View>
              )}

              {/* CTA Button */}
              <TouchableOpacity 
                className="w-full bg-primary-container py-5 rounded-xl items-center shadow-lg shadow-primary/20 mb-6"
                onPress={isSignUp ? handleSignUp : handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#4d2600" />
                ) : (
                  <Text className="text-on-primary font-headline font-extrabold text-lg tracking-tight">
                    {isSignUp ? 'Create Account' : 'Sign in to Account'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer Link — Toggle Sign In / Sign Up */}
            <View className="flex-row justify-center mt-4">
              <Text className="font-body text-on-surface-variant text-sm">
                {isSignUp ? 'Already have an account? ' : 'New to the table? '}
              </Text>
              <TouchableOpacity onPress={() => { setIsSignUp(!isSignUp); setError(null); }}>
                <Text className="text-secondary font-bold ml-1 text-sm">
                  {isSignUp ? 'Sign in' : 'Create your profile'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Legal / Fine Print */}
            <View className="pt-12 items-center pb-8">
              <Text className="text-[10px] font-label uppercase tracking-widest text-outline text-center opacity-60">
                By entering, you agree to our Terms of Service & Privacy Policy
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
