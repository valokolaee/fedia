import { AppText, OptionRow, ScreenHeader } from '@/components/ui';
import { colors } from '@/theme';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';


export default function PregnancyScreen({ navigation }: any) {
  const [v, setV] = useState('بله');
  // const router = useRouter()
  return (
    <View style={s.container}>
      <ScreenHeader title="بارداری"
      // onBack={() => router.back()}
      />
      <View style={s.body}>
        <AppText style={s.q}>آیا قصد بارداری در ۱۲ ماه آینده را دارید؟</AppText>
        {['بله', 'خیر', 'هنوز تصمیم نگرفتم', 'مجردم'].map(o => (
          <OptionRow key={o} label={o} selected={v === o} onPress={() => setV(o)} />
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.card }, body: { padding: 20 }, q: { fontFamily: 'Vazirmatn-Bold', fontSize: 15, textAlign: 'center', marginVertical: 24 } });