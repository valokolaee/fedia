import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TTextAlign } from '../CText/IText';
import { onChangeText } from '../interfaces/IEvent';
import { IStyle } from '../interfaces/IStyle';



export interface IInput extends IStyle<ViewStyle> {
  onChangeText?: onChangeText
  editable?: boolean;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  multiline?: boolean;
  darkBackgroundColor?: string;
  value?: number | string | undefined;
  label?: string | undefined;
  iconSvg?: string | undefined;
  placeHolder?: string | undefined
  keyboardType?: KeyboardTypeOptions;
  textAlign?: TTextAlign;
  onSubmitEditing?: () => void
  fontSize?: number | undefined;
  txtStyle?: StyleProp<TextStyle>;
  numberOfLines?: number | undefined;

  maxLength?: number;
  noClean?: boolean;
}

