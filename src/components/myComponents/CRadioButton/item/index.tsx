import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ISelect } from "../../interfaces/ISelect";

import { Spacing } from "@/constants/theme";
import { colors } from "@/theme";
import CText from "../../CText";

const _selectedColor =colors.primary
export default memo(({ info, onSelect, isSelected, disabled }: ISelect<IRadio>) => {
    const { value, type } = info!
    const _selectHelper = () => { onSelect!(info) }
    return (
        <TouchableOpacity onPress={_selectHelper} style={defStyle.main} disabled={disabled}>
            <View style={[defStyle.radio, isSelected && { backgroundColor: disabled ? colors.darkBorder : _selectedColor }]} />
            <CText text={value} style={{ borderColor: _selectedColor, marginEnd: Spacing.one, marginStart: Spacing.one }} color={colors.placeHolder} />
        </TouchableOpacity >)
})
const defStyle = StyleSheet.create({
    main: { marginEnd: Spacing.one, marginVertical: Spacing.one, alignItems: 'center', flexDirection: 'row', },
    radio: { borderWidth: 1, borderColor: colors.placeHolder, borderRadius: 50, padding: Spacing.two }
})

export interface IRadio {
    // selected?: boolean,
    // select?: (r: IRadio) => void;
    type?: string;
    value: string | number;
    _id?: string | number;
}