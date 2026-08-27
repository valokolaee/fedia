
import {  Spacing } from '@/constants/theme';
import { colors } from '@/theme';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CIconGenerator from '../CIconGenerator';
import CText from '../CText';
import IButton from './IButton';
const numberOfItems = 25
export default ({ onPress, border, secondary, iconSvg, text, iconRtl, style, }: IButton) => {
    const backgroundColor = secondary ? colors.secondaryBtn : colors.primaryBtn
    const borderColor = border ? colors.darkBorder : undefined

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{
                ...style,
                backgroundColor,
                borderColor,
                borderWidth: border ? 2 : undefined,
                flexDirection: iconRtl ? 'row' : 'row-reverse',
            }, defStyle.main]}>
            <CText text={text} textAlign='center' bold color={colors.white} style={{ marginHorizontal: Spacing.five }} />
            {iconSvg && <CIconGenerator xml={iconSvg} size={10} />}
        </TouchableOpacity>
    )

}



const defStyle = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    }
})