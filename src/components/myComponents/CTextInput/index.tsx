import {  Spacing } from "@/constants/theme";
import { StyleSheet, TextInput, View } from "react-native";
import CIconGenerator from "../CIconGenerator";
import CText from "../CText";
import { IInput } from "./IInput";
import { colors } from "@/theme";


export default ({ darkBackgroundColor, onChangeText, placeHolder, textAlign = 'center', iconSvg, style, value, returnKeyType, keyboardType, onSubmitEditing, maxLength, editable, multiline, noClean, txtStyle, numberOfLines, label }: IInput) => {



    const _set_isFocusTrue = () => {
        // set_isFocus(true)
    }



    return <View style={style}>
        
        <CText text={label} style={styles.label} />
        
        <View style={styles.base}>
            {iconSvg && <CIconGenerator xml={iconSvg!} size={30} color={colors.placeHolder} />}

            <TextInput
                style={[styles.inp, txtStyle]}
                placeholderTextColor={colors.placeHolder}
                onChangeText={onChangeText}
                onFocus={_set_isFocusTrue}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeHolder}
                value={value?.toString()}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                editable={editable}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />

        </View>
    </View>


}

const styles = StyleSheet.create({
    base: {
        textAlign: 'auto',
        borderWidth: 1,
        borderColor: colors.placeHolder,
        borderRadius: Spacing.two,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inp: {
        flex: 1,
        padding: Spacing.two,
        textAlign: 'right'
    },
    label: {
        marginBottom: Spacing.one
    }

});