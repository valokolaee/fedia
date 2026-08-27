import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, Filter, FeDropShadow, Path, Rect } from 'react-native-svg';

interface PeriodCardProps {
    nextPeriod: string;
    lastPeriod: string;
}

export default function PeriodCard({
    nextPeriod,
    lastPeriod,
}: PeriodCardProps) {
    const { width } = useWindowDimensions();

    /*
     * Original design:
     * 712 x 202
     */
    const DESIGN_WIDTH = 712;
    const DESIGN_HEIGHT = 202;

    const scale = width / DESIGN_WIDTH;
    const height = DESIGN_HEIGHT * scale;

    return (
        <View
            style={[
                styles.container,
                {
                    width,
                    height,
                },
            ]}
        >
            {/* Background + cards + center decoration */}
            <Svg
                width={width}
                height={height}
                viewBox="0 0 712 202"
                preserveAspectRatio="none"
            >
                <Defs>
                    <Filter
                        id="shadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="150%"
                    >
                        <FeDropShadow
                            dx="0"
                            dy="5"
                            stdDeviation="12"
                            floodColor="#000000"
                            floodOpacity="0.045"
                        />
                    </Filter>
                </Defs>

                {/* LEFT CARD */}
                <Rect
                    x="52"
                    y="28"
                    width="270"
                    height="136"
                    rx="31"
                    fill="#FFFFFF"
                    filter="url(#shadow)"
                />

                {/* RIGHT CARD */}
                <Rect
                    x="406"
                    y="28"
                    width="270"
                    height="136"
                    rx="31"
                    fill="#FFFFFF"
                    filter="url(#shadow)"
                />

                {/* CENTER CUT / BRIDGE */}
                <Path
                    d="
            M 322 28
            C 322 61 340 87 370 87
            C 400 87 406 61 406 28
            Z
          "
                    fill="#FFFFFF"
                />

                {/* Pink circular/oval background */}
                <Path
                    d="
            M 348 17
            C 348 17 346 30 346 43
            C 346 66 356 74 370 74
            C 384 74 394 66 394 43
            C 394 30 392 17 392 17
            C 386 10 378 7 370 7
            C 362 7 354 10 348 17
            Z
          "
                    fill="#FFD9E0"
                />

                {/* DROPLET */}
                <Path
                    d="
            M 370 17
            C 370 17 349 41 349 50
            C 349 59 356 65 364 65
            C 373 65 380 60 380 51
            C 380 42 370 17 370 17
            Z
          "
                    fill="#FFE7EB"
                    stroke="#FF6680"
                    strokeWidth="2.5"
                />

                {/* Small highlight / inner pink area */}
                <Path
                    d="
            M 370 22
            C 370 22 354 41 354 49
            C 354 56 359 60 365 60
            C 372 60 377 56 377 50
            C 377 43 370 22 370 22
            Z
          "
                    fill="#FFD4DC"
                    opacity="0.55"
                />
            </Svg>

            {/* LEFT TEXT */}
            <View
                style={[
                    styles.cardContent,
                    {
                        left: 52 * scale,
                        top: 28 * scale,
                        width: 270 * scale,
                        height: 136 * scale,
                    },
                ]}
            >
                <Text style={[styles.title, { fontSize: 28 * scale }]}>
                    {nextPeriod}
                </Text>

                <Text style={[styles.subtitle, { fontSize: 18 * scale }]}>
                    تاریخ پریود بعدی
                </Text>
            </View>

            {/* RIGHT TEXT */}
            <View
                style={[
                    styles.cardContent,
                    {
                        left: 406 * scale,
                        top: 28 * scale,
                        width: 270 * scale,
                        height: 136 * scale,
                    },
                ]}
            >
                <Text style={[styles.title, { fontSize: 28 * scale }]}>
                    {lastPeriod}
                </Text>

                <Text style={[styles.subtitle, { fontSize: 18 * scale }]}>
                    تاریخ آخرین قاعدگی
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#F9F9FB',
    },

    cardContent: {
        position: 'absolute',

        alignItems: 'center',
        justifyContent: 'center',

        direction: 'rtl',
    },

    title: {
        fontWeight: '700',
        color: '#202124',

        marginBottom: 12,
        includeFontPadding: false,
    },

    subtitle: {
        fontWeight: '400',
        color: '#858585',

        includeFontPadding: false,
    },
});