import { Dropdown } from "@/components/Form"
import CText from "@/components/myComponents/CText"
import { Spacing } from "@/constants/theme"
import { MONTHS, range } from "@/utils/fa"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"


export default (day: string,  monthIndex: number, year: string) => `${year}/${monthIndex + 1}/${day}`
