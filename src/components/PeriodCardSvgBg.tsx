import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { LayoutChangeEvent, Platform, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// ابعاد اصلی همون SVG (viewBox) — مبنای محاسبه موقعیت‌ها
const VB_WIDTH = 362;
const VB_HEIGHT = 118;
const ICON_SIZE = 30;

type Props = {
  lastPeriodDate: string; // مثال: "۲۰ تیر"
  nextPeriodDate: string; // مثال: "۲۰ مرداد"
  width?: number; // اختیاری؛ اگه ندی، عرض والد رو پر می‌کنه
};

export default function PeriodCard({ lastPeriodDate, nextPeriodDate, width }: Props) {
  // به‌جای aspectRatio (که رو اندروید وقتی همه‌ی بچه‌ها absolute هستن
  // گاهی ارتفاع رو درست حساب نمی‌کنه)، عرض واقعی رو با onLayout
  // اندازه می‌گیریم و خودمون ارتفاع متناسب رو حساب می‌کنیم.
  const [measuredWidth, setMeasuredWidth] = useState(width * 2 ?? 0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (!width) {
        setMeasuredWidth(e.nativeEvent.layout.width);
      }
    },
    [width]
  );

  const height = measuredWidth ? (measuredWidth * VB_HEIGHT) / VB_WIDTH : 0;

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        width ? { width } : { width: '125%' },
        // تا وقتی عرض اندازه‌گیری نشده، ارتفاع صفره تا چیزی جابه‌جا/چروک نشه
        { height },
      ]}
    >
      {measuredWidth > 0 && (
        <>
          {/* بک‌گراند: دقیقاً همون Path که فرستادی */}
          <Svg
            width={measuredWidth}
            height={height}
            viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
            style={StyleSheet.absoluteFill}
          >
            <Path
              d="M321 25C329.837 25 337 32.1634 337 41V77C337 85.8366 329.837 93 321 93H41C32.1634 93 25 85.8366 25 77V41C25 32.1634 32.1634 25 41 25H148.537C151.499 25.2651 157.832 27.7034 159.473 35.3369C161.523 44.8789 168.698 55.2168 181 55.2168C193.301 55.2167 200.477 44.8789 202.527 35.3369C204.168 27.7038 210.5 25.2652 213.462 25H321Z"
              fill="#FFFFFF"
            />
          </Svg>

          {/* محتوا: دو بخش تاریخ، کنار هم */}
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <View style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.date}>{nextPeriodDate}</Text>
                <Text style={styles.label}>تاریخ پریود بعدی</Text>
              </View>

              <View style={{ width: ICON_SIZE }} />

              <View style={styles.section}>
                <Text style={styles.date}>{lastPeriodDate}</Text>
                <Text style={styles.label}>تاریخ آخرین قاعدگی</Text>
              </View>
            </View>
          </View>

          {/* آیکون قطره، دقیقاً وسط بریدگی بالای کارت */}
          <View
            style={[
              styles.iconWrapper,
              {
                left: measuredWidth / 2 - ICON_SIZE / 2,
                top: (25 / VB_HEIGHT) * height - ICON_SIZE / 2,
              },
            ]}
            pointerEvents="none"
          >
            <View style={styles.iconGlow} />
            <Ionicons name="water" size={22} color="#FF4C6A" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // سایه‌ی معادل feGaussianBlur با opacity 0.06 در SVG اصلی
    // نکته: رو اندروید، elevation یه سایه‌ی مستطیلی رسم می‌کنه، نه دقیقاً
    // هم‌شکل با بریدگی بالای کارت. اگه این فرق تو اندروید اذیت‌کننده بود،
    // می‌تونی elevation رو کامل حذف کنی یا از react-native-shadow-2 استفاده کنی.
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 12.5,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: (25 / VB_WIDTH) * 100 + '%',
  },
  section: {
    flex: 1,
    alignItems: 'center',
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
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
      default: {},
    }),
  },
  iconGlow: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,76,106,0.12)',
  },
});
