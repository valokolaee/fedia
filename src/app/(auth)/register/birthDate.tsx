import { Dropdown } from "@/components/Form"
import CText from "@/components/myComponents/CText"
import { Spacing } from "@/constants/theme"
import { MONTHS, range } from "@/utils/fa"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"


export default ({ onChange }: { onChange: (d: string) => void }) => {
  const [f, setF] = useState<{ day: string, month: string, year: string } | undefined>(undefined);
  const [_monthIndex, set_monthIndex] = useState<number>(-1)

  const { day, month, year } = f || {}



  const set = (k: string) => (v: any, d: any) => {

    setF((p: any) => ({ ...p, [k]: v }));
    if (k === 'month') {
      set_monthIndex(d + 1)
    }
  }

  useEffect(() => {
    onChange && onChange!(`${year}/${_monthIndex + 1}/${day}`)
  }, [f])

  return (
    <View style={{ marginTop: Spacing.three }} >
      <CText text={'تاریخ تولد'} />
      <View style={s.dobRow}>
        <Dropdown placeholder="روز" options={range(1, 31)}
          value={day}
          onChange={set('day')}
          style={s.dobBox} />
        <Dropdown placeholder="ماه" options={MONTHS}
          value={month}
          onChange={set('month')} style={s.dobBox} />
        <Dropdown placeholder="سال" options={range(1340, 1390)}
          value={year}
          onChange={set('year')} style={s.dobBox} />
      </View>
    </View>
  )
}


const s = StyleSheet.create({
  body: { padding: 20, paddingTop: 30 },
  art: { height: 160, alignSelf: 'center', marginBottom: 16 },
  title: { fontFamily: 'Vazirmatn-Bold', fontSize: 13, textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 12, marginBottom: 8 },
  dobRow: { flexDirection: 'row', gap: 8 },
  dobBox: { flex: 1 },
});