import React, { useState, useEffect, useRef } from 'react';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { supabase } from '../lib/supabase';
import { View, ActivityIndicator } from 'react-native';
import type { Session } from '@supabase/supabase-js';
import { AuthContext } from '../lib/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_DONE_KEY = 'tastetwin.onboarding_complete';

export const RootNavigator = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Ref to the MainStack navigator — used to navigate to Preferences on first login
  const mainStackRef = useRef<any>(null);

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        const previousSession = session;

        // Detect new sign-up: going from no session → has session
        if (!previousSession && newSession) {
          const isDone = await AsyncStorage.getItem(ONBOARDING_DONE_KEY);
          if (!isDone) {
            // First-time login → will show Preferences after MainStack mounts
            // We set a flag that MainStack reads to do the redirect
            await AsyncStorage.setItem('tastetwin.needs_preferences', 'true');
          }
        }

        setSession(newSession);
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const authContext = {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    signOut,
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#131313', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffb77d" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {session ? <MainStack /> : <AuthStack />}
    </AuthContext.Provider>
  );
};
