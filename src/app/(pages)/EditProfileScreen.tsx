import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { AppText, ScreenHeader } from '@/components/ui';
import { Button, Dropdown, Field, RadioRow } from '@/components/Form';
import { MONTHS, range } from '@/utils/fa';



export default function EditProfileScreen({ navigation, route }: any) {
  const [f, setF] = useState<any>({ first: '', last: '', phone: '', marital: '', day: null, month: null, year: null, ...route?.params });
  const set = (k: string) => (v: any) => setF((p: any) => ({ ...p, [k]: v }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <ScreenHeader title="ویرایش پروفایل" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
        <Field label="نام" placeholder="نام خود را وارد کنید" value={f.first} onChangeText={set('first')} />
        <Field label="نام خانوادگی" placeholder="نام خانوادگی خود را وارد کنید" value={f.last} onChangeText={set('last')} />
        <Field label="شماره موبایل" keyboardType="phone-pad" placeholder="0911 *** ***" value={f.phone} onChangeText={set('phone')}
          icon={<Ionicons name="phone-portrait-outline" size={18} color={colors.sub} />} />
        <AppText style={s.label}>وضعیت تاهل</AppText>
        <RadioRow options={['مجرد', 'متاهل', 'بیوه', 'مطلقه']} value={f.marital} onChange={set('marital')} />
        <AppText style={[s.label, { marginTop: 18 }]}>تاریخ تولد</AppText>
        <View style={s.dobRow}>
          <Dropdown placeholder="روز" options={range(1, 31)} value={f.day} onChange={set('day')} style={s.dobBox} />
          <Dropdown placeholder="ماه" options={MONTHS} value={f.month} onChange={set('month')} style={s.dobBox} />
          <Dropdown placeholder="سال" options={range(1340, 1390)} value={f.year} onChange={set('year')} style={s.dobBox} />
        </View>
        <Button label="ثبت ویرایش" style={{ marginTop: 24 }} onPress={() => navigation.goBack()} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({ body: { padding: 20 }, label: { fontSize: 12, marginBottom: 8 }, dobRow: { flexDirection: 'row', gap: 8 }, dobBox: { flex: 1 } });