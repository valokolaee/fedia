

import CIconGenerator from '@/components/myComponents/CIconGenerator';
import SVG from '@/components/myComponents/CIconGenerator/SVGstor';
import { colors } from '@/theme';
 import { Tabs } from 'expo-router';
const SVGstor = SVG.bottomNav



const _iconSize = undefined;
export default function () {
  // const colorScheme = useColorScheme();
  // const backgroundColor = useThemeColor({}, 'background');


  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // header(props) { return <Header /> },
        // tabBarButton: HapticTab,
        // tabBarBackground: BlurTabBarBackground,
        // sceneStyle: { paddingHorizontal: defaultPadding, backgroundColor, },
        // tabBarStyle: [{ borderWidth: 1 }],
        tabBarActiveTintColor: colors.primary

      }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'سیکل',
          tabBarIcon: ({ color }) => <CIconGenerator xml={SVGstor.cycle} color={color.toString()} size={_iconSize} />,
        }}
      />

      <Tabs.Screen
        name="PregnancyScreen"
        options={{
          title: 'بارداری', tabBarIcon: ({ color }) => <CIconGenerator xml={SVGstor.pregnancy} color={color.toString()} size={_iconSize} />,
        }}
      />
      <Tabs.Screen
        name="TipsScreen"
        options={{
          title: 'نکات امروز', tabBarIcon: ({ color }) => <CIconGenerator xml={SVGstor.pointsOfDay} color={color.toString()} size={_iconSize} />,
        }}
      />

      <Tabs.Screen
        name="ArticlesScreen"
        options={{
          title: 'مقالات',
          tabBarIcon: ({ color }) => <CIconGenerator xml={SVGstor.articles} color={color.toString()} size={_iconSize} />,
        }}
      />





    </Tabs>

  );
}
