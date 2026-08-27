import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './ui';
import { colors } from '../theme';
import { toFa, range } from '../utils/fa';
import { phaseOf } from '@/utils/cycle';
 
export const PHASE_COLOR: any = {
  period: colors.periodRed,
  ovulation: colors.teal,
  pms: colors.orange,
  normal: '#C9CDD3',
};

export default function CycleRing({ cycleLength, periodLength, todayIndex, centerTitle, centerDate, size = 300 }: any) {
  const c = size / 2;
  const R = c - 18;
  const bubble = size * 0.55;
  const todayColor = PHASE_COLOR[phaseOf(todayIndex, cycleLength, periodLength)];

  return (
    <View style={{ width: size, height: size }}>
      {range(0, cycleLength - 1).map((i) => {
        const isToday = i === todayIndex;
        const d = isToday ? 30 : 7;
        const a = (i / cycleLength) * 2 * Math.PI - Math.PI / 2;
        return (
          <View key={i} style={[st.dot, {
            width: d, height: d, borderRadius: d / 2,
            backgroundColor: isToday ? todayColor : PHASE_COLOR[phaseOf(i, cycleLength, periodLength)],
            left: c + R * Math.cos(a) - d / 2,
            top: c + R * Math.sin(a) - d / 2,
          }]}>
            {isToday && <AppText style={st.todayNum}>{toFa(todayIndex + 1)}</AppText>}
          </View>
        );
      })}

      <View style={[st.center, { backgroundColor: todayColor, width: bubble, height: bubble, left: c - bubble / 2, top: c - bubble / 2 }]}>
        <AppText style={st.centerTitle}>{centerTitle}</AppText>
        <AppText style={st.centerDate}>{centerDate}</AppText>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  dot: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  todayNum: { color: '#fff', fontSize: 12, fontFamily: 'Vazirmatn-Bold' },
  center: { position: 'absolute', borderRadius: 999, alignItems: 'center', justifyContent: 'center', padding: 12 },
  centerTitle: { color: '#fff', fontFamily: 'Vazirmatn-Bold', fontSize: 14, textAlign: 'center' },
  centerDate: { color: '#fff', fontSize: 10, marginTop: 8 },
});