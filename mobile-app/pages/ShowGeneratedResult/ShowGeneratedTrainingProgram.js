import themes from "../../design/themes";
import { useSelector } from "react-redux";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import ExpandableContainer from "../../components/ExpandableContainer";
import ExerciseCard from "../../components/ExerciseCard";

export default function ShowGeneratedTrainingProgram({
    content,
    saveOpt,
    handleSavePlan,
}) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    return (
        <ScrollView style={style.container}>
            <View>
                {content.map((trainingDay, dayIndex) => (
                    <View
                        key={`${trainingDay.day}-${dayIndex}`}
                        style={style.dayBlock}
                    >
                        <AppText style={style.dayTitle}>
                            {trainingDay.day}
                        </AppText>
                        {trainingDay.groups.map((group) => (
                            <View key={group.name} style={style.group}>
                                <View style={style.groupHeader}>
                                    <AppText style={style.groupText}>
                                        {group.name} ({group.count})
                                    </AppText>
                                </View>
                                {group.exercises.map((ex, exIndex) => (
                                    <ExpandableContainer
                                        key={`ex-${group.name}-${ex.name}-${exIndex}`}
                                        title={ex.name}
                                    >
                                        <ExerciseCard item={ex} />
                                    </ExpandableContainer>
                                ))}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            {saveOpt && (
                <TouchableOpacity
                    style={style.saveButton}
                    onPress={handleSavePlan}
                >
                    <AppText>Save Plan</AppText>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: "transparent",
            padding: 16,
        },
        dayBlock: {
            backgroundColor: theme.ShowGeneratedResult.BackgroundColor,
            borderRadius: 14,
            padding: 16,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
            borderColor: "white",
            borderWidth: 1,
        },
        dayTitle: {
            fontSize: 22,
            fontWeight: "700",
            color: theme.ShowGeneratedresult.TextColor,
            marginBottom: 12,
        },
        group: {
            marginBottom: 16,
        },
        groupHeader: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#2a2a2a",
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 12,
            alignSelf: "flex-start",
            marginBottom: 10,
        },
        groupText: {
            fontSize: 15,
            fontWeight: "600",
            color: "#fff",
        },
        exerciseText: {
            fontSize: 14,
            color: theme.ShowGeneratedresults.TextColor,
            marginLeft: 10,
        },
        saveButton: {
            backgroundColor: "lightblue",
            padding: 16,
            borderRadius: 14,
            alignItems: "center",
            marginBottom: 20,
            shadowColor: "#34C759",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
        },
    });
