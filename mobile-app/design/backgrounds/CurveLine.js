import * as React from "react";
import { useSelector } from "react-redux";
import themes from "../themes";
import { StyleSheet, useWindowDimensions } from "react-native";
import Svg, { G, Path, Defs, Mask } from "react-native-svg";

const CurveLine = (props) => {
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
            <G mask='url("#SvgjsMask1043")' fill="none">
                <Path fill={theme.svg.fillColor} d="M0 0H920V1080H0z" />
                <Path
                    d="M222.49 1244.8c156.72-90.65 79.76-516.16 361.74-627.36 281.97-111.2 239.44-319.38 361.73-345.6M409.96 1293.88c132.46-73.36 55.3-399.08 309.51-520.61 254.2-121.53 188.26-372.46 309.5-421.2"
                    stroke={theme.svg.strokeColor}
                    strokeWidth={2}
                />
                <Path
                    d="M401.82 1136.44c177.72-203.26 98.66-957.72 342.47-1024.26 243.8-66.54 233.08 263.63 342.46 280.8"
                    stroke={theme.svg.strokeColor}
                    strokeWidth={2}
                />
                <Path
                    d="M469.2 1160.91c98.56-125.73 25.39-600.38 185.45-611.52 160.06-11.14 254.14 274.85 370.9 291.6"
                    stroke={theme.svg.strokeColor}
                    strokeWidth={2}
                />
                <Path
                    d="M358.34 1122.13c118.31-109.74-53.32-463.03 239.87-599.26 293.2-136.23 315.23-437.37 479.75-475.2"
                    stroke={theme.svg.strokeColor}
                    strokeWidth={2}
                />
            </G>
            <Defs>
                <Mask id="SvgjsMask1043">
                    <Path fill="#fff" d="M0 0H920V1080H0z" />
                </Mask>
            </Defs>
        </Svg>
    );
};

export default CurveLine;

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
