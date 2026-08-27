import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addDays, jsToJalali } from '@/utils/cycle';
import { colors } from '@/theme';
import { AppText, NavArrows, OptionRow, ProgressDots, ScreenHeader } from '@/components/ui';
import { MONTHS, toFa } from '@/utils/fa';


const WEEK = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
const Badge = ({ name }: any) => <Ionicons name={name} size={14} color="#fff" />;

/* ---------- Jalali week strip ---------- */
function CalendarStrip({ selected, onSelect }: any) {
  const [offset, setOffset] = useState(0);
  const today = new Date();
  const start = addDays(today, -((today.getDay() + 1) % 7) + offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const mid = jsToJalali(days[3]);

  return (
    <View style={cs.wrap}>
      <View style={cs.head}>
        <View style={cs.arrows}>
          <TouchableOpacity onPress={() => setOffset(o => o - 1)}><Ionicons name="chevron-back" size={16} color={colors.sub} /></TouchableOpacity>
          <TouchableOpacity onPress={() => setOffset(o => o + 1)}><Ionicons name="chevron-forward" size={16} color={colors.sub} /></TouchableOpacity>
        </View>
        <AppText style={cs.month}>{MONTHS[mid.jm - 1]}</AppText>
      </View>
      <View style={cs.row}>
        {days.map((d, i) => {
          const j = jsToJalali(d);
          const active = d.toDateString() === selected.toDateString();
          return (
            <TouchableOpacity key={i} style={cs.day} onPress={() => onSelect(d)}>
              <View style={[cs.num, active && cs.numOn]}>
                <AppText style={{ fontSize: 12, color: active ? colors.primary : colors.ink, fontFamily: active ? 'Vazirmatn-Bold' : 'Vazirmatn-Regular' }}>
                  {toFa(j.jd)}
                </AppText>
              </View>
              <AppText style={cs.name}>{WEEK[i]}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/* ---------- option sets (match Figma #3/#4) ---------- */
const BLEEDING = [
  { label: 'ندارم', icon: 'close' }, { label: 'لکه بینی', icon: 'sparkles' },
  { label: 'کم', icon: 'drop' }, { label: 'متوسط', icon: 'drop' }, { label: 'زیاد', icon: 'drop' },
];
const PAIN = [
  { label: 'ندارم', icon: 'close' }, { label: 'خفیف', icon: 'flame-outline' },
  { label: 'متوسط', icon: 'flame-outline' }, { label: 'شدید', icon: 'flame' }, { label: 'خیلی شدید', icon: 'flash' },
];
const AREA = [
  { label: 'زیر شکم', icon: 'body-outline' }, { label: 'کمر', icon: 'body-outline' },
  { label: 'هر دو', icon: 'body-outline' }, { label: 'ناحیه لگن', icon: 'body-outline' },
  { label: 'پراکنده', icon: 'shuffle' }, { label: 'ندارم', icon: 'close' },
];
const PHYSICAL = [
  { label: 'سردرد', icon: 'alert-circle-outline' }, { label: 'تهوع', icon: 'restaurant-outline' },
  { label: 'خستگی', icon: 'bed-outline' }, { label: 'حساسیت سینه', icon: 'heart-outline' },
  { label: 'کمردرد', icon: 'body-outline' }, { label: 'ورم شکم', icon: 'expand-outline' },
  { label: 'اختلال خواب', icon: 'moon-outline' }, { label: 'اختلال اشتها', icon: 'restaurant-outline' },
  { label: 'درد عضلات', icon: 'fitness-outline' }, { label: 'درد معده', icon: 'flame-outline' },
  { label: 'گرگرفتگی', icon: 'thermometer-outline' }, { label: 'تغییر میل جنسی', icon: 'heart' },
  { label: 'اسهال یا یبوست', icon: 'water-outline' }, { label: 'تغییر در ترشحات واژینال', icon: 'drop-outline' },
  { label: 'هیچکدام', icon: 'close' },
];
const MOOD = [
  { label: 'خوب', icon: 'happy-outline' },
  { label: 'معمولی', icon: 'meh-outline' },
  { label: 'تحریک‌پذیر', icon: 'angry-outline' },
  { label: 'غمگین', icon: 'sad-outline' },
  { label: 'مضطرب', icon: 'alert-circle-outline' },
  { label: 'حساسیت عاطفی', icon: 'heart-outline' },
];

const ACTIVITY = [
  { label: 'اصلاً', icon: 'close' },
  { label: 'کم', icon: 'trending-down' },
  { label: 'متوسط', icon: 'remove-outline' },
  { label: 'زیاد', icon: 'trending-up' },
  { label: 'خیلی زیاد', icon: 'flash' },
];
const Single = ({ q, options, value, onChange }: any) => (
  <View>
    <AppText style={st.q}>{q}</AppText>
    {options.map((o: any) => (
      <OptionRow key={o.label} label={o.label} selected={value === o.label} onPress={() => onChange(o.label)} icon={<Badge name={o.icon} />} />
    ))}
  </View>
);

/* ---------- screen ---------- */
export default function AddSymptomsScreen({ navigation }: any) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(new Date());
  const [bleeding, setBleeding] = useState<string | null>(null);
  const [pain, setPain] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [physical, setPhysical] = useState<string[]>([]);
  const [mood, setMood] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);

  const togglePhysical = (label: string) =>
    setPhysical(prev => {
      if (label === 'هیچکدام') return prev[0] === 'هیچکدام' ? [] : ['هیچکدام'];
      const base = prev.filter(x => x !== 'هیچکدام');
      return base.includes(label) ? base.filter(x => x !== label) : [...base, label];
    });

  const save = () => {
    const record = { date: date.toISOString(), bleeding, pain, area, physical, mood, activity };
    // TODO: persist → AsyncStorage / your API / context
    console.log('symptom record:', record);
    navigation.goBack();
  };

  return (
    <View style={st.container}>
      <ScreenHeader title="افزودن علائم" onBack={() => navigation.goBack()} />
      <CalendarStrip selected={date} onSelect={setDate} />

      <ScrollView contentContainerStyle={st.body} showsVerticalScrollIndicator={false}>
        {step === 1 && <Single q="آیا امروز خونریزی دارید؟" options={BLEEDING} value={bleeding} onChange={setBleeding} />}
        {step === 2 && <Single q="آیا امروز درد قاعدگی دارید؟" options={PAIN} value={pain} onChange={setPain} />}
        {step === 3 && <Single q="درد در کدام ناحیه است؟" options={AREA} value={area} onChange={setArea} />}
        {step === 4 && (
          <View>
            <AppText style={st.q}>امروز کدام علائم جسمی را دارید؟</AppText>
            {PHYSICAL.map(o => (
              <OptionRow key={o.label} label={o.label} selected={physical.includes(o.label)} onPress={() => togglePhysical(o.label)} icon={<Badge name={o.icon} />} />
            ))}
          </View>
        )}
        {step === 5 && <Single q="امروز چه خلق و خویی دارید؟" options={MOOD} value={mood} onChange={setMood} />}
        {step === 6 && <Single q="اختلال در میزان فعالیت روزانه شما چقدر است؟" options={ACTIVITY} value={activity} onChange={setActivity} />}
      </ScrollView>

      <View style={st.footer}>
        <View style={{ flex: 1 }}><ProgressDots step={step} total={6} /></View>
        <NavArrows
          onBack={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
          onNext={() => (step < 6 ? setStep(step + 1) : save())} />
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  body: { padding: 20, paddingBottom: 10 },
  q: { fontFamily: 'Vazirmatn-Bold', fontSize: 14, textAlign: 'center', marginVertical: 16 },
  footer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
});

const cs = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 8 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  arrows: { flexDirection: 'row', gap: 14 },
  month: { fontFamily: 'Vazirmatn-Bold', fontSize: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  day: { alignItems: 'center', gap: 4 },
  num: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  numOn: { backgroundColor: colors.primarySoft },
  name: { fontSize: 8, color: colors.sub },
});