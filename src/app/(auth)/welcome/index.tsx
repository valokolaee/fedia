import CButton from "@/components/myComponents/CButton";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import BackGround from "./backGround";


export default () => {

  const router = useRouter();

  const _navTo = () => {
    router.replace('/(main)/HomeScreen');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      _navTo();
    }, 2);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={{ flex: 1, }}>
      <BackGround />
      <CButton text="بیا شروع کنیم" iconRtl onPress={_navTo} />
    </View>)
}
