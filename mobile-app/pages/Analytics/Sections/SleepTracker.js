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
            date: "2025-07-06",
            sleepTime: "2025-07-05T23:45:00",
            wakeTime: "2025-07-06T07:15:00",
            rating: 8,
        },
        {
            date: "2025-07-07",
            sleepTime: "2025-07-07T00:30:00",
            wakeTime: "2025-07-07T07:00:00",
            rating: 6,
        },
        {
            date: "2025-07-08",
            sleepTime: "2025-07-07T23:00:00",
            wakeTime: "2025-07-08T06:30:00",
            rating: 7,
        },
        {
            date: "2025-07-09",
            sleepTime: "2025-07-09T01:00:00",
            wakeTime: "2025-07-09T08:00:00",
            rating: 5,
        },
        {
            date: "2025-07-10",
            sleepTime: "2025-07-09T22:45:00",
            wakeTime: "2025-07-10T06:45:00",
            rating: 9,
        },
        {
            date: "2025-07-11",
            sleepTime: null,
            wakeTime: null,
            rating: null,
        },
        {
            date: "2025-07-12",
            sleepTime: "2025-07-12T00:00:00",
            wakeTime: "2025-07-12T07:45:00",
            rating: 6,
        },
    ];

    const hoursArray = sleepData
        .filter((item) => item.sleepTime && item.wakeTime)
        .map((item) => {
            const sleep = new Date(item.sleepTime);
            const wake = new Date(item.wakeTime);
            const diff = (wake - sleep) / (1000 * 60 * 60);
            return +diff.toFixed(2);
        });

    const avg = hoursArray.reduce((a, b) => a + b, 0) / hoursArray.length;
    const min = Math.min(...hoursArray);
    const max = Math.max(...hoursArray);

    const newSleepDataFormat = sleepData.map((item) => {
        return {
            date: item.date.slice(5),
            sleepTime: item.sleepTime
                ? item.sleepTime.split("T")[1]
                : "No info",
            wakeTime: item.wakeTime ? item.wakeTime.split("T")[1] : "No info",
            rating: item.rating ? item.rating : "No info",
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
            case "rating":
                return "Feelings";
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
