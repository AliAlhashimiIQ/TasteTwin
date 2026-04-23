import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';

export const AuthContext = createContext({
  signIn: () => {},
  signOut: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authContext = React.useMemo(
    () => ({
      signIn: () => setIsAuthenticated(true),
      signOut: () => setIsAuthenticated(false),
      isAuthenticated,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
