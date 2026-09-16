import CButton from "@/components/myComponents/CButton"
import CIconGenerator from "@/components/myComponents/CIconGenerator"
import SVGstor from "@/components/myComponents/CIconGenerator/SVGstor"
import CRadioButton from "@/components/myComponents/CRadioButton"
import IRadioGroup from "@/components/myComponents/CRadioButton/IRadioGroup"
import CText from "@/components/myComponents/CText"
import CTextInput from "@/components/myComponents/CTextInput"
import { Spacing } from "@/constants/theme"
import { setTokenResponseDtoSlice, setUser } from "@/redux/actions"
import { convertPersianArabicDigitsToLatin, sanitizeIranianMobileInput } from "@/utils/mobilNumber.utils"
import { useApi } from "@/webService/hooks/useApi"
import { apis, RegisterDto } from "@/webService/periodcycleApis"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import BirthDate from "./birthDate"


export default () => {
  const router = useRouter()
  const { callApi, Loader } = useApi();
  const [_marital, set_marital] = useState<IRadioGroup['info']>()
  const [_registerDto, set_registerDto] = useState<RegisterDto | undefined>()

  const { birthDate, email, firstName, lastName, maritalStatus, mobile, pin } = _registerDto || {}

  const _submit = async () => {

    const _t: RegisterDto = { ..._registerDto, maritalStatus: _marital?.type! } as RegisterDto
    console.log(_t);
 
    const res = await callApi(apis.auth.register(_t));
    if (res.success) {

      setTokenResponseDtoSlice(res.data)
      setUser({ mobile: _t.mobile, pin: _t.pin })
      _navTo()
    }
    console.log(res);


  }


  const _navTo = () => {
    router.replace('/(auth)/QuestionsScreen')
  }



  const set = (k: string) => (v: string) => {


    set_registerDto((p: any) => ({ ...p, [k]: v }));


  }


  return (
    <View style={{ flex: 1, gap: Spacing.two, padding: Spacing.four, backgroundColor: 'white' }}>
      {Loader}
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CIconGenerator xml={SVGstor.environmental.missHappy} size={150} />
        </View>

        <CText textAlign="center" text={'عضویت در سامانه خودارزیابی سلامت قاعدگی'} fontWeight={'900'} fontSize={50} />

        <CTextInput value={firstName} onChangeText={set('firstName')} label="نام" placeHolder="نام خود را وارد کنید" style={defStyle.textInput} />

        <CTextInput
          value={mobile}
          // value={sanitizeIranianMobileInput(mobile!)}
          onChangeText={(v) => set('mobile')(
            sanitizeIranianMobileInput(convertPersianArabicDigitsToLatin(v))
            //                          ↑ این باید اول اجرا بشه
            // convertPersianArabicDigitsToLatin(
            // sanitizeIranianMobileInput(v))

          )}
          style={defStyle.textInput}
          label="شماره موبایل"
          keyboardType="phone-pad"
          placeHolder="۰۹۱۲۳۴۵۶۷۸" iconSvg={SVGstor.mobile} txtStyle={defStyle.txtStyle} />

        <CTextInput value={pin} onChangeText={set('pin')} label="گذرواژه"
          keyboardType="visible-password"
          placeHolder="گذرواژه خود را وارد کنید" style={defStyle.textInput} />
        <CTextInput value={email} onChangeText={set('email')} label="ایمیل"
          keyboardType="visible-password"
          placeHolder="ایمیل خود را وارد کنید" style={defStyle.textInput} />
        <CRadioButton title="وضعیت تاهل" ListRadio={maritalStatusList} horizontal style={{ marginTop: Spacing.four }} onSelect={set_marital} selectedItem={_marital} />

        <BirthDate onChange={set('birthDate')} />

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