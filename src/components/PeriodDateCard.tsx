import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

// اگه I18nManager.forceRTL(true) رو در سطح اپ فعال داری، این کامپوننت
// خودش با style={direction: 'ltr'} روی wrapper، جهت لایوت رو برای خودش
// (فقط همین subtree) به LTR قفل می‌کنه. یعنی نیازی نیست forceRTL رو
// از کل اپ حذف کنی؛ همین یک کامپوننت مستقل از اون تنظیم رفتار می‌کنه
// و flexDirection: 'row' دیگه توسط سیستم معکوس نمی‌شه.

type Props = {
  lastPeriodDate: string; // مثال: "۲۰ تیر"  -> سمت راست
  nextPeriodDate: string; // مثال: "۲۰ مرداد" -> سمت چپ
};

export default function PeriodDateCard({ lastPeriodDate, nextPeriodDate }: Props) {
  return (
    <View style={styles.wrapper}>
      {/* ترتیب در row معمولی: اول = چپ‌ترین، دوم = راست‌ترین */}
      <View style={[styles.card, styles.cardLeft]}>
        <Text style={styles.date}>{nextPeriodDate}</Text>
        <Text style={styles.label}>تاریخ پریود بعدی</Text>
      </View>

      <View style={[styles.card, styles.cardRight]}>
        <Text style={styles.date}>{lastPeriodDate}</Text>
        <Text style={styles.label}>تاریخ آخرین قاعدگی</Text>
      </View>

      {/* آیکون با absolute دقیقاً روی مرز دو کارت، مستقل از جهت چیدمان */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconGlow} />
        <Ionicons name="water" size={26} color="#FF4C6A" />
      </View>
    </View>
  );
}

const CARD_HEIGHT = 100;
const ICON_SIZE = 56;

const styles = StyleSheet.create({
  wrapper: {
    direction: 'ltr', // این خط مستقل از I18nManager.forceRTL عمل می‌کنه
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    position: 'relative',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.04,
    // shadowRadius: 8,
    // elevation: 2,
    backgroundColor: '#FFFFFF',
    height: CARD_HEIGHT,
    borderRadius:24,
  },
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,

  },
  cardLeft: {
    // borderTopLeftRadius: 24,
    // borderBottomLeftRadius: 24,
    // borderTopRightRadius: 4,
    // borderBottomRightRadius: 4,
    // borderRightWidth: 0
  },
  cardRight: {
    // borderTopRightRadius: 24,
    // borderBottomRightRadius: 24,
    // borderTopLeftRadius: 4,
    // borderBottomLeftRadius: 4,
    // borderLeftWidth: 0
  },
  date: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C28',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: '#9A9AA5',
  },
  iconWrapper: {
    position: 'absolute',
    left: '50%',
    marginLeft: -ICON_SIZE / 2, // دقیقاً وسط، مستقل از جهت
    top: -18,
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  iconGlow: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,76,106,0.12)',
  },
});
