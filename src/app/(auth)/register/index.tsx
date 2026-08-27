import CButton from "@/components/myComponents/CButton"
import CIconGenerator from "@/components/myComponents/CIconGenerator"
import SVGstor from "@/components/myComponents/CIconGenerator/SVGstor"
import CRadioButton from "@/components/myComponents/CRadioButton"
import IRadioGroup from "@/components/myComponents/CRadioButton/IRadioGroup"
import CText from "@/components/myComponents/CText"
import CTextInput from "@/components/myComponents/CTextInput"
import { Spacing } from "@/constants/theme"
import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import BirthDate from "./birthDate"


export default () => {
  const [_marital, set_marital] = useState<IRadioGroup['info']>()
  const router = useRouter()




  const _navTo = () => {
    router.replace('/(auth)/Question1Screen')
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CIconGenerator xml={SVGstor.environmental.missHappy} size={150} />
        </View>

        <CText textAlign="center" text={'عضویت در سامانه خودارزیابی سلامت قاعدگی'} fontWeight={'900'} fontSize={50} />

        <CTextInput label="نام" placeHolder="نام خود را وارد کنید" style={defStyle.textInput} />

        <CTextInput label="شماره موبایل" placeHolder="۰۹۱۲۳۴۵۶۷۸" iconSvg={SVGstor.mobile} txtStyle={defStyle.txtStyle} />

        <CRadioButton title="وضعیت تاهل" ListRadio={list} horizontal style={{ marginTop: Spacing.four }} onSelect={set_marital} selectedItem={_marital} />

        <BirthDate />

      </View>

      <CButton text="ثبت عضویت" iconRtl onPress={_navTo} />

    </View>
  )
}



const defStyle = StyleSheet.create({
  textInput: { marginBottom: Spacing.two },
  txtStyle: { textAlign: 'left', writingDirection: 'ltr' }
})
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
const list: IRadioGroup['ListRadio'] = [
  { value: 'مجرد' },
  { value: 'متاهل' },
  { value: 'بیوه' },
  { value: 'مطلقه' },
]