import CIconGenerator from '@/components/myComponents/CIconGenerator';
import SVGstor from '@/components/myComponents/CIconGenerator/SVGstor';
import { AppText, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { toFa } from '@/utils/fa';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SYMPTOMS = [
  { icon: 'drop', label: 'خونریزی', value: 'کم' },
  { icon: 'flame', label: 'درد قاعدگی', value: 'درد شدید' },
  { icon: 'body-outline', label: 'ناحیه درد', value: 'زیر شکم' },
  { icon: 'fitness-outline', label: 'علائم جسمی', value: 'درد عضلات' },
  { icon: 'sad-outline', label: 'خلق و خوی شما', value: 'غمگین' },
  { icon: 'close', label: 'اختلال در میزان فعالیت روزانه', value: 'اصلاً' },
];
const RECORDS = [
  { id: '1', range: '۲۲ تیر - ۲۷ تیر', cycle: 20 },
  { id: '2', range: '۲۶ خرداد - ۳۱ خرداد', cycle: 21 },
  { id: '3', range: '۱ مرداد - ۶ مرداد', cycle: 19 },
  { id: '4', range: '۴ تیر - ۹ تیر', cycle: 22 },
];

export default function HistoryScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <ScreenHeader title="سابقه سیکل" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={s.body}>
        <View style={s.userCard}>
          <View style={s.avatar}>
            <Ionicons name="person" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={{ fontSize: 10, color: colors.sub }}>سلام !</AppText>
            <AppText style={{ fontFamily: 'Vazirmatn-Bold', fontSize: 13 }}>مریم علیزاده</AppText>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}><Ionicons name="create-outline" size={18} color={colors.ink} /></TouchableOpacity>
        </View>

        <View style={s.stats}>
          <View style={s.stat}>
            <View style={s.statIcon}><Ionicons name="sync-outline" size={16} color={colors.primary} /></View>
            <View><AppText style={s.statVal}>{toFa(28)} روز</AppText><AppText style={s.statLabel}>دوره ی پریود</AppText></View>
          </View>
          <View style={s.stat}>
            <View style={s.statIcon}>
            <CIconGenerator xml={SVGstor.mobile}/>
              {/* <Ionicons name="drop-outline" size={16} color={colors.primary} /> */}
            </View>
            <View><AppText style={s.statVal}>{toFa(5)} روز</AppText><AppText style={s.statLabel}>طول پریود</AppText></View>
          </View>
        </View>

        <View style={s.lastCard}>
          <AppText style={{ fontSize: 11 }}>آخرین تاریخ پریودی شما</AppText>
          <AppText style={{ fontSize: 11, color: colors.sub }}>{toFa('1402/02/06')}</AppText>
        </View>

        <View style={s.symCard}>
          <View style={s.symHead}>
            <AppText style={{ fontFamily: 'Vazirmatn-Bold', fontSize: 12 }}>علائم امروز شما</AppText>
            <TouchableOpacity style={s.addLink} onPress={() => navigation.navigate('AddSymptoms')}>
              <Ionicons name="add" size={14} color={colors.teal} />
              <AppText style={{ fontSize: 10, color: colors.teal }}>افزودن علامت جدید</AppText>
            </TouchableOpacity>
          </View>
          {SYMPTOMS.map(r => (
            <View key={r.label} style={s.row}>
              <View style={s.badge}>
              <CIconGenerator xml={SVGstor.bottomNav.articles}/>
              </View>
              <AppText style={s.rowLabel}>{r.label}</AppText>
              <View style={{ flex: 1 }} />
              <AppText style={s.rowValue}>{r.value}</AppText>
            </View>
          ))}
        </View>

        {RECORDS.map(r => (
          <View key={r.id} style={s.recCard}>
            <View>
              <AppText style={{ fontSize: 11, fontFamily: 'Vazirmatn-Bold' }}>{r.range}</AppText>
              <View style={s.timeline}><View style={s.timelineDot} /></View>
            </View>
            <AppText style={{ fontSize: 12, color: colors.sub }}>{toFa(r.cycle)}</AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 16 },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.card, borderRadius: 12, padding: 14 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stats: { flexDirection: 'row', gap: 10, marginVertical: 12 },
  stat: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.card, borderRadius: 12, padding: 14 },
  statIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  statVal: { fontFamily: 'Vazirmatn-Bold', fontSize: 13 },
  statLabel: { fontSize: 9, color: colors.sub, marginTop: 3 },
  lastCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12 },
  symCard: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12 },
  symHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg, borderRadius: 10, padding: 12, marginBottom: 8 },
  badge: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontSize: 10, marginStart: 10 },
  rowValue: { fontSize: 10, color: colors.sub },
  recCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  timeline: { height: 4, borderRadius: 2, backgroundColor: colors.primarySoft, width: 160, marginTop: 8, justifyContent: 'center' },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginStart: 60 },
});