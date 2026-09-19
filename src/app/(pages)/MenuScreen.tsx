import { AppText, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { toFa } from '@/utils/fa';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';


export default function MenuScreen() {
  const router = useRouter()

  const Item = ({ icon, label, route, danger }: { icon: any; label: string; route?: Href; danger?: boolean }) => (
    <TouchableOpacity style={s.item} onPress={() => !route ? router.replace('/(auth)/welcome') : router.navigate(route!)}>
      <Ionicons name={icon} size={18} color={danger ? colors.primary : colors.sub} />
      <AppText style={[s.label, danger && { color: colors.primary }]}>{label}</AppText>
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      <ScreenHeader title="منو" onBack={() => router.back()} />
      <View style={s.body}>
        <Item icon="create-outline" label="ویرایش پروفایل" route="/(pages)/EditProfileScreen" />
        <Item icon="sync-outline" label="سابقه سیکل" route="/(pages)/HistoryScreen" />
        <Item icon="information-circle-outline" label="درباره ما" route="/(pages)/AboutScreen" />
        <Item icon="call-outline" label="تماس با ما" route="/(pages)/ContactScreen" />
        <Item icon="log-out-outline" label="خروج" danger />
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