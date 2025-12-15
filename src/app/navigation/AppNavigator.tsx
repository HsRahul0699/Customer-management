/**
 * App Navigator
 * Defines all navigation screens and routes
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomersScreen from '../screens/CustomersScreen';
import { colors } from '../utils/colors/colors';

export type RootStackParamList = {
  Customers: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Customers"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.blue.blue1,
          },
          headerTintColor: colors.white.white1,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Customers"
          component={CustomersScreen}
          options={{
            headerShown: false,
            title: 'Zeller Customers',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
