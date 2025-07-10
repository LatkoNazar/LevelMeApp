import { LineChart } from "react-native-chart-kit";
import AppText from "../../../components/AppText";
import { Dimensions } from "react-native";
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
    const horizontalPadding = 10 * 2; // зліва + справа
    const chartWidth = screenWidth - horizontalPadding;
    const chartHeight = (chartWidth / 5) * 3;

    const weightData = [
        { date: "2025-06-01", weight: 78.5 },
        { date: "2025-06-05", weight: 77.9 },
        { date: "2025-06-10", weight: 77.4 },
        { date: "2025-06-15", weight: 76.8 },
        { date: "2025-06-20", weight: 76.2 },
        { date: "2025-06-25", weight: 75.7 },
        { date: "2025-07-01", weight: 75.0 },
    ];
    const chartData = {
        labels: weightData.map((item) => item.date.slice(5).replace("-", ".")),
        datasets: [
            {
                data: weightData.map((item) => item.weight),
            },
        ],
    };

    return (
        <View style={style.mainContainer}>
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
            <View style={style.tableContainer}>
                <View style={style.statsTitleContainer}>
                    <AppText style={style.statsTitleText}>History</AppText>
                </View>
                <View style={style.statsContainer}>
                    <CustomTable
                        cols={Object.keys(weightData[0])}
                        data={weightData}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            padding: 10,
            alignSelf: "center",
            backgroundColor: "transparent",
        },
        chartContainer: {
            borderRadius: 15,
            overflow: "hidden",
        },
        statsTitleContainer: { marginBottom: 10 },
        statsTitleText: {
            fontWeight: "bold",
            fontSize: 20,
            color: theme.WeightTracker.titleColor,
        },
        tableContainer: {
            margin: 10,
        },
    });
