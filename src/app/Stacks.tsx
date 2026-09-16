import { Spacing } from '@/constants/theme';
import { Stack } from 'expo-router';





export default () =>
  <Stack screenOptions={{ headerShown: false, contentStyle: {  } }} >
    <Stack.Screen name="(auth)" />
    <Stack.Screen name="(main)" />
    <Stack.Screen name="+not-found" />
  </Stack>

