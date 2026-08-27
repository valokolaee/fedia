
import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '@/theme';
import IText from './IText';



export default memo(({ text = colors.ink, darkColor, isPrice, lightColor, event, disabled, bold, textAlign, fontWeight, color, fontSize = 10, style, capitalize, numberOfLines }: IText) => {




  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={disabled ? undefined : event?.onPress!}
      style={[
        { textAlign, fontWeight },
        defaultStyle.txtStyle,
        color && { color },
        style
      ]}
    >
      {text}
    </Text>

  );
})
const defaultStyle = StyleSheet.create({
  main: {
  },
  txtStyle: {
    overflow: 'hidden'
  },
});

