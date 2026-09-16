import { INavArrowsProps, NavArrows } from '@/components/NavArrows';
import { AppText, DayGrid, ProgressDots, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { range } from '@/utils/fa';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { numString } from '../myComponents/interfaces/types';


export default ({ nav, select }: IQuestionScreenProps) => {
    const [dur, setDur] = useState(25);
     const _set = (n: number) => {
        setDur(n)
        select!(n)
    }
    return (
        <View style={s.container}>
            <ScreenHeader title="سوالات سیکل پریودی"  />
            <ProgressDots step={1} total={3} />
            <ScrollView contentContainerStyle={s.body}>
                <AppText style={s.q}>پریود شما چند روز طول میکشد؟</AppText>
                <AppText style={s.hint}>یکی از روز های زیر را انتخاب کنید</AppText>
                <DayGrid days={range(1, 45)} selected={dur} onSelect={_set} />
            </ScrollView>
            <NavArrows {...nav} />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {},
    q: { fontFamily: 'Vazirmatn-Bold', fontSize: 15, textAlign: 'center', marginTop: 20 },
    hint: { color: colors.sub, fontSize: 11, textAlign: 'center', marginVertical: 10 },
});

export interface IQuestionScreenProps {
    nav: INavArrowsProps;
    select?: (d: numString) => void
}