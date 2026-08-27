import { range, toFa } from '@/utils/fa';
import { Ionicons } from '@expo/vector-icons';
import { Key } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, } from '../theme';
import CIconGenerator from './myComponents/CIconGenerator';
import SVGstor from './myComponents/CIconGenerator/SVGstor';


export const AppText = ({ style, ...p }: any) => (
  <Text style={[{ color: colors.ink, fontFamily: 'Vazirmatn-Regular' }, style]} {...p} />
);

export const ScreenHeader = ({ title, onBack }: any) => (
  <View
    style={s.header}
  >
    <TouchableOpacity onPress={onBack}>
      {/* <Ionicons name="left`" /> */}
      <CIconGenerator xml={SVGstor.directions.leftChevron} color='black' />
    </TouchableOpacity>
    <AppText style={{ fontFamily: 'Vazirmatn-Bold' }}>{title}</AppText>
    <View />
  </View>
);

export const ProgressDots = ({ step, total }: any) => (
  <View style={s.dotsRow}>
    <AppText style={{ fontSize: 11, color: colors.sub }}>{toFa(`${step}/${total}`)}</AppText>
    {range(step, total).map(i => (
      <View key={i} style={[s.dot, i === step && s.dotOn]} />
    ))}
  </View>
);

export const DayGrid = ({ days, selected, onSelect }: any) => (
  <View style={s.grid}>
    {days.map((d: Key | null | undefined) => (
      <View key={d} style={s.cell}>
        <TouchableOpacity style={[s.chip, d === selected && s.chipOn]} onPress={() => onSelect(d)}>
          <AppText style={[{ fontSize: 13 }, d === selected && { color: '#fff', fontFamily: 'Vazirmatn-Bold' }]}>
            {toFa(d as number)}
          </AppText>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

export const OptionRow = ({ label, selected, onPress, icon }: any) => (
  <TouchableOpacity style={[s.option, selected && s.optionOn]} onPress={onPress}>
    <View style={[s.radio, selected && s.radioOn]}>
      {selected && <Ionicons name="checkmark" size={14} color={colors.primary} />}
    </View>
    <AppText style={[{ marginStart: 10, fontSize: 13 }, selected && { color: colors.primary }]}>{label}</AppText>
    <View style={{ flex: 1 }} />
    {icon && <View style={s.badge}>{icon}</View>}
  </TouchableOpacity>
);

export const NavArrows = ({ onBack, onNext }: any) => (
  <View style={s.navRow}>
    <TouchableOpacity style={[s.navBtn]} onPress={onBack}>
      <Ionicons name="arrow-forward" size={17} color="#777" /> 
    </TouchableOpacity>
    <TouchableOpacity style={[s.navBtn, { borderColor: colors.primary }]} onPress={onNext}>
      <Ionicons name="arrow-back" size={17} color={colors.primary} />  
    </TouchableOpacity>
  </View>
);

const s = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: colors.bg, borderWidth: 0
  },
  dotsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#F6CBD5' },
  dotOn: { width: 22, height: 6, backgroundColor: colors.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: '16.66%', alignItems: 'center', marginVertical: 6 },
  chip: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.chip, alignItems: 'center', justifyContent: 'center' },
  chipOn: { backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: .35, shadowRadius: 8, elevation: 4 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.chip, borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: 'transparent' },
  optionOn: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: '#C9CED4', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  radioOn: { borderColor: colors.primary },
  badge: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  navRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, padding: 16 },
  navBtn: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: '#9AA0A6', alignItems: 'center', justifyContent: 'center' },
});