import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import { useState, useEffect } from "react";
import DailyQuote from "./Details/DailyQuote";
import DailyHealthEntryButton from "../../components/buttons/DailyHealthEntryButton";
import UsersContributionGraph from "./Details/ContributionGraph";
import { useNavigation } from "@react-navigation/native";
import { createUserClient } from "../../api/userClient";

export default function HomePage() {
    const token = useSelector((state) => state.auth.token);
    const api = createUserClient(token);
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    const [lastActivityDate, setLastActivityDate] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        const getLastActivity = async () => {
            const lastActivity = await api.getLastActivityDate();
            setLastActivityDate(lastActivity.date);
        };
        getLastActivity();
    }, []);

    function handleDailyHealthEntryButtonPress() {
        navigation.navigate("Daily Health Entry");
    }
    return (
        <View style={style.main}>
            <DailyQuote />
            <View style={style.DailyHealthEntry}>
                <AppText style={style.label}>Your Daily Health Entry</AppText>
                <DailyHealthEntryButton
                    disabled={
                        new Date().toISOString().split("T")[0] ===
                        lastActivityDate
                    }
                    handlePress={handleDailyHealthEntryButtonPress}
                />
                <AppText style={{ color: "black", alignSelf: "center" }}>
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
        label: {
            marginBottom: 10,
            color: theme.textColor,
        },
    });
