import CIconGenerator from "@/components/myComponents/CIconGenerator";
import SVGstor from "@/components/myComponents/CIconGenerator/SVGstor";
import CText from "@/components/myComponents/CText";
import { View } from "react-native";


export default () => {




  return (
    <View style={{
      flex: 1,
      height: '100%',
      // borderColor: 'red',
      // borderWidth: 10
    }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        <CIconGenerator
          xml={SVGstor.environmental.flower}
          size={100}

        />
        <View style={{ position: 'absolute', width: '100%', }}>

          <CText textAlign="center" text={'سلام! خوش آمدید'} fontWeight={'900'} fontSize={50} />
          <CText textAlign="center" text={'اپلیکیشن ثبت سلامت قاعدگی'} />
        </View>

        <CIconGenerator
          xml={SVGstor.environmental.littleFlower}
          size={30}
        />
      </View>

      <CIconGenerator
        xml={SVGstor.environmental.belly}
      // size={30}
      />


    </View>)
}
