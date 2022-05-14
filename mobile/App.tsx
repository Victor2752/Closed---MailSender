import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import { theme } from './src/theme';
import FeedbackWidget from './src/components/FeedbackWidget';
import { useCallback, useEffect, useState } from 'react';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View 
      style={{flex: 1, backgroundColor: theme.colors.background,}}
      onLayout={onLayoutRootView}
    >
      <StatusBar
        style="light"
        backgroundColor='transparent'
        translucent
      />

      <FeedbackWidget />
    </View>
  );
}