import { Button, Dropdown } from '@/components/Form';
import { AppText, ProgressDots, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { MONTHS, range } from '@/utils/fa';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';



export default function Question3Screen( ) {
    const [d, setD] = useState<any>({ day: null, month: null, year: null });
    const done = d.day && d.month && d.year;
      const router = useRouter();

    return (
        <View style={s.container}>
            <ScreenHeader title="سوالات سیکل پریودی" onBack={() => router.back()} />
            <ProgressDots step={3} total={3} />
            <View style={s.body}>
                <AppText style={s.q}>آخرین تاریخ پریودی شما چه زمانی بود؟</AppText>
                <Dropdown placeholder="سال" options={range(1390, 1405)} value={d.year} onChange={(v: any) => setD((p: any) => ({ ...p, year: v }))} />
                <Dropdown placeholder="ماه" options={MONTHS} value={d.month} onChange={(v: any) => setD((p: any) => ({ ...p, month: v }))} />
                <Dropdown placeholder="روز" options={range(1, 31)} value={d.day} onChange={(v: any) => setD((p: any) => ({ ...p, day: v }))} />
            </View>

            <View style={s.footer}>
                <TouchableOpacity style={s.backCircle} onPress={() => router.back()}>
                    <Ionicons name="arrow-forward" size={17} color="#777" />
                </TouchableOpacity>
                <Button label="ثبت نهایی" color={colors.success} disabled={!done} style={{ flex: 1 }}
                onPress={() => router.replace('/(main)/home')}
                />
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.card },
    body: { padding: 20, gap: 12 },
    q: { fontFamily: 'Vazirmatn-Bold', fontSize: 15, textAlign: 'center', marginVertical: 24 },
    footer: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16 },
    backCircle: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: '#9AA0A6', alignItems: 'center', justifyContent: 'center' },
});