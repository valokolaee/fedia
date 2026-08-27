import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './ui';
import { colors } from '../theme';

export default function UserHeader({ name = 'مریم علیزاده', onMenu }: any) {
  return (
    <View style={s.header}>
      <View style={s.user}>
        <View style={s.avatar}><AppText style={{ color: '#fff', fontSize: 14 }}>م</AppText></View>
        <AppText style={{ fontFamily: 'Vazirmatn-Bold', fontSize: 13 }}>{name}</AppText>
      </View>
      <View style={s.icons}>
        <Ionicons name="headset-outline" size={20} color={colors.ink} />
        <TouchableOpacity onPress={onMenu}><Ionicons name="ellipsis-vertical" size={20} color={colors.ink} /></TouchableOpacity>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: colors.card },
  user: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  icons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
});