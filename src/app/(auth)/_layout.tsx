import { Stack } from 'expo-router';


export default () =>
  <Stack screenOptions={{ headerShown: false, }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="welcome" />
    <Stack.Screen name="Question1Screen" />
    <Stack.Screen name="Question2Screen" />
    <Stack.Screen name="Question3Screen" />
  </Stack>