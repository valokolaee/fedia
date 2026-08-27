import { AppText, DayGrid, NavArrows, ProgressDots, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { range } from '@/utils/fa';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';


export default function Question2Screen() {
    const [dur, setDur] = useState(5);
    const router = useRouter();

    return (
        <View style={s.container}>
            <ScreenHeader title="سوالات سیکل پریودی" onBack={() => router.back()} />
            <ProgressDots step={1} total={3} />
            <ScrollView contentContainerStyle={s.body}>
                <AppText style={s.q}>پریود شما چند روز طول میکشد؟</AppText>
                <AppText style={s.hint}>یکی از روز های زیر را انتخاب کنید</AppText>
                <DayGrid days={range(1, 45)} selected={dur} onSelect={setDur} />
            </ScrollView>
            <NavArrows onBack={() => router.back()}
                // onNext={() => navigation.navigate('Question3', { ...route?.params, duration: dur })}
                onNext={() => router.navigate('/(auth)/Question2Screen')}
            />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.card, borderWidth: 0
    },
    body: {  },
    q: { fontFamily: 'Vazirmatn-Bold', fontSize: 15, textAlign: 'center', marginTop: 20 },
    hint: { color: colors.sub, fontSize: 11, textAlign: 'center', marginVertical: 10 },
});