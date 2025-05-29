import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import FitnessDashboard from './components/screens/FitnessDashboard';
import SettingsScreen from './components/screens/SettingsScreen';

import { ThemeProvider, ThemeContext } from './ThemeContext';

const Tab = createBottomTabNavigator();

function AppTabs() {
  const { darkMode } = useContext(ThemeContext);
  const tabStyles = getTabBarStyles(darkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: tabStyles.activeTintColor,
        tabBarInactiveTintColor: tabStyles.inactiveTintColor,
        tabBarStyle: tabStyles.tabBarStyle,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Exercise') iconName = 'barbell-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Exercise" component={FitnessDashboard} />
      {/* <Tab.Screen name="Food" component={FoodSummaryScreen} /> */}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const getTabBarStyles = (darkMode) => ({
  activeTintColor: darkMode ? '#C7F90D' : '#000000',
  inactiveTintColor: darkMode ? '#888' : '#666',
  tabBarStyle: {
    backgroundColor: darkMode ? '#111' : '#fff',
    borderTopColor: darkMode ? '#222' : '#ccc',
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
