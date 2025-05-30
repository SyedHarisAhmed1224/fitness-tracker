import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FitnessDashboard from '../screens/FitnessDashboard';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomStackNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={FitnessDashboard} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
