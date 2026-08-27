import { StyleProp } from 'react-native';


export interface IStyle<T> {
  style?: StyleProp<T>;
  isWeb?: boolean;

}
