// RootNavigator.js or directly in App.js

import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';  // Your auth screens stack
import AppTabs from './AppTabs';      // Your main app tabs

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // or get this from context/state/storage

  // Example: You can check AsyncStorage or context for auth status here

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="App" component={AppTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
