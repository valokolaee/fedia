import { AnimatedSplashOverlay } from '@/components/animated-icon';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Stacks from './Stacks';


SplashScreen.preventAutoHideAsync();
I18nManager.allowRTL(true)
I18nManager.forceRTL(true);

export default function TabLayout() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
    }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <AnimatedSplashOverlay />
        <Stacks />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
