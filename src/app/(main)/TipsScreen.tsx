import UserHeader from '@/components/UserHeader';
import CIconGenerator from '@/components/myComponents/CIconGenerator';
import SVGstor from '@/components/myComponents/CIconGenerator/SVGstor';
import { AppText } from '@/components/ui';
import { colors } from '@/theme';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';



const tipsIcon = SVGstor.tips;

const TIPS = [
  { title: 'ورزش در چرخه قاعدگی', color: '#6E68D1', bg: '#EBEAFB', icon: tipsIcon.sport },
  { title: 'روز سیکل ۷', color: '#F4587A', bg: '#FDEAEE', icon: tipsIcon.belly },
  { title: 'کدام دمنوش برای درد قاعدگی مفید است؟', color: '#2EC4C6', bg: '#E4F8F8', icon: tipsIcon.heart },
  { title: 'کمبود آهن در زنان چرا شایع است؟', color: '#7BA23F', bg: '#EFF5E4', icon: tipsIcon.pile },
  { title: 'ذهن و بدن چه ارتباطی دارند؟', color: '#5CB85C', bg: '#E9F6E9', icon: tipsIcon.brain },
  { title: 'آیا بدن در هر دوره غذایی متفاوت می‌خواهد؟', color: '#B75BC4', bg: '#F6E8F8', icon: tipsIcon.bowl },
];



export default function TipsScreen({ navigation }: any) {
  var { width } = useWindowDimensions();
  width = width / 2.3
  return (
    <View style={s.container}>
      <UserHeader onMenu={() => navigation.navigate('Menu')} />
      <ScrollView contentContainerStyle={s.body}>
        <View style={s.grid}>
          {TIPS.map(t => (
            <View key={t.title} style={[s.card, { width, height: width, borderWidth: 1, borderColor: t.color },]}>
              <View style={{ position: 'absolute', borderWidth: 0, bottom: 0, right: 0 }} >

                <View style={{ position: 'absolute', top: '-15%', right: '20%' }} >
                  <CIconGenerator xml={tipsIcon.star4} size={5} color={t.color + 70} />
                </View>
                <View style={{ position: 'absolute', right: '35%', top: '-10%' }} >
                  <CIconGenerator xml={tipsIcon.star4} size={10} color={t.color + 70} />
                </View>
                <CIconGenerator xml={tipsIcon.flower} size={80} color={t.color + 70} />
              </View>
              <View style={[s.top, { backgroundColor: t.color + 70, borderWidth: 1, borderColor: t.color }]}>
                <CIconGenerator xml={t.icon} size={35} />
              </View>
              <AppText style={s.text}>{t.title}</AppText>

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, },
  body: { padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 30, padding: 8, alignItems: 'center', marginBottom: 14, overflow: 'hidden' },
  top: { width: '100%', height: '40%', borderRadius: 50, alignItems: 'center', justifyContent: 'center', },
  pill: { width: 86, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 10, textAlign: 'center', marginTop: 10, lineHeight: 18 },

});