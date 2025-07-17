import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import themes from "../../../design/themes";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import AppText from "../../../components/AppText";
import config from "../../../config";
import { createUserClient } from "../../../api/userClient";

export default function UsersContributionGraph() {
    const token = useSelector((state) => state.auth.token);
    const api = createUserClient(token);

    const screenWidth = Dimensions.get("window").width;
    const horizontalPadding = 10 * 2;
    const chartWidth = screenWidth - horizontalPadding;
    const chartHeight = (chartWidth / 5) * 3;

    const currentTheme = useSelector((state) => state.theme.mode);
    const theme = themes[currentTheme] || themes.standard;
    const style = styles(theme);

    const [activityDates, setActivityDates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getUserActivityDates();
                setActivityDates(data.dates || []);
            } catch (error) {
                console.error("Failed to fetch activity dates:", error);
            }
        };
        fetchData();
    }, []);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);

    const diffTime = Math.abs(endDate - startDate);
    const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const commitsData = useMemo(() => {
        const data = [];
        for (
            let d = new Date(startDate);
            d <= endDate;
            d.setDate(d.getDate() + 1)
        ) {
            const isoDate = d.toISOString().split("T")[0];
            data.push({
                date: isoDate,
                count: activityDates.includes(isoDate) ? 1 : 0,
            });
        }
        return data;
    }, [activityDates]);

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
                    backgroundGradientFrom:
                        theme.contributionGraph.backgroundColor,
                    backgroundGradientTo:
                        theme.contributionGraph.backgroundColor,
                    color: (opacity) =>
                        `rgba(${theme.contributionGraph.color}, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(${theme.contributionGraph.labelColor}, ${opacity})`,
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
