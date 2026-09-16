import Question1Screen from "@/components/QuestionsScreen/question1Screen";
import Question2Screen from "@/components/QuestionsScreen/question2Screen";
import Question3Screen from "@/components/QuestionsScreen/question3Screen";
import { useApi } from "@/webService/hooks/useApi";
import { apis, CreateCycleRequestDto } from "@/webService/periodcycleApis";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";


export default () => {
  const { callApi, Loader } = useApi();
  const router = useRouter()

  const [screenNumber, setScreenNumber] = useState<1 | 2 | 3>(1);
  const [_t, set_t] = useState<CreateCycleRequestDto>({
    cycleLengthDays: 25,
    periodLengthDays: 5
  })

  const _submit = async () => {

    const res = await callApi(apis.cycles.create(_t));

    console.log(res);

    if (res.success) {
      _navTo()
    }
    console.log(res);

  }


  const _navTo = () => {
    router.replace('/(main)/HomeScreen')
  }

  useEffect(() => {
    console.log(_t);

  }, [_t])

  return <View style={{ flex: 1 }}>
    {Loader}
    <View style={{ flex: 1, display: screenNumber === 1 ? 'flex' : 'none' }}>

      <Question1Screen
        nav={{
          onNext: () => setScreenNumber(2)
        }}
        select={(t) =>
          set_t({ ..._t, cycleLengthDays: t as number })
        }

      />

    </View>
    <View style={{ flex: 1, display: screenNumber === 2 ? 'flex' : 'none' }}>
      <Question2Screen

        nav={{
          onBack: () => setScreenNumber(1),
          onNext: () => setScreenNumber(3)
        }}
        select={(t) =>
          set_t({ ..._t, periodLengthDays: t as number })

        }
      />
    </View>
    <View style={{ flex: 1, display: screenNumber === 3 ? 'flex' : 'none' }}>
      <Question3Screen
        nav={{
          onBack: () => setScreenNumber(2),
          onNext: _submit
        }}
        select={(t) =>
          set_t({ ..._t, lastDate: t as string })
          // console.log(t)

        }
      />
    </View>
  </View>
}