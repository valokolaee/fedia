import CButton from "@/components/myComponents/CButton"
import CIconGenerator from "@/components/myComponents/CIconGenerator"
import SVGstor from "@/components/myComponents/CIconGenerator/SVGstor"
import IRadioGroup from "@/components/myComponents/CRadioButton/IRadioGroup"
import CText from "@/components/myComponents/CText"
import CTextInput from "@/components/myComponents/CTextInput"
import { Spacing } from "@/constants/theme"
import { setTokenResponseDtoSlice, setUser } from "@/redux/actions"
import { useAppSelector } from "@/redux/hooks"
import { convertPersianArabicDigitsToLatin, sanitizeIranianMobileInput } from "@/utils/mobilNumber.utils"
import { useApi } from "@/webService/hooks/useApi"
import { apis, LoginDto, RegisterDto } from "@/webService/periodcycleApis"
import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"


export default () => {
  const router = useRouter()
  const { callApi, Loader } = useApi();

  const [_loginDto, set_loginDto] = useState<LoginDto | undefined>()
  const user = useAppSelector((s) => s.userSlice)
  const {  mobile, pin } = _loginDto || {}

  const _submit = async () => {

    const res = await callApi(apis.auth.login(_loginDto  ));
    if (res.success) {

      setTokenResponseDtoSlice(res.data)
      setUser(_loginDto)
      _navTo()
    }
    console.log(res);


  }


  const _navTo = () => {
    router.replace('/(main)/HomeScreen')
  }



  const set = (k: string) => (v: string) => {


    set_loginDto((p: any) => ({ ...p, [k]: v }));


  }


  return (
    <View style={{ flex: 1, gap: Spacing.two, padding: Spacing.four, backgroundColor: 'white' }}>
      {Loader}
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CIconGenerator xml={SVGstor.environmental.missHappy} size={150} />
        </View>

        <CText textAlign="center" text={'ورود کاربران'} fontWeight={'900'} fontSize={50} />


        <CTextInput value={mobile} onChangeText={(v) => set('mobile')(sanitizeIranianMobileInput(convertPersianArabicDigitsToLatin(v)))}
          style={defStyle.textInput}
          label="شماره موبایل"
          keyboardType="phone-pad"
          placeHolder="۰۹۱۲۳۴۵۶۷۸" iconSvg={SVGstor.mobile} txtStyle={defStyle.txtStyle} />

        <CTextInput value={pin} onChangeText={set('pin')} label="گذرواژه"
          keyboardType="visible-password"
          placeHolder="گذرواژه خود را وارد کنید" style={defStyle.textInput} />

      </View>

      <CButton text="ثبت عضویت" iconRtl onPress={_submit} />

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
export const maritalStatusList: IRadioGroup['ListRadio'] = [
  { value: 'مجرد', type: 'single' },
  { value: 'متاهل', type: 'married' },
  { value: 'بیوه', type: 'widow' },
  { value: 'مطلقه', type: 'divorced' },
]