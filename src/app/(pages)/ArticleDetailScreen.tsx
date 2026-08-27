import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText, ScreenHeader } from '@/components/ui';
import { toFa } from '@/utils/fa';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';


export default function ArticleDetailScreen({  route }: any) {
  const navigation = useRouter()

  const a = route?.params?.article;
  
  
  
  return (
    <View style={s.container}>
      <ScreenHeader title="" onBack={() => navigation.back()} />
      <ScrollView contentContainerStyle={s.body}>
        <View style={s.author}>
          <View style={s.thumb}><Ionicons name="person" size={22} color={colors.sub} /></View>
          <View>
            <AppText style={s.authorName}>نویسنده: دکتر صغری برومند</AppText>
            <View style={s.metaRow}>
              <AppText style={s.meta}>{toFa(a?.minutes ?? 3)} دقیقه مطالعه</AppText>
              <Ionicons name="eye-outline" size={12} color={colors.sub} /><AppText style={s.meta}>{toFa(32)}</AppText>
              <Ionicons name="heart-outline" size={12} color={colors.primary} /><AppText style={s.meta}>{toFa(86)}</AppText>
            </View>
          </View>
        </View>
        <AppText style={s.title}>{a?.title}</AppText>
        {(a?.body ?? []).map((p: string, i: number) => <AppText key={i} style={s.para}>{p}</AppText>)}
        <View style={s.commentsHead}>
          <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.sub} />
          <AppText style={{ fontSize: 12 }}>نظرات کاربران</AppText>
        </View>
      </ScrollView>
      <View style={s.bottom}>
        <TextInput style={s.commentInput} placeholder="نظر خود را وارد کنید" placeholderTextColor={colors.sub} />
        <TouchableOpacity onPress={() => navigation.navigate('/(pages)/CommentScreen',
          // { article: a }
        )}>
          <Ionicons name="chevron-back" size={18} color={colors.sub} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card },
  body: { padding: 20 },
  author: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  thumb: { width: 52, height: 52, borderRadius: 12, backgroundColor: colors.chip, alignItems: 'center', justifyContent: 'center' },
  authorName: { fontSize: 10, color: colors.sub },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  meta: { fontSize: 9, color: colors.sub },
  title: { fontFamily: 'Vazirmatn-Bold', fontSize: 14, marginVertical: 16 },
  para: { fontSize: 11, lineHeight: 22, marginBottom: 14 },
  commentsHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10, borderTopWidth: 1, borderColor: colors.border, paddingTop: 14 },
  bottom: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderTopWidth: 1, borderColor: colors.border },
  commentInput: { flex: 1, height: 40, backgroundColor: colors.bg, borderRadius: 10, paddingHorizontal: 12, fontSize: 11, fontFamily: 'Vazirmatn-Regular' },
});