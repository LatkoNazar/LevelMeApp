import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import themes from "../design/themes";
import { useSelector } from "react-redux";

export default function ExpandableContainer({ title, children }) {
    const [expanded, setExpanded] = useState(false);

    const handleDropdownDescription = () => {
        setExpanded(!expanded);
    };

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <View style={style.exerciseContainer}>
            <TouchableOpacity
                style={style.header}
                onPress={handleDropdownDescription}
            >
                <Text style={style.title}>{title}</Text>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>
            {expanded && <View style={style.content}>{children}</View>}
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        exerciseContainer: {
            backgroundColor: theme.ExpandableContainer.BackgroundColor,
            borderRadius: 10,
            marginVertical: 5,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
        },
        title: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
        },
        content: {
            padding: 12,
            backgroundColor: theme.ExpandableContainer.ContentBackgroundColor,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
    });
