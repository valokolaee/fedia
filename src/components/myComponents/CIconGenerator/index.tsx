

// import { defaultPadding2XB, defaultPaddingB, defFontSize10, defFontSize7 } from '../defaultValues';
import { SvgXml } from 'react-native-svg';
import IIconGenerator from './IIconGenerator';

export default ({ disable, xml, size = 20, color, style }: IIconGenerator) => {

    const coloredSvg = !!!color ? xml : xml
        .replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`)
        .replace(/stroke="[^"]*"/g, `stroke="${color}"`);


    return (
        <SvgXml xml={coloredSvg} width={size} height={size} style={[style]} />
    )
}