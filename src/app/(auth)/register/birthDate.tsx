import { Dropdown } from "@/components/Form"
import CDropDown from "@/components/myComponents/CDropDown"
import IRadioGroup from "@/components/myComponents/CRadioButton/IRadioGroup"
import CText from "@/components/myComponents/CText"
import { Spacing } from "@/constants/theme"
import { MONTHS, range } from "@/utils/fa"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
export default () => {
  const [_marital, set_marital] = useState<IRadioGroup['info']>()
  const [f, setF] = useState<any>({ first: '', last: '', phone: '', marital: '', day: null, month: null, year: null });
  const set = (k: string) => (v: any) => setF((p: any) => ({ ...p, [k]: v }));


  return (
    <View style={{ marginTop: Spacing.three }} >
      <CText text={'تاریخ تولد'} />
      {/* <View style={{ flexDirection: 'row', width: '100%', }}>
        <Dropdown placeholder="ماه" options={MONTHS} value={f.month} onChange={set('month')} style={s.dobBox} />

        <CDropDown list={data} placeHolder="روز" style={[defStyle.dd, defStyle.flex1]} />
        <CDropDown list={data} placeHolder="ماه" style={[defStyle.dd, defStyle.flex2]} />
        <CDropDown list={data} placeHolder="سال" style={[defStyle.dd, defStyle.flex2]} />

      </View> */}
      <View style={s.dobRow}>
        <Dropdown placeholder="روز" options={range(1, 31)} value={f.day} onChange={set('day')} style={s.dobBox} />
        <Dropdown placeholder="ماه" options={MONTHS} value={f.month} onChange={set('month')} style={s.dobBox} />
        <Dropdown placeholder="سال" options={range(1340, 1390)} value={f.year} onChange={set('year')} style={s.dobBox} />
      </View>
    </View>
  )
}



const defStyle = StyleSheet.create({
  textInput: { marginBottom: Spacing.two },
  dd: {
    marginLeft: Spacing.two
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
})
const s = StyleSheet.create({
  body: { padding: 20, paddingTop: 30 },
  art: { height: 160, alignSelf: 'center', marginBottom: 16 },
  title: { fontFamily: 'Vazirmatn-Bold', fontSize: 13, textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 12, marginBottom: 8 },
  dobRow: { flexDirection: 'row', gap: 8 },
  dobBox: { flex: 1 },
});