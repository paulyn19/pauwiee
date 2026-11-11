import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './AppContext';
import HomeTab from './HomeTab';
import SettingsTab from './SettingsTab';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}