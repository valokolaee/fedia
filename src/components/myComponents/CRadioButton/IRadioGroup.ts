import { ISelect } from '../interfaces/ISelect';
import { IRadio } from './item';

export default interface IRadioGroup extends ISelect<IRadio> {
  ListRadio: IRadio[];
  required?: boolean;
  size?: number | string;
  title?: string;
  horizontal?: boolean;
  // style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
