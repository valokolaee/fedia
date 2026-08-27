import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './ui';
import { colors } from '../theme';
import { toFa } from '../utils/fa';

export const Field = ({ label, icon, ...p }: any) => (
  <View style={s.field}>
    <AppText style={s.label}>{label}</AppText>
    <View style={s.inputRow}>
      <TextInput placeholderTextColor={colors.sub} style={s.input} {...p} />
      {icon}
    </View>
  </View>
);

export const Dropdown = ({ placeholder, options, value, onChange, style }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity style={[s.box, style]} onPress={() => setOpen(true)}>
        <AppText style={!value ? { color: colors.sub, fontSize: 12 } : { fontSize: 12 }}>{value ? toFa(value) : placeholder}</AppText>
        <Ionicons name="chevron-down" size={16} color={colors.sub} />
      </TouchableOpacity>
      <Modal visible={open} transparent onRequestClose={() => setOpen(false)}>
        <View style={s.overlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setOpen(false)} />
          <View style={s.panel}>
            <FlatList
              data={options}
              keyExtractor={(o) => String(o)}
              renderItem={({ item }) => (
                <TouchableOpacity style={[s.item, item === value && s.itemOn]} onPress={() => { onChange(item); setOpen(false); }}>
                  <AppText style={{ fontSize: 13 }}>{toFa(item)}</AppText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export const RadioRow = ({ options, value, onChange }: any) => (
  <View style={s.radioRow}>
    {options.map((o: string) => (
      <TouchableOpacity key={o} style={s.radioOpt} onPress={() => onChange(o)}>
        <AppText style={{ fontSize: 12, color: value === o ? colors.primary : colors.ink }}>{o}</AppText>
        <View style={[s.radio, value === o && s.radioOn]}>
          {value === o && <View style={s.radioDot} />}
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export const Button = ({ label, onPress, color = colors.cta, disabled, style }: any) => (
  <TouchableOpacity disabled={disabled} style={[s.btn, { backgroundColor: color }, disabled && { opacity: .45 }, style]} onPress={onPress}>
    <AppText style={s.btnText}>{label}</AppText>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  field: { marginBottom: 14 },
  label: { fontSize: 12, marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: '#FBFBFC', paddingHorizontal: 12 },
  input: { flex: 1, height: 44, fontSize: 13, color: colors.ink, fontFamily: 'Vazirmatn-Regular' },
  box: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: '#FBFBFC', paddingHorizontal: 12, height: 44 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,.3)', justifyContent: 'center', padding: 24 },
  panel: { backgroundColor: '#fff', borderRadius: 14, maxHeight: 260, overflow: 'hidden' },
  item: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  itemOn: { backgroundColor: colors.primarySoft },
  radioRow: { flexDirection: 'row', justifyContent: 'space-between' },
  radioOpt: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#C9CED4', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  btn: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontFamily: 'Vazirmatn-Bold', fontSize: 14 },
});