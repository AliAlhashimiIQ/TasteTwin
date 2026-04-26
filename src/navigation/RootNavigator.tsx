import React, { useState, useEffect } from 'react';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { supabase } from '../lib/supabase';
import { View, ActivityIndicator } from 'react-native';
import type { Session } from '@supabase/supabase-js';
import { AuthContext } from '../lib/AuthContext';

export const RootNavigator = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
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
