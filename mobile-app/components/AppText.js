import React from "react";
import { Text, StyleSheet } from "react-native";

import { useSelector } from "react-redux";
import themes from "../design/themes";

export default function AppText({ children, style, ...props }) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const textStyle = styles(theme);
    return (
        <Text style={[textStyle.defaultText, style]} {...props}>
            {children}
        </Text>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        defaultText: {
            fontFamily: "Arial",
            fontSize: 16,
            color: theme.AppTextColor,
        },
    });
