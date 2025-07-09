import * as React from "react";
import { useSelector } from "react-redux";
import themes from "../themes";
import { StyleSheet, useWindowDimensions } from "react-native";
import Svg, { G, Path, Defs, Mask } from "react-native-svg";

const Schema = (props) => {
    const { width, height } = useWindowDimensions();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            preserveAspectRatio="none"
            style={style.backgroundSvg}
            {...props}
        >
            <G fill="none" mask='url("#a")'>
                <Path fill={theme.svg.fillColor} d="M0 0h920v1080H0z" />
                <G mask='url("#b")'>
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m412.5 637.5-275 275v50l-125 125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M406.25 637.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-400 450a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M462.5 887.5h-25l-25-25h-200l-50 50v50l-125 125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M456.25 887.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-425 200a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m237.5 487.5-225 225v225l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M231.25 487.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-200 475a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 712.5h250l100-100h25l100-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 712.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm475-200a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m812.5 762.5-100-100v-50l-50-50h-150l-125 125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M806.25 762.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-425-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m862.5 587.5-25-25v-225l75-75v-150"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M856.25 587.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-475a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M587.5 1087.5h-75l-50-50v-125l225-225"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M581.25 1087.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100-400a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M562.5 512.5h250"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 512.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm250 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m587.5 862.5 225 225h100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M581.25 862.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm325 225a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m12.5 662.5 100-100h25l175-175v-175"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M6.25 662.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm300-450a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M362.5 362.5v125l75 75v25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M356.25 362.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75 225a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M662.5 12.5v225l125 125v50l-75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M656.25 12.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 475a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M887.5 137.5v-125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M881.25 137.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M112.5 962.5v-100l25-25v-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M106.25 962.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-225a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m287.5 1062.5-25 25h-75l-50-50v-25l75-75h225"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M281.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm150-125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m37.5 937.5 50-50v-150"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M31.25 937.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-200a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m187.5 362.5-125 125h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M181.25 362.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-175 125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m12.5 337.5 100-100h50l125 125v25l-150 150h-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M6.25 337.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100 200a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M712.5 112.5v150l100 100v75l-50 50h-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M706.25 112.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 375a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M437.5 312.5h50l150-150v-150"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M431.25 312.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm200-300a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m37.5 562.5-25 25v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M31.25 562.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M337.5 737.5v50l50 50h75l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M331.25 737.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm150 125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M612.5 137.5h-50l-125 125h-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M606.25 137.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-275 125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M687.5 887.5h175l50-50v-250"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M681.25 887.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm225-300a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M912.5 412.5v150l-100 100h-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M906.25 412.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-175 250a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M12.5 12.5h475"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M6.25 12.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm475 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m87.5 387.5-50-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M81.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M712.5 462.5v-150l-75-75v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M706.25 462.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75-275a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M362.5 987.5h-175l-25 25v25l25 25h75l50-50h50l50-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M356.25 987.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M187.5 587.5h25l100 100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M181.25 587.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm125 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m762.5 787.5-25-25v-50l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M756.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M762.5 287.5v-200l-75-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M756.25 287.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75-275a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m237.5 387.5-25 25v25l-75 75h-25l-75 75v25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M231.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-200 225a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m187.5 337.5 25 25h50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M181.25 337.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M687.5 1087.5h-75l-125-125v-50l200-200h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M681.25 1087.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-375a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M487.5 287.5v-50l25-25h50l50-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M481.25 287.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm125-125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M812.5 712.5h-25l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M806.25 712.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M287.5 137.5v-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M281.25 137.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M787.5 262.5v50l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M781.25 262.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M512.5 587.5h100l75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M506.25 587.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm175 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m262.5 237.5-25 25h-25l-200-200v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M256.25 237.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-250-200a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M487.5 337.5v150l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M481.25 337.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 175a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m162.5 737.5 50 50v25l-75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M156.25 737.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 150a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M887.5 1012.5v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M881.25 1012.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M487.5 112.5v-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M481.25 112.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m287.5 162.5-50-50v-50l-25-25h-175"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M281.25 162.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-250-125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M587.5 412.5h75l25 25v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M581.25 412.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m512.5 487.5 50-50h100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M506.25 487.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm150-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M662.5 837.5h225"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M656.25 837.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm225 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M612.5 462.5h-50l-25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M606.25 462.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M312.5 912.5h125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M306.25 912.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm125 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M112.5 1087.5h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M106.25 1087.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m662.5 537.5 100 100h50l25-25v-25l-50-50h-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M656.25 537.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m37.5 387.5-25 25v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M31.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M87.5 412.5v25l-25 25h-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M81.25 412.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M562.5 87.5v-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 87.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m612.5 712.5 50-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M606.25 712.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M462.5 112.5v-25l-50-50h-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M456.25 112.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-150-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m562.5 737.5 75-75v-25l-25-25h-125l-75 75v75l75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 737.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M462.5 187.5v25l-25 25h-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M456.25 187.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-125 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m237.5 137.5-50 50v25l25 25h25l175-175"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M231.25 137.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm175-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m312.5 787.5 50 50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M306.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M87.5 212.5h-25l-50 50v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M81.25 212.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M37.5 812.5v-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M31.25 812.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m62.5 312.5 50-50h50l75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 312.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm175 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m837.5 12.5 25 25v50l-75 75v75l50 50h25l25-25v-100l-25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M831.25 12.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m762.5 987.5 50-50v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M756.25 987.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M437.5 1012.5v75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M431.25 1012.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M562.5 987.5v-25l25-25h50l150 150"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 987.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm225 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m737.5 962.5-125-125v-25l75-75h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M731.25 962.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-225a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m887.5 662.5-75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M881.25 662.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 987.5v-50l25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 987.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M912.5 362.5v-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M906.25 362.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m462.5 162.5-50-50v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M456.25 162.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M212.5 562.5v-25l125-125v-125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M206.25 562.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm125-275a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M387.5 537.5v75l-50 50h-25l-50-50v-25l75-75h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M381.25 537.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M637.5 812.5h50l25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M631.25 812.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 137.5h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 137.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M687.5 312.5h-175"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M681.25 312.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-175 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M637.5 387.5h-125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M631.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-125 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M162.5 62.5h50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M156.25 62.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m537.5 712.5 25-25v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M531.25 712.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M837.5 812.5h25l25-25v-50l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M831.25 812.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m712.5 1062.5-100-100h-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M706.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-125-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M337.5 187.5v-25l50-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M331.25 187.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M37.5 1012.5v-25l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M31.25 1012.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M212.5 737.5h75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M206.25 737.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 687.5h225"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 687.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm225 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M12.5 1037.5v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M6.25 1037.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M362.5 787.5v-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M356.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M512.5 62.5v100l-25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M506.25 62.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M912.5 387.5h-25l-25 25v150"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M906.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 175a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m512.5 1062.5-25-25v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M506.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M87.5 337.5v-25l25-25h50l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M81.25 337.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m562.5 887.5-50 50v25l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 887.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m262.5 912.5 25-25h125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M256.25 912.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm150-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M562.5 337.5h75l50 50v25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 337.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm125 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m62.5 87.5 25-25h50l25 25v100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 87.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M87.5 1062.5h50l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M81.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M112.5 487.5h25l50-50v-25l25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M106.25 487.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m837.5 212.5-25-25v-25l25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M831.25 212.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m312.5 512.5-25 25h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M306.25 512.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m437.5 687.5 25 25h50l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M431.25 687.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m887.5 962.5-25-25h-25l-75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M881.25 962.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-125 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m812.5 1062.5-25-25v-25l50-50h25l50 50v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M806.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m862.5 662.5 25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M856.25 662.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m387.5 187.5 25 25h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M381.25 187.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m237.5 662.5-50-50h-50l-50 50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M231.25 662.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-150 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M287.5 787.5v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M281.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M487.5 737.5v75l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M481.25 737.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M437.5 387.5v75l50 50v25l-25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M431.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 175a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m412.5 812.5-25-25v-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M406.25 812.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M537.5 537.5h100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M531.25 537.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm100 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m337.5 637.5-25-25v-50l25-25h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M331.25 637.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M512.5 687.5v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M506.25 687.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m812.5 12.5 25 25v25l-25 25v25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M806.25 12.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m337.5 437.5-75 75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M331.25 437.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m837.5 1062.5-25-25v-25l25-25h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M831.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M412.5 312.5h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M406.25 312.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M637.5 1037.5h-50l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M631.25 1037.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m437.5 537.5-50-50v-150"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M431.25 537.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-200a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M737.5 87.5h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M731.25 87.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m787.5 937.5-25-25h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M781.25 937.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M112.5 412.5v-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M106.25 412.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M137.5 137.5h-25l-25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M131.25 137.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m262.5 162.5-25 25h-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M256.25 162.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M787.5 612.5h-25l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M781.25 612.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M162.5 362.5v-25l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M156.25 362.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m337.5 1062.5-25 25h-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M331.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M912.5 962.5v-100"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M906.25 962.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 187.5h-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 187.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M862.5 187.5v75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M856.25 187.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M812.5 862.5h50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M806.25 862.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m362.5 1062.5 75-75v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M356.25 1062.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75-100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 812.5v75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 812.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m387.5 1087.5 25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M381.25 1087.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M462.5 762.5v-25l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M456.25 762.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M37.5 287.5v-25l25-25h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M31.25 287.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M687.5 112.5v125"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M681.25 112.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 125a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m812.5 787.5-50-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M806.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M437.5 187.5h-25l-25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M431.25 187.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M287.5 312.5h-25l-25-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M281.25 312.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-50-25a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m612.5 87.5-25-25v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M606.25 87.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-75a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M412.5 287.5h50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M406.25 287.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M412.5 412.5v75l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M406.25 412.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 100a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M362.5 562.5v25l-25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M356.25 562.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M562.5 112.5h50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M556.25 112.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm50 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m62.5 162.5 50 50h25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 162.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M762.5 37.5v25l25 25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M756.25 37.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm25 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M737.5 162.5v50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M731.25 162.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M62.5 787.5v-50"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M56.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm0-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M662.5 287.5h-75"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M656.25 287.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-75 0a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m537.5 787.5-25-25v-25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M531.25 787.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25-50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="M737.5 12.5h50l25 25v25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M731.25 12.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm75 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                    <Path
                        stroke={theme.svg.strokeColor}
                        strokeWidth={4.17}
                        d="m762.5 387.5-25 25v25"
                    />
                    <Path
                        fill={theme.svg.strokeColor}
                        d="M756.25 387.5a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0zm-25 50a6.25 6.25 0 1 0 12.5 0 6.25 6.25 0 1 0-12.5 0z"
                    />
                </G>
            </G>
            <Defs>
                <Mask id="a">
                    <Path fill="#fff" d="M0 0h920v1080H0z" />
                </Mask>
                <Mask id="b">
                    <Path fill="#fff" d="M0 0h920v1080H0z" />
                    <Path d="M409.37 637.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-400 450a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM459.37 887.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-425 200a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM234.37 487.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-200 475a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 712.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm475-200a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM809.37 762.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-425-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM859.37 587.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-475a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM584.37 1087.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100-400a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 512.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm250 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM584.37 862.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm325 225a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM9.37 662.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm300-450a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM359.37 362.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75 225a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM659.37 12.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 475a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM884.37 137.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM109.37 962.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-225a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM284.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm150-125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM34.37 937.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-200a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM184.37 362.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-175 125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM9.37 337.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100 200a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM709.37 112.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 375a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM434.37 312.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm200-300a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM34.37 562.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM334.37 737.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm150 125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM609.37 137.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-275 125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM684.37 887.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm225-300a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM909.37 412.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-175 250a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM9.37 12.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm475 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM84.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM709.37 462.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75-275a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM359.37 987.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM184.37 587.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm125 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM759.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM759.37 287.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75-275a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM234.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-200 225a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM184.37 337.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM684.37 1087.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-375a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM484.37 287.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm125-125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM809.37 712.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM284.37 137.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM784.37 262.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM509.37 587.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm175 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM259.37 237.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-250-200a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM484.37 337.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 175a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM159.37 737.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 150a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM884.37 1012.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM484.37 112.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM284.37 162.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-250-125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM584.37 412.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM509.37 487.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm150-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM659.37 837.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm225 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM609.37 462.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM309.37 912.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm125 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM109.37 1087.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM659.37 537.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM34.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM84.37 412.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 87.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM609.37 712.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM459.37 112.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-150-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 737.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM459.37 187.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-125 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM234.37 137.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm175-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM309.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM84.37 212.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM34.37 812.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 312.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm175 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM834.37 12.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM759.37 987.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM434.37 1012.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 987.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm225 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM734.37 962.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-225a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM884.37 662.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 987.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM909.37 362.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM459.37 162.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM209.37 562.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm125-275a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM384.37 537.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM634.37 812.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 137.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM684.37 312.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-175 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM634.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-125 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM159.37 62.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM534.37 712.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM834.37 812.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM709.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-125-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM334.37 187.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM34.37 1012.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM209.37 737.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 687.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm225 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM9.37 1037.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM359.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM509.37 62.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM909.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 175a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM509.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM84.37 337.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 887.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM259.37 912.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm150-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 337.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm125 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 87.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM84.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM109.37 487.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM834.37 212.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM309.37 512.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM434.37 687.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM884.37 962.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-125 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM809.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM859.37 662.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM384.37 187.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM234.37 662.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-150 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM284.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM484.37 737.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM434.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 175a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM409.37 812.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM534.37 537.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm100 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM334.37 637.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM509.37 687.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM809.37 12.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM334.37 437.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM834.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM409.37 312.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM634.37 1037.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM434.37 537.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-200a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM734.37 87.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM784.37 937.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM109.37 412.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM134.37 137.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM259.37 162.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM784.37 612.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM159.37 362.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM334.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM909.37 962.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 187.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM859.37 187.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM809.37 862.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM359.37 1062.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75-100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 812.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM384.37 1087.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM459.37 762.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM34.37 287.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM684.37 112.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 125a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM809.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM434.37 187.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM284.37 312.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-50-25a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM609.37 87.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-75a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM409.37 287.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM409.37 412.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 100a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM359.37 562.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM559.37 112.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm50 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 162.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM759.37 37.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm25 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM734.37 162.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM59.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm0-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM659.37 287.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-75 0a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM534.37 787.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25-50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM734.37 12.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm75 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zM759.37 387.5a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0zm-25 50a3.13 3.13 0 1 0 6.26 0 3.13 3.13 0 1 0-6.26 0z" />
                </Mask>
            </Defs>
        </Svg>
    );
};
export default Schema;

const styles = (theme) =>
    StyleSheet.create({
        backgroundSvg: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
        },
    });
