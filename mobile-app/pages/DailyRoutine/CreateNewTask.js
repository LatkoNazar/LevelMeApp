﻿import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";

import themes from "../../design/themes";
import { useSelector } from "react-redux";

export default function CreateNewTask() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    return (
        <View style={style.main}>
            <AppText>Create a New Task</AppText>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: theme.mainBackgroundContainerColor,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
