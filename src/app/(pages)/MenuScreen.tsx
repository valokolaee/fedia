import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { toFa } from '@/utils/fa';


export default function MenuScreen({ navigation }: any) {
  const Item = ({ icon, label, route, danger }: any) => (
    <TouchableOpacity style={s.item} onPress={() =>
      route === 'Logout'
        ? navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] })
        : navigation.navigate(route)}>
      <Ionicons name={icon} size={18} color={danger ? colors.primary : colors.sub} />
      <AppText style={[s.label, danger && { color: colors.primary }]}>{label}</AppText>
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      <ScreenHeader title="منو" onBack={() => navigation.goBack()} />
      <View style={s.body}>
        <Item icon="create-outline" label="ویرایش پروفایل" route="EditProfile" />
        <Item icon="sync-outline" label="سابقه سیکل" route="History" />
        <Item icon="information-circle-outline" label="درباره ما" route="About" />
        <Item icon="call-outline" label="تماس با ما" route="Contact" />
        <Item icon="log-out-outline" label="خروج" route="Logout" danger />
      </View>
      <AppText style={s.version}>نسخه {toFa('1.8.7.1')}</AppText>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 20 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginBottom: 10 },
  label: { fontSize: 13 },
  version: { textAlign: 'center', color: colors.sub, fontSize: 10, marginVertical: 16 },
});