import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import themes from "../../../design/themes";
import { useSelector } from "react-redux";
import { useState } from "react";
import AppText from "../../../components/AppText";

export default function UsersContributionGraph() {
    const screenWidth = Dimensions.get("window").width;
    const horizontalPadding = 10 * 2;
    const chartWidth = screenWidth - horizontalPadding;
    const chartHeight = (chartWidth / 5) * 3;

    const currentTheme = useSelector((state) => state.theme.mode);
    const theme = themes[currentTheme] || themes.standard;
    const style = styles(theme);

    const format = (date) => date.toISOString().split("T")[0];

    const activeDates = [
        format(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
        format(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
        format(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
    ];

    const commitsData = [];

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);

    const diffTime = Math.abs(endDate - startDate);
    const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
    ) {
        const isoDate = d.toISOString().split("T")[0];
        commitsData.push({
            date: isoDate,
            count: activeDates.includes(isoDate) ? 1 : 0,
        });
    }

    const [selectedDay, setSelectedDay] = useState(null);

    const onDayPress = (day) => {
        if (selectedDay && selectedDay.date === day.date) {
            setSelectedDay(null);
        } else {
            setSelectedDay(day);
        }
    };

    return (
        <View style={style.main}>
            {selectedDay && (
                <View style={style.tooltip}>
                    <AppText style={style.tooltipDate}>
                        {selectedDay.date}
                    </AppText>
                    <TouchableOpacity onPress={() => setSelectedDay(null)}>
                        <AppText style={style.tooltipClose}>Close</AppText>
                    </TouchableOpacity>
                </View>
            )}
            <ContributionGraph
                values={commitsData}
                startDate={startDate}
                endDate={endDate}
                numDays={numDays}
                width={screenWidth}
                height={chartHeight}
                squareSize={25}
                chartConfig={{
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{
                    borderRadius: 15,
                    alignSelf: "center",
                }}
                onDayPress={onDayPress}
            />
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        tooltip: {
            position: "absolute",
            top: 10,
            left: 20,
            backgroundColor: theme.Tooltip.fillColor,
            borderWidth: 1,
            borderColor: theme.Tooltip.borderColor,
            padding: 10,
            borderRadius: 8,
            zIndex: 1000,
        },
        tooltipDate: {
            color: theme.Tooltip.textColor,
            fontWeight: "bold",
            fontSize: 16,
        },
        tooltipClose: {
            color: theme.Tooltip.closeTextColor,
            marginTop: 8,
            fontSize: 14,
            textDecorationLine: "underline",
        },
    });
