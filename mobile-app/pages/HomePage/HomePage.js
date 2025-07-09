import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import { useEffect } from "react";
import DailyQuote from "./Details/DailyQuote";

export default function HomePage() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <View style={style.main}>
            <DailyQuote />
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
    });
