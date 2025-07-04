import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../design/themes";

export default function HomePage() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    return (
        <View style={style.main}>
            <AppText>Home Page</AppText>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.mainBackgroundContainerColor,
        },
    });
