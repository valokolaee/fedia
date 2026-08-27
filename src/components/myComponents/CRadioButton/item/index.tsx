import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ISelect } from "../../interfaces/ISelect";

import {  Spacing } from "@/constants/theme";
import CText from "../../CText";
import { colors } from "@/theme";

export default memo(({ info, onSelect, isSelected, disabled }: ISelect<IRadio>) => {
    const { value, type } = info!

    const _selectHelper = () => { onSelect!(info) }
    return (
        <TouchableOpacity onPress={_selectHelper} style={defStyle.main} disabled={disabled}>
            <View style={[defStyle.radio, isSelected && { borderWidth: 0, backgroundColor: disabled ? colors.darkBorder : 'blue' }]} />
            <CText text={value} style={{ marginEnd: Spacing.one, marginStart: Spacing.one }} color={colors.placeHolder } />
        </TouchableOpacity >)
})
const defStyle = StyleSheet.create({
    main: { marginEnd: Spacing.one, marginVertical: Spacing.one, alignItems: 'center', flexDirection: 'row', },
    radio: { borderWidth: 1, borderColor: colors.ink, borderRadius: 50, padding: Spacing.two  }
})

export interface IRadio {
    // selected?: boolean,
    // select?: (r: IRadio) => void;
    type?: string;
    value: string | number;
    _id?: string | number;
}