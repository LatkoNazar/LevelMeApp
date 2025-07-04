import * as React from "react";
import Svg, { G, Path, Defs, Mask } from "react-native-svg";
import themes from "../themes";
import { useSelector } from "react-redux";
import { StyleSheet, useWindowDimensions } from "react-native";

function ShinyOverlay(props) {
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
            viewBox="0 0 920 1080"
            style={style.backgroundSvg}
            {...props}
        >
            <G mask='url("#SvgjsMask1018")' fill="none">
                <Path fill="rgba(82, 109, 130, 1)" d="M0 0H920V1080H0z" />
                <Path
                    d="M920 0H675.79L920 88.64z"
                    fill="rgba(255, 255, 255, .1)"
                />
                <Path
                    d="M675.79 0L920 88.64v54.63L384.25 0z"
                    fill="rgba(255, 255, 255, .075)"
                />
                <Path
                    d="M384.25 0L920 143.27v217.02L145.7 0z"
                    fill="rgba(255, 255, 255, .05)"
                />
                <Path
                    d="M145.7 0L920 360.29v298.39L112.82 0z"
                    fill="rgba(255, 255, 255, .025)"
                />
                <Path d="M0 1080h104.5L0 597.01z" fill="rgba(0, 0, 0, .1)" />
                <Path
                    d="M0 597.01L104.5 1080h210.33L0 373.48z"
                    fill="rgba(0, 0, 0, .075)"
                />
                <Path
                    d="M0 373.48L314.83 1080h233.65L0 302.6z"
                    fill="rgba(0, 0, 0, .05)"
                />
                <Path
                    d="M0 302.6L548.48 1080h39.38L0 280.1z"
                    fill="rgba(0, 0, 0, .025)"
                />
            </G>
            <Defs>
                <Mask id="SvgjsMask1018">
                    <Path fill="#fff" d="M0 0H920V1080H0z" />
                </Mask>
            </Defs>
        </Svg>
    );
}

export default ShinyOverlay;

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
