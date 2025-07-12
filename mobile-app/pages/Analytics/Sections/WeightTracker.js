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
    const horizontalPadding = 10 * 2;
    const chartWidth = screenWidth - horizontalPadding;
    const chartHeight = (chartWidth / 5) * 3;

    const weightData = [
        { date: "2025-06-01", weight: 78.5 },
        { date: "2025-06-05", weight: 79.3 },
        { date: "2025-06-10", weight: 78.3 },
        { date: "2025-06-15", weight: 78.2 },
        { date: "2025-06-20", weight: null },
        { date: "2025-06-25", weight: 78.0 },
        { date: "2025-07-01", weight: 77.5 },
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

    const newWeightDataFormat = weightData.map((item) => {
        return {
            date: item.date,
            weight: item.weight ? item.weight : "No info",
        };
    });

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
                <AppText style={style.title}>History</AppText>
                <CustomTable
                    labels={Object.keys(newWeightDataFormat[0]).map(getColName)}
                    cols={Object.keys(newWeightDataFormat[0])}
                    data={newWeightDataFormat}
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
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.AppTextColor,
            marginBottom: 10,
        },
    });
