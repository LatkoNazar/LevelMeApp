import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import { useEffect } from "react";
import DailyQuote from "./Details/DailyQuote";
import DailyHealthEntryButton from "../../components/buttons/DailyHealthEntryButton";
import UsersContributionGraph from "./Details/ContributionGraph";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const navigation = useNavigation();

    function handleDailyHealthEntryButtonPress() {
        navigation.navigate("Daily Health Entry");
    }

    return (
        <View style={style.main}>
            <DailyQuote />
            <View style={style.DailyHealthEntry}>
                <AppText style={{ marginBottom: 5 }}>
                    Your Daily Health Entry
                </AppText>
                <DailyHealthEntryButton
                    handlePress={handleDailyHealthEntryButtonPress}
                />
                <AppText style={{ marginTop: 10, alignSelf: "center" }}>
                    Activity Graph
                </AppText>
                <UsersContributionGraph />
            </View>
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
        DailyHealthEntry: {
            marginTop: 10,
        },
    });
