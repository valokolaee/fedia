import { NavArrows } from '@/components/NavArrows';
import { AppText, DayGrid, ProgressDots, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { range } from '@/utils/fa';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IQuestionScreenProps } from './question1Screen';


export default ({nav,select }:IQuestionScreenProps)=> {
    const [dur, setDur] = useState(5);
     const _set = (n: number) => {
        setDur(n)
        select!(n)
    }
    return (
        <View style={s.container}>
            <ScreenHeader title="سوالات سیکل پریودی" onBack={nav.onBack} />
            <ProgressDots step={2} total={3} />
            <ScrollView contentContainerStyle={s.body}>
                <AppText style={s.q}>پریود شما چند روز طول میکشد؟</AppText>
                <AppText style={s.hint}>یکی از روز های زیر را انتخاب کنید</AppText>
                <DayGrid days={range(1, 15)} selected={dur} onSelect={_set} />
            </ScrollView>
            <NavArrows
                onBack={nav.onBack}
                onNext={nav.onNext}
            />
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.card },
    body: { padding: 20 },
    q: { fontFamily: 'Vazirmatn-Bold', fontSize: 15, textAlign: 'center', marginTop: 20 },
    hint: { color: colors.sub, fontSize: 11, textAlign: 'center', marginVertical: 10 },
});