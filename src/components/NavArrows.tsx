import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, } from '../theme';




export const NavArrows = ({ onBack, onNext }: INavArrowsProps) => (
  <View style={s.navRow}>
    <TouchableOpacity style={[s.navBtn]} onPress={onBack} disabled={!onBack}>
      <Ionicons name="arrow-forward" size={17} color="#777" /> 
    </TouchableOpacity>
    <TouchableOpacity style={[s.navBtn, { borderColor: colors.primary }]} onPress={onNext}>
      <Ionicons name="arrow-back" size={17} color={colors.primary} />  
    </TouchableOpacity>
  </View>
);

const s = StyleSheet.create({
 
  navRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, padding: 16 },
  navBtn: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: '#9AA0A6', alignItems: 'center', justifyContent: 'center' },
});


export interface INavArrowsProps {
  onBack?: () => void;
  onNext?: () => void;
}