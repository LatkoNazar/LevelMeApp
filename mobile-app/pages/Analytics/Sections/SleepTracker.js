import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import themes from "../../../design/themes";
import AppText from "../../../components/AppText";
import CustomTable from "../../../components/CustomTable";

export default function SleepTracker() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const sleepData = [
        {
            date: "2025-07-13",
            sleepTime: "2025-07-13T02:40:00",
            wakeTime: "2025-07-13T11:15:00",
            timeSlept: 8.35,
        },
        {
            date: "2025-07-14",
            sleepTime: "2025-07-14T03:15:00",
            wakeTime: "2025-07-14T11:30:00",
            timeSlept: 8.22,
        },
        {
            date: "2025-07-15",
            sleepTime: "2025-07-15T02:25:00",
            wakeTime: "2025-07-15T12:05:00",
            timeSlept: 9.6,
        },
        {
            date: "2025-07-16",
            sleepTime: "2025-07-16T02:50:00",
            wakeTime: "2025-07-16T10:45:00",
            timeSlept: 7.8,
        },
        {
            date: "2025-07-17",
            sleepTime: "2025-07-17T03:10:00",
            wakeTime: "2025-07-17T13:05:00",
            timeSlept: 9.9,
        },
        {
            date: "2025-07-18",
            sleepTime: null,
            wakeTime: null,
            timeSlept: null,
        },
        {
            date: "2025-07-19",
            sleepTime: "2025-07-19T02:35:00",
            wakeTime: "2025-07-19T11:00:00",
            timeSlept: 8.01,
        },
    ];

    const validSleepTimes = sleepData
        .map((entry) => entry.timeSlept)
        .filter((val) => typeof val === "number" && !isNaN(val));

    const avg =
        validSleepTimes.reduce((a, b) => a + b, 0) / validSleepTimes.length;
    const min = Math.min(...validSleepTimes);
    const max = Math.max(...validSleepTimes);

    const newSleepDataFormat = sleepData.map((item) => {
        return {
            date: item.date.slice(5),
            sleepTime: item.sleepTime
                ? item.sleepTime.split("T")[1]
                : "No info",
            wakeTime: item.wakeTime ? item.wakeTime.split("T")[1] : "No info",
            timeSlept: item.timeSlept ? item.timeSlept + " hrs." : "No info",
        };
    });

    function getColName(key) {
        switch (key) {
            case "date":
                return "Date";
            case "sleepTime":
                return "Sleep Time";
            case "wakeTime":
                return "Wake Time";
            case "timeSlept":
                return "Time Slept";
            default:
                return key;
        }
    }

    return (
        <ScrollView
            style={style.mainContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={style.statsBlock}>
                <AppText style={style.title}>Your Stats</AppText>
                <AppText style={style.text}>
                    Mean: {avg.toFixed(2)} hrs.
                </AppText>
                <AppText style={style.text}>
                    Minimum: {min.toFixed(2)} hrs.
                </AppText>
                <AppText style={style.text}>
                    Maximum: {max.toFixed(2)} hrs.
                </AppText>
            </View>

            <View style={style.tableContainer}>
                <AppText style={style.title}>History</AppText>
                <CustomTable
                    labels={Object.keys(newSleepDataFormat[0]).map(getColName)}
                    cols={Object.keys(newSleepDataFormat[0])}
                    data={newSleepDataFormat}
                />
            </View>
        </ScrollView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        statsBlock: {
            marginBottom: 20,
        },
        text: {
            fontSize: 16,
            color: theme.AppTextColor,
            marginBottom: 5,
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.AppTextColor,
            marginBottom: 10,
        },
        tableContainer: {
            flex: 1,
        },
    });
