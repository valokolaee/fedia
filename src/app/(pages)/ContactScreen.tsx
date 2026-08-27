import { AppText, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';


const InfoRow = ({ icon, label, value }: any) => (
  <View style={s.row}>
    <AppText style={s.rowLabel}>{label}</AppText>
    <View style={{ flex: 1 }} />
    <AppText style={s.rowValue}>{value}</AppText>
    <Ionicons name={icon} size={16} color={colors.sub} style={{ marginStart: 8 }} />
  </View>
);

export default function ContactScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="تماس با ما" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={s.body}>
        <InfoRow icon="mail-outline" label="آدرس ایمیل" value="Example@gmail.com" />
        <InfoRow icon="keypad-outline" label="شماره تماس" value="۰۹۱۱ ۵۴۴ ۲۳ ۵۴" />

        <View style={s.card}>
          <AppText style={{ fontSize: 11 }}>از طریق راه های ارتباطی زیر با ما باشید</AppText>
          <View style={s.socials}>
            {['send-outline', 'logo-youtube', 'logo-whatsapp', 'chatbubble-ellipses-outline'].map(ic => (
              <View key={ic} style={s.social}>
                <Ionicons name={ic} size={18} color={colors.primary} /></View>
            ))}
          </View>
        </View>

        <View style={s.logo}><AppText style={{ color: colors.sub, fontSize: 12 }}>Logo</AppText></View>

        <View style={s.card}>
          <AppText style={s.cardTitle}>درباره اپلیکیشن ما</AppText>
          <AppText style={s.para}>
            اپلیکیشن ما با هدف آگاهی‌بخشی و توانمندسازی زنان در زمینه سلامت قاعدگی طراحی شده است؛ با ردیابی چرخه، ثبت علائم روزانه و مقالات تخصصی به شما کمک می‌کند الگوی بدن خود را بشناسید و در صورت نیاز به‌موقع با پزشک مشورت کنید.
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  body: { padding: 20 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  rowLabel: { fontSize: 11, color: colors.sub },
  rowValue: { fontSize: 12 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginTop: 8 },
  socials: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 14 },
  social: { width: 46, height: 46, borderRadius: 12, borderWidth: 1, borderColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 90, height: 90, borderRadius: 14, backgroundColor: '#DFDFDF', alignSelf: 'center', marginVertical: 20, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontFamily: 'Vazirmatn-Bold', fontSize: 13, marginBottom: 10 },
  para: { fontSize: 11, lineHeight: 22, color: colors.ink },
});