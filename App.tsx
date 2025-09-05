import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './src/screens/ChatScreen';
import MapScreen from './src/screens/MapScreen';
import HospitalsScreen from './src/screens/HospitalsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Hospitales" component={HospitalsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
