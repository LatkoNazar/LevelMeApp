import { useRoute, useNavigation } from "@react-navigation/native";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLayoutEffect } from "react";
import AppText from "../../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import ExpandableContainer from "../../components/ExpandableContainer";
import ExerciseCard from "../../components/ExerciseCard";

import themes from "../../design/themes";
import { useSelector } from "react-redux";

export default function ShowGeneratedResult() {
    const route = useRoute();
    const navigation = useNavigation();
    const { title, content } = route.params;

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation, title]);
    return (
        <ScrollView style={style.container}>
            <View>
                {content.map((trainingDay) => (
                    <View key={trainingDay.day} style={style.dayBlock}>
                        <AppText style={style.dayTitle}>
                            {trainingDay.day}
                        </AppText>
                        {trainingDay.groups.map((group) => (
                            <View key={group.name} style={style.group}>
                                <AppText style={style.groupText}>
                                    {group.name} ({group.count})
                                </AppText>
                                {group.exercises.map((ex) => (
                                    <ExpandableContainer
                                        key={`${group.name}-${ex.name}`}
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
        </ScrollView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.mainBackgroundContainerColor,
            padding: 16,
        },
        dayBlock: {
            marginBottom: 24,
        },
        dayTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: theme.ShowGeneratedresultsTextColor,
            marginBottom: 8,
        },
        group: {
            marginBottom: 12,
            paddingLeft: 10,
        },
        groupText: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.ShowGeneratedresultsTextColor,
        },
        exerciseText: {
            fontSize: 14,
            color: theme.ShowGeneratedresultsTextColor,
            marginLeft: 10,
        },
    });
