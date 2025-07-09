import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import themes from "../design/themes";
import { Weight } from "lucide-react-native";

export default function SectionButton(props) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    let IconComponent;
    switch (props.iconName) {
        case "Weight":
            IconComponent = (
                <Weight size={32} color="black" strokeWidth={1.5} />
            );
            break;
        default:
            IconComponent = (
                <Ionicons name={props.iconName} size={30} color="black" />
            );
    }

    return (
        <TouchableOpacity
            style={style.profileButton}
            onPress={props.handlePress}
        >
            {IconComponent}
            <AppText style={style.profileButtonText}>{props.text}</AppText>
        </TouchableOpacity>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        profileButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.ProfileButtonBackgroundColor,
            borderRadius: 15,
            padding: 10,
            margin: 10,
        },
        profileButtonText: {
            marginLeft: 10,
            fontWeight: "bold",
        },
    });
