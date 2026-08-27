import { memo } from "react";
import { StyleSheet, View } from "react-native";
import CText from "../CText";

import Item from "./item";
import CIconGenerator from "../CIconGenerator";
import IRadioGroup from "./IRadioGroup";


export default memo(({ ListRadio, title, selectedItem, horizontal, disabled, clearSelection, onSelect,style }: IRadioGroup) => {

    return (
        <View style={[defStyle.main,style]}>
            {title && <CText text={title} />}
            <View style={[defStyle.group, horizontal && { flexWrap: 'wrap',flexDirection:'row' }]}  >
                {ListRadio.map((item) =>
                    <Item info={item} onSelect={onSelect} key={item.value}
                        isSelected={
                            item.value.toString() === selectedItem?.value?.toString()
                         }
                        disabled={disabled} />)}
             </View>
        </View>
    )
})
const defStyle = StyleSheet.create({
    main: {

        // padding: defaultPadding,
    },
    group: {
     },
})

