import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Force RTL for the app if not already done
I18nManager.forceRTL(true);

const NotFoundScreen = () => (
  <View style={styles.container}>
    <Text style={styles.emoji}>🌸</Text>
    <Text style={styles.title}>صفحه پیدا نشد!</Text>
    <Text style={styles.subtitle}>نگران نباش، می‌تونیم برگردیم به مسیر اصلی.</Text>

    <TouchableOpacity
      style={styles.primaryBtn}
      onPress={() => navigation.navigate('Dashboard')}
    >
      <Text style={styles.primaryBtnText}>بازگشت به داشبورد سیکل</Text>
    </TouchableOpacity>
  </View>
);

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#FDF2F8' }, // Pink-50
  emoji: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 30, lineHeight: 26 },
  primaryBtn: { backgroundColor: '#9333EA', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 50 }, // Purple-600
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});