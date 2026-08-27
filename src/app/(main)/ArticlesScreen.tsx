import { AppText } from '@/components/ui';
import UserHeader from '@/components/UserHeader';
import { Spacing } from '@/constants/theme';
import { colors } from '@/theme';
import { toFa } from '@/utils/fa';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';


export const ARTICLES = [
  {
    id: '1', title: 'روز جهانی بهداشت قاعدگی چیست و چرا مهم است؟', minutes: 3, category: 'پریود',
    body: [
      'روز جهانی بهداشت قاعدگی هر سال در ۲۸ می برگزار می‌شود و توجه ما را به اهمیت آگاهی درباره قاعدگی، دسترسی به امکانات بهداشتی و شکستن تابوهای مرتبط با آن جلب می‌کند.',
      'قاعدگی بخشی طبیعی از بدن است، اما تجربه آن فقط به جسم محدود نمی‌شود؛ به دسترسی به امکانات، آگاهی و حتی نگاه جوامع هم مربوط است.',
    ],
  },
  { id: '2', title: 'کافی بودن دمن از فشار روانی خبر می‌کند؟', minutes: 5, category: 'خلق و خو', body: ['خواب کافی نقش مهمی در تنظیم خلق‌وخو و کاهش استرس دارد؛ در این مطلب به ارتباط خواب و چرخه قاعدگی می‌پردازیم.'] },
  { id: '3', title: 'ترب، هورمون‌ها و پریود؛ این سه چطور بر هم اثر می‌گذارند؟', minutes: 4, category: 'تغذیه', body: ['تغذیه مناسب می‌تواند علائم پیش از قاعدگی را کاهش دهد؛ درباره نقش سبزیجات خانواده کلم بیشتر بدانید.'] },
  { id: '4', title: 'خواب‌های خوب‌بخش در دوران پریود چطور اتفاق می‌افتد؟', minutes: 4, category: 'سیکل زندگی', body: ['راهکارهایی برای بهبود کیفیت خواب در روزهای قاعدگی.'] },
];
const CATS = ['همه', 'پریود', 'چرخه پریود', 'خلق و خو', 'سیکل زندگی', 'تغذیه'];

export default function ArticlesScreen({ navigation }: any) {
  const router = useRouter()
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('همه');
  const list = ARTICLES.filter(a => (cat === 'همه' || a.category === cat) && a.title.includes(q));

  
  const _navTo = (selectedArticle:any)=>() => {
      // router.replace('/(pages)/ArticleDetailScreen')
      router.navigate({
        pathname: '/(pages)/ArticleDetailScreen',
        params: {
          article: selectedArticle
        }
      });
  }
  


  return (
    <View style={s.container}>
      <UserHeader onMenu={() => navigation.navigate('Menu')} />
      <View style={s.searchRow}>
        <View style={s.searchBox}>
          <TextInput value={q} onChangeText={setQ} placeholder="جستجو در مقالات" placeholderTextColor={colors.sub} style={s.searchInput} />
          <Ionicons name="search-outline" size={16} color={colors.sub} />
        </View>
        <View style={s.add}><Ionicons name="add" size={18} color={colors.primary} /></View>
      </View>
      <View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
          {CATS.map(c => (
            <TouchableOpacity key={c} style={[s.chip, c === cat && s.chipOn]} onPress={() => setCat(c)}>
              <AppText style={{ fontSize: 10, color: c === cat ? '#fff' : colors.sub }}>{c}</AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>

        <FlatList data={list} keyExtractor={i => i.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.card}
            onPress={_navTo(item)}
              // onPress={() => navigation.navigate('ArticleDetail', { article: item })}
            >
              <Ionicons name="heart-outline" size={18} color={colors.sub} />
              <View style={s.cardBody}>
                <AppText style={s.title} numberOfLines={2}>{item.title}</AppText>
                <View style={s.meta}>
                  <AppText style={s.metaText}>{toFa(item.minutes)} دقیقه مطالعه</AppText>
                  <AppText style={s.badge}>تخصصی</AppText>
                </View>
              </View>
              <View style={s.thumb}><Ionicons name="image-outline" size={20} color={colors.sub} /></View>
            </TouchableOpacity>
          )} />
      </View>

    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  searchRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16,marginTop:Spacing.two },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 12, fontFamily: 'Vazirmatn-Regular' },
  add: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  chips: { paddingHorizontal: 16, paddingVertical: 10, gap: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, marginEnd: 6 },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, padding: 12, marginBottom: 12 },
  cardBody: { flex: 1, marginHorizontal: 10 },
  title: { fontSize: 11, lineHeight: 20 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  metaText: { fontSize: 9, color: colors.sub },
  badge: { fontSize: 8, color: colors.cta, backgroundColor: '#EBEAFB', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, overflow: 'hidden' },
  thumb: { width: 54, height: 54, borderRadius: 10, backgroundColor: colors.chip, alignItems: 'center', justifyContent: 'center' },
});