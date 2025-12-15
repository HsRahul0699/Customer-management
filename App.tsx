/**
 * App Entry Point
 * Sets up providers and navigation
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import client from './src/app/graphql/client';
import AppNavigator from './src/app/navigation/AppNavigator';
import { colors } from './src/app/utils/colors/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={colors?.white?.white1}
          />
          <AppNavigator />
        </SafeAreaProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

export default App;
