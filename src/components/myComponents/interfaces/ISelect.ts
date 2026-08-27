import { View, ViewStyle } from "react-native";
import { IStyle } from "./IStyle";

export interface ISelect<T> extends IStyle<ViewStyle> {
    disabled?: boolean;
    info?: T,
    onSelect?: (value?: T) => void;
    clearSelection?: () => void;
    delete?: (value?: T) => void;
    edit?: (value?: T) => void;
    isSelected?: boolean;
    selectedItem?: T;

}