import React from "react";
import { Text, StyleSheet } from "react-native";

export default function AppText({ children, style, ...props }) {
    return (
        <Text style={[styles.defaultText, style]} {...props}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#27374D",
    },
});
