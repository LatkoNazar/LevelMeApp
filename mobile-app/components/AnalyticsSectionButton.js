import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import themes from "../design/themes";
import { Weight } from "lucide-react-native";

export default function AnalyticsSectionButton({
    iconName,
    handlePress,
    text,
    active = false,
}) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    let IconComponent;
    switch (iconName) {
        case "Weight":
            IconComponent = (
                <Weight
                    size={32}
                    color={active ? "white" : "black"}
                    strokeWidth={1.5}
                />
            );
            break;
        default:
            IconComponent = (
                <Ionicons
                    name={iconName}
                    size={30}
                    color={active ? "white" : "black"}
                />
            );
    }

    return (
        <TouchableOpacity style={style.sectionButtonMain} onPress={handlePress}>
            <View
                style={[
                    style.profileButton,
                    {
                        backgroundColor: active
                            ? theme.AnalyticsSectionButton.activeFillColor
                            : theme.AnalyticsSectionButton.fillColor,
                    },
                ]}
            >
                {IconComponent}
            </View>
            <AppText style={style.sectionText}>{text}</AppText>
        </TouchableOpacity>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        sectionButtonMain: {
            alignItems: "center",
            justifyContent: "center",
        },
        profileButton: {
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            borderWidth: 2,
            marginHorizontal: 10,
        },
        sectionText: {
            marginTop: 4,
            fontSize: 14,
            color: theme.AnalyticsSectionButton.textColor,
        },
    });
