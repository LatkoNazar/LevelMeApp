import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import { useEffect, useState } from "react";
import AppText from "../../components/AppText";
import AnalyticsSectionButton from "../../components/AnalyticsSectionButton";
import { useNavigation } from "@react-navigation/native";

import WeightTracker from "./Sections/WeightTracker";

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
                return <AppText>Sleep Section (в розробці)</AppText>;
            default:
                return <AppText>Оберіть секцію</AppText>;
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
            borderRadius: 15,
            overflow: "hidden",
        },
    });
