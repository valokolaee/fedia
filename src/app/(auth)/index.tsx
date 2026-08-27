import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// 1. Prevent Expo from auto-hiding the native splash screen immediately
SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const router = useRouter();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 2. Simulate loading (e.g., checking auth state, loading fonts, or fetching initial data)
        // Replace this setTimeout with your actual async logic (e.g., await checkAuth())
        await new Promise((resolve) => setTimeout(resolve, 200));

        // 3. Navigate to the target screen
        router.replace('/(auth)/welcome');
      } catch (e) {
        console.warn("Error during splash screen preparation:", e);
        // Fallback navigation in case of error
        router.replace('/(auth)/welcome');
      } finally {
        // 4. Hide the native splash screen and mark app as ready
        await SplashScreen.hideAsync();
        setIsAppReady(true);
      }
    }

    prepare();

    // 5. Cleanup function to prevent memory leaks if component unmounts early
    return () => {
      // Cleanup logic if needed
    };
  }, []);

  // 6. Render a beautiful custom UI while transitioning
  if (!isAppReady) {
    return (
      <View style={styles.container}>
        {/* App Logo / Icon */}
        <Text style={styles.logo}>🌸</Text>

        {/* App Name in Persian */}
        <Text style={styles.title}>ردیاب سیکل</Text>

        {/* Loading Indicator matching your purple theme */}
        <ActivityIndicator size="large" color="#9333EA" style={styles.loader} />
      </View>
    );
  }

  // Return null after navigation to avoid rendering anything else
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF2F8', // Soft pink-50 background
  },
  logo: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9333EA', // Purple-600 (matches your primary CTA color)
    // fontFamily: 'Vazirmatn-Bold', // Uncomment if you have Vazirmatn loaded
  },
  loader: {
    marginTop: 32,
  },
});