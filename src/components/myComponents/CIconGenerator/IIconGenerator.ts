import { ColorValue, ViewStyle } from "react-native";
import { IStyle } from "../interfaces/IStyle";
 
export default interface IIconGenerator extends IStyle<ViewStyle>
{
    xml: string;
    size?: number;
    color?: string|undefined;
    // lightColor?: ColorValue|string|undefined;
    // event?: IEvent<any>;
    // rotation?: numString;

    disable?: boolean;
}
