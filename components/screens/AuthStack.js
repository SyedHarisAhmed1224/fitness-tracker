// AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './LoginSignUp';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="App" component={AppTabs} />
    </Stack.Navigator>
  );
}
