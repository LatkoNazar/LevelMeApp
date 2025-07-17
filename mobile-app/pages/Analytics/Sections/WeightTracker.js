import { LineChart } from "react-native-chart-kit";
import AppText from "../../../components/AppText";
import { Dimensions, ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import themes from "../../../design/themes";
import CurveLine from "../../../design/backgrounds/CurveLine";
import CustomTable from "../../../components/CustomTable";

export default function WeightTracker() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const screenWidth = Dimensions.get("window").width;
    const horizontalPadding = 10 * 2;
    const chartWidth = screenWidth - horizontalPadding;
    const chartHeight = (chartWidth / 5) * 3;

    const weightData = [
        { date: "2025-06-01", weight: 78.5 },
        { date: "2025-06-02", weight: 78.3 },
        { date: "2025-06-03", weight: 78.3 },
        { date: "2025-06-04", weight: 78.2 },
        { date: "2025-06-05", weight: null },
        { date: "2025-06-06", weight: 78.0 },
        { date: "2025-07-07", weight: 77.5 },
        { date: "2025-07-08", weight: null },
        { date: "2025-07-09", weight: 77.9 },
    ];

    const filteredData = weightData.filter((item) => item.weight !== null);
    const chartData = {
        labels: filteredData.map((item) =>
            item.date.slice(5).replace("-", ".")
        ),
        datasets: [
            {
                data: filteredData.map((item) => item.weight),
            },
        ],
    };

    function getColName(key) {
        switch (key) {
            case "date":
                return "Date";
            case "weight":
                return "Your Weight";
            default:
                return key;
        }
    }

    const latestWeightEntry = [...filteredData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
    const previousEntry = [...filteredData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )[1];
    const weightChange1Day = previousEntry
        ? (latestWeightEntry.weight - previousEntry.weight).toFixed(1)
        : null;

    const last7 = [...weightData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7);
    const newLast7Format = last7.map((item) => {
        return {
            date: item.date,
            weight: item.weight ? item.weight : "No info",
        };
    });
    const weightChange7Days =
        last7[6]?.weight != null && last7[0]?.weight != null
            ? (last7[0].weight - last7[6].weight).toFixed(1)
            : "(No info)";

    const stats = [
        {
            value: `${latestWeightEntry.weight} kg`,
            label: "Current",
        },
        {
            value: `${previousEntry.weight} kg`,
            label: "Previous",
        },
        weightChange1Day && {
            value: `${weightChange1Day > 0 ? "+" : ""}${weightChange1Day} kg`,
            label: "Since last entry",
        },
        {
            value:
                weightChange7Days !== null && weightChange7Days !== "(No info)"
                    ? `${
                          weightChange7Days > 0 ? "+" : ""
                      }${weightChange7Days} kg`
                    : "(No info)",
            label: "7 days",
        },
    ].filter(Boolean);
    return (
        <ScrollView
            style={style.mainContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={style.chartContainer}>
                <LineChart
                    data={chartData}
                    width={chartWidth}
                    height={chartHeight}
                    chartConfig={{
                        backgroundGradientFrom: "#012169",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#00416A",
                        backgroundGradientToOpacity: 0,
                        color: (opacity = 1) => theme.Chart.lineColor,
                        labelColor: (opacity = 1) => theme.Chart.textColor,
                        strokeWidth: 2,
                        barPercentage: 0.5,
                        useShadowColorFromDataset: false,
                        fillShadowGradientFrom: "#000000",
                        fillShadowGradientTo: "#000000",
                        fillShadowGradientFromOpacity: 0.2,
                        fillShadowGradientToOpacity: 0.2,
                        propsForDots: {
                            r: "2",
                            strokeWidth: "5",
                            stroke: theme.Chart.dot.strokeColor,
                        },
                    }}
                    style={{
                        borderRadius: 15,
                        alignSelf: "center",
                    }}
                />
            </View>

            <View style={style.statsContainerHeader}>
                <AppText style={style.title}>Your Stats</AppText>
            </View>
            <View style={style.statsContainer}>
                {stats.map((stat, index) => (
                    <View style={style.statsContainerCell} key={index}>
                        <AppText>{stat.value}</AppText>
                        <AppText style={style.statsText}>{stat.label}</AppText>
                    </View>
                ))}
            </View>

            <View style={style.tableContainer}>
                <AppText style={style.title}>History (Last 7 days)</AppText>
                <CustomTable
                    labels={Object.keys(newLast7Format[0]).map(getColName)}
                    cols={Object.keys(newLast7Format[0])}
                    data={newLast7Format}
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
        chartContainer: {
            overflow: "hidden",
        },
        tableContainer: {
            flex: 1,
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.AppTextColor,
            marginBottom: 10,
        },
        text: {
            fontSize: 16,
            color: theme.AppTextColor,
            marginBottom: 5,
        },
        statsContainerHeader: { alignItems: "center" },
        statsContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "center",
            gap: 10,
        },
        statsContainerCell: {
            width: "45%",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            backgroundColor: "lightgray",
            borderRadius: 12,
        },
        statsText: {
            fontWeight: "bold",
        },
    });
