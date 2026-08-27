import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';

const DocCard = ({ name, role }: any) => (
  <View style={s.doc}>
    <View style={s.docAvatar}><Ionicons name="person" size={26} color={colors.primary} /></View>
    <View>
      <AppText style={{ fontFamily: 'Vazirmatn-Bold', fontSize: 13, color: colors.cta }}>{name}</AppText>
      <AppText style={{ fontSize: 10, color: colors.sub, marginTop: 4 }}>{role}</AppText>
    </View>
  </View>
);

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="درباره ما" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={s.body}>
        <DocCard name="دکتر صغری برومند" role="متخصص زنان و زایمان" />
        <View style={s.card}>
          <AppText style={s.cardTitle}>درباره من</AppText>
          <AppText style={s.para}>
            متخصص زنان و زایمان با تمرکز بر سلامت قاعدگی و خودمراقبتی. هدف من توانمندسازی زنان با آگاهی‌رسانی علمی درباره چرخه قاعدگی، بهداشت دوره و خودارزیابی منظم است تا در صورت مشاهده هرگونه الگوی غیرطبیعی، به‌موقع با پزشک مشورت کنند.
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  body: { padding: 20 },
  doc: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12 },
  docAvatar: { width: 52, height: 52, borderRadius: 14, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16 },
  cardTitle: { fontFamily: 'Vazirmatn-Bold', fontSize: 13, marginBottom: 10 },
  para: { fontSize: 11, lineHeight: 22 },
});