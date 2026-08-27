 import { StyleProp, TextStyle } from "react-native";
import { IEvent } from "../interfaces/IEvent";
import { FontWeight } from "react-native-svg";

export default interface IText {
   style?: StyleProp<TextStyle>;
  // textAlign?: 'flex-start' | 'flex-end' | 'center' | undefined

  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];

  // textAlignVertical?: 'flex-start' | 'flex-end' | 'center' | undefined;
  text?: string | number;
  bold?: boolean;
  disabled?: boolean;
  fontSize?: number | undefined;
  event?: IEvent<any>;
  color?: string | false;
  capitalize?: boolean;
  darkColor?: string;
  lightColor?: string;
  isPrice?: boolean;
  numberOfLines?: number | undefined;

}

export type TTextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | undefined;