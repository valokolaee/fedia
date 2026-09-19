import { Button } from '@/components/Form';
import { AppText, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { useRoute, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


export default function CommentScreen( ) {
  const router=useRouter()
  const [msg, setMsg] = useState('');
  return (
    <View style={s.container}>
      <ScreenHeader title="ثبت نظر شما برای این مقاله" onBack={() => router.back()} />
      <View style={s.body}>
        <AppText style={s.label}>پیام</AppText>
        <TextInput multiline textAlignVertical="top" style={s.area} value={msg} onChangeText={setMsg} placeholder="متن پیام خود را وارد کنید" placeholderTextColor={colors.sub} />
        <Button label="ثبت نظر" color="#8B85D9" disabled={!msg.trim()} onPress={() => router.back()} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  body: { padding: 20 },
  label: { fontSize: 12, marginBottom: 8 },
  area: { height: 130, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, fontSize: 12, fontFamily: 'Vazirmatn-Regular', marginBottom: 16, backgroundColor: colors.bg },
});