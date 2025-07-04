import * as React from "react";
import Svg, { G, Path, Defs, Mask } from "react-native-svg";
import themes from "../themes";
import { useSelector } from "react-redux";
import { StyleSheet, useWindowDimensions } from "react-native";

const Waves = (props) => {
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
                <Path fill="#27374D" d="M0 0h920v1080H0z" />
                <Path
                    fill="#0f4c75"
                    d="M0 183c61.4 67.4 184.2 334.8 307 337 122.8 2.2 184.4-327.2 307-326 122.6 1.2 244.8 265.6 306 332v554H0z"
                />
                <Path
                    fill="#526D82"
                    d="M0 632c61.4 54.4 184.2 248.2 307 272 122.8 23.8 184.4-155.6 307-153 122.6 2.6 244.8 132.8 306 166v163H0z"
                />
            </G>
            <Defs>
                <Mask id="a">
                    <Path fill="#fff" d="M0 0h920v1080H0z" />
                </Mask>
            </Defs>
        </Svg>
    );
};
export default Waves;

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
