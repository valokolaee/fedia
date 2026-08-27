import CycleRing from '@/components/CycleRing';
import CIconGenerator from '@/components/myComponents/CIconGenerator';
import SVGstor from '@/components/myComponents/CIconGenerator/SVGstor';
import CText from '@/components/myComponents/CText';
import PeriodCard from '@/components/PeriodCardSvgBg';
// import PeriodCard from '@/components/PeriodCard';
import PeriodDateCard from '@/components/PeriodDateCard';
import { AppText } from '@/components/ui';
import { colors } from '@/theme';
import { addDays, daysBetween, faDate, faDateShort, jalaliToJs } from '@/utils/cycle';
import { toFa } from '@/utils/fa';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';


const Legend = ({ color, label }: any) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
    <AppText style={{ fontSize: 10, color: colors.sub }}>{label}</AppText>
  </View>
);

export default function HomeScreen({ navigation, route }: any) {
  const p = route?.params ?? {};
  const cycleLength = p.cycleLength ?? 28;
  const periodLength = p.duration ?? 5;
  const last = p.lastPeriod ?? { year: 1402, month: 4, day: 20 };

  const lastDate = jalaliToJs(last.year, last.month, last.day);
  const elapsed = Math.max(0, daysBetween(lastDate, new Date()));
  const todayIndex = elapsed % cycleLength;
  const nextDate = addDays(lastDate, (Math.floor(elapsed / cycleLength) + 1) * cycleLength);
  const daysToOv = (cycleLength - 14) - todayIndex;
  const daysToNext = cycleLength - todayIndex;
  const centerTitle = daysToOv > 0 ? `${toFa(daysToOv)} روز\nتا تخمک گذاری` : `${toFa(daysToNext)} روز\nتا پریود بعدی`;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View style={s.user}>
          <View style={s.avatar}><AppText style={{ color: '#fff', fontSize: 14 }}>م</AppText></View>
          <AppText style={{ fontFamily: 'Vazirmatn-Bold', fontSize: 13 }}>{`${p.first ?? 'مریم'} ${p.last ?? 'علیزاده'}`}</AppText>
        </View>
        <View style={s.headerIcons}>

          {/* <CIconGenerator xml={SVGstor.bloodDrop} /> */}

          <Ionicons name="headset-outline" size={20} color={colors.ink} />
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Ionicons name="ellipsis-vertical" size={20} color={colors.ink} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.body}>
        <PeriodCard lastPeriodDate="۲۰ تیر" nextPeriodDate="۲۰ مرداد" />
        {/* <PeriodDateCard lastPeriodDate="۲۰ تیر" nextPeriodDate="۲۰ مرداد" /> */}
        {/* <PeriodCard
          lastPeriod='u'
          nextPeriod='o'
        />
      */}
        {/* <View style={s.cards}>
          <View style={s.card}>
            <AppText style={s.cardBig}>{faDateShort(lastDate)}</AppText>
            <AppText style={s.cardSmall}>تاریخ آخرین پریود قبلی</AppText>
          </View>
          <View style={s.cardDrop}>
        
          </View>
          <View style={s.card}>
            <AppText style={s.cardBig}>{faDateShort(nextDate)}</AppText>
            <AppText style={s.cardSmall}>تاریخ پریود بعدی</AppText>
          </View>
        </View> */}

        <View style={s.legend}>
          <Legend color={colors.primary} label="پریودی" />
          <Legend color={colors.teal} label="تخمک گذاری" />
          <Legend color={colors.orange} label="PMS" />
        </View>

        <CycleRing cycleLength={cycleLength} periodLength={periodLength}
          todayIndex={todayIndex} centerTitle={centerTitle} centerDate={faDate(new Date())} />

        <View style={s.actions}>
        
          <TouchableOpacity style={s.actGhost} onPress={() => navigation.navigate('AddSymptoms')}>
            <CIconGenerator xml={SVGstor.plusCircle} size={50} />
            <CText style={{ fontSize: 12 }} text={'افزودن علائم امروز'} />            
          </TouchableOpacity>
        
          <TouchableOpacity style={s.actPrimary} onPress={() => navigation.navigate('EditPeriod')}>
            <CIconGenerator xml={SVGstor.bloodDropCircle} size={50} />
            <CText style={{ fontSize: 12 }} text={'ویرایش پریود'}/>
          </TouchableOpacity>
        
        </View>

        <View style={s.banner}>
          <Ionicons name="moon" size={15} color={colors.ink} />
          <AppText style={{ fontSize: 12 }}>{toFa(daysToNext)} روز مانده به دوره ی بعدی شما</AppText>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  user: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  body: { alignItems: 'center', padding: 20, paddingBottom: 30 },
  cards: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  card: { width: 135, backgroundColor: '#FBFBFC', borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  cardBig: { fontFamily: 'Vazirmatn-Bold', fontSize: 14 },
  cardSmall: { color: colors.sub, fontSize: 9, marginTop: 5 },
  cardDrop: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  legend: { flexDirection: 'row', gap: 16, marginVertical: 18 },
  actions: { flexDirection: 'row', gap: 12, marginVertical: 20 },
  actPrimary: {   gap: 6,   borderRadius: 999, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center' },
  actGhost: {  gap: 6,   borderRadius: 999, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center' },
  banner: { flexDirection: 'row', gap: 8, backgroundColor: colors.primarySoft, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center' },
});