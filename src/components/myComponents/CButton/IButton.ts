import { ViewStyle } from "react-native";
import { onPress } from "../interfaces/IEvent";
import { IStyle } from "../interfaces/IStyle";


export default interface IButton extends IStyle<ViewStyle> {
    onPress?: onPress;
    text?: string;
    iconRtl?: boolean;
    secondary?: boolean;
    border?: boolean;
    iconSvg?: string;
}