export interface IEvent<T=any> {
    onChange?: onChange<T>
    onCheck?: onCheck;
    onPress?: onPress;
    onLongPress?: onLongPress;
    onChangeText?: onChangeText;
    onSubmitEditing?: onSubmitEditing;
    onSelect?: onSelect<T>
    onBackButtonPress?: onBackButtonPress;
}


export type onChange<T> = (value: T) => void;
export type onCheck = (value: boolean) => void;
export type onPress = () => void;
export type onLongPress = () => void;
export type onChangeText = ((text: string) => void) | undefined;
export type onSubmitEditing = () => void;
export type onSelect<T> = ((item?: T, index?: number, value?: string) => void) | undefined;
export type onBackButtonPress = () => void;
