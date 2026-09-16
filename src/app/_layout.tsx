import { Bardiya, Kamran, Roya, Tejarat, Yas } from '@/assets/fonts/fonts';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
 import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Stacks from './Stacks';
import store from '@/redux/store';


SplashScreen.preventAutoHideAsync();
I18nManager.allowRTL(true)
I18nManager.forceRTL(true);
let persistor = persistStore(store);

export default function TabLayout() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
    }
  }, []);






  const [loaded] = useFonts({

    Bardiya: Bardiya.norm,
    Roya: Roya.norm,

    Kamran: Kamran.norm,
    Tejarat: Tejarat.norm,
    Yas: Yas.norm,


    BardiyaBold: Bardiya.bold,
    RoyaBold: Roya.bold,

    KamranBold: Kamran.bold,
    TejaratBold: Tejarat.bold,
    YasBold: Yas.bold,

  });

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AnimatedSplashOverlay />
            <Stacks />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}
