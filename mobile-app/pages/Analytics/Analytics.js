import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import { useEffect, useState } from "react";
import AppText from "../../components/AppText";
import AnalyticsSectionButton from "../../components/buttons/AnalyticsSectionButton";
import { useNavigation } from "@react-navigation/native";

import WeightTracker from "./Sections/WeightTracker";
import SleepTracker from "./Sections/SleepTracker";
import MoodTracker from "./Sections/MoodTracker";

export default function Analytics() {
    const navigation = useNavigation();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const [currentSection, setCurrentSection] = useState("Weight Tracker");

    const renderSection = () => {
        switch (currentSection) {
            case "Weight":
                return <WeightTracker />;
            case "Sleep":
                return <SleepTracker />;
            case "Mood":
                return <MoodTracker />;
            default:
                return (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <AppText>Оберіть секцію</AppText>
                    </View>
                );
        }
    };

    return (
        <View style={style.main}>
            <View style={{ flexGrow: 0 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={style.scrollContainer}
                >
                    <AnalyticsSectionButton
                        text={"Weight"}
                        iconName={"Weight"}
                        handlePress={() => {
                            setCurrentSection("Weight");
                        }}
                        active={currentSection === "Weight"}
                    />
                    <AnalyticsSectionButton
                        text={"Sleep"}
                        iconName={"moon-outline"}
                        handlePress={() => {
                            setCurrentSection("Sleep");
                        }}
                        active={currentSection === "Sleep"}
                    />
                    <AnalyticsSectionButton
                        text={"Mood"}
                        iconName={"happy-outline"}
                        handlePress={() => {
                            setCurrentSection("Mood");
                        }}
                        active={currentSection === "Mood"}
                    />
                </ScrollView>
            </View>
            <View style={style.chartContainer}>{renderSection()}</View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            padding: 5,
            flexDirection: "column",
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        scrollContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
            height: 100,
        },
        chartContainer: {
            flex: 1,
            overflow: "hidden",
        },
    });
