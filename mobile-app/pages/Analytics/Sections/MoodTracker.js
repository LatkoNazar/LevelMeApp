import { LineChart } from "react-native-chart-kit";
import AppText from "../../../components/AppText";
import { Dimensions } from "react-native";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import themes from "../../../design/themes";
import CustomTable from "../../../components/CustomTable";

export default function MoodTracker() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    const moodData = [
        { date: "2025-07-06", mood: 7 },
        { date: "2025-07-07", mood: 5 },
        { date: "2025-07-08", mood: 8 },
        { date: "2025-07-09", mood: 4 },
        { date: "2025-07-10", mood: 6 },
        { date: "2025-07-11", mood: null },
        { date: "2025-07-12", mood: 9 },
        { date: "2025-07-13", mood: 3 },
    ];

    function getColName(key) {
        switch (key) {
            case "date":
                return "Date";
            case "mood":
                return "Your Mood";
            default:
                return key;
        }
    }

    const newMoodDataFormat = moodData.map((item) => {
        return {
            date: item.date,
            mood: item.mood ? item.mood : "No info",
        };
    });

    const lastMoodEntry = [...moodData].reverse().find((d) => d.mood !== null);
    const currentMood = lastMoodEntry ? lastMoodEntry.mood : 0;
    const moodPercentage = (currentMood / 10) * 100;

    const validMoods = moodData
        .filter((d) => d.mood !== null)
        .map((d) => d.mood);
    const avgMood = validMoods.length
        ? (
              validMoods.reduce((sum, val) => sum + val, 0) / validMoods.length
          ).toFixed(2)
        : "No data";

    return (
        <View style={style.mainContainer}>
            <View style={{ alignItems: "center" }}>
                <AppText>Your mood now</AppText>
            </View>
            <View style={style.chartContainer}>
                <View style={style.chartBox}>
                    <AppText>Bad</AppText>
                    <View style={style.scaleBackground}>
                        <View
                            style={[
                                style.moodScale,
                                { width: `${moodPercentage}%` },
                            ]}
                        />
                    </View>
                    <AppText>Good</AppText>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <AppText style={{ fontSize: 18, fontWeight: "bold" }}>
                    Average Mood: {avgMood}
                </AppText>
            </View>
            <View style={style.tableContainer}>
                <AppText style={style.title}>History</AppText>
                <CustomTable
                    labels={Object.keys(newMoodDataFormat[0]).map(getColName)}
                    cols={Object.keys(newMoodDataFormat[0])}
                    data={newMoodDataFormat}
                />
            </View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        chartContainer: {
            overflow: "hidden",
        },
        tableContainer: {
            flex: 1,
            marginTop: 20,
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.AppTextColor,
            marginBottom: 10,
        },
        chartBox: {
            flexDirection: "row",
            width: "100%",
        },
        scaleBackground: {
            flex: 1,
            marginHorizontal: 10,
            backgroundColor: "#ccc",
            borderRadius: 10,
            overflow: "hidden",
        },
        moodScale: {
            height: 20,
            width: "50%",
            backgroundColor: theme.MoodTracker.moodScaleColor,
        },
    });
