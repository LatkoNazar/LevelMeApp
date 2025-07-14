import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import themes from "../../design/themes";
import AppText from "../../components/AppText";

export default function DailyHealthEntryButton(props) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    return (
        <View style={style.main}>
            <TouchableOpacity
                style={style.enterData}
                onPress={props.handlePress}
            >
                <AppText style={style.buttonText}>Enter Data</AppText>
            </TouchableOpacity>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: { justifyContent: "flex-start" },
        enterData: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.DailyHealthEntryButton.fillColor,
            alignItems: "center",
            alignSelf: "flex-start",
            borderRadius: 8,
            maxWidth: 250,
        },
        buttonText: { color: theme.DailyHealthEntryButton.textColor },
    });
