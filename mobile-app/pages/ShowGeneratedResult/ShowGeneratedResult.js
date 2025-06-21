import { useRoute, useNavigation } from "@react-navigation/native";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLayoutEffect } from "react";
import AppText from "../../components/AppText";

export default function ShowGeneratedResult() {
    const route = useRoute();
    const navigation = useNavigation();
    const { title, content } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation, title]);

    return (
        <ScrollView style={styles.container}>
            <View>
                {content.map((trainingDay) => (
                    <View key={trainingDay.day} style={styles.dayBlock}>
                        <AppText style={styles.dayTitle}>
                            {trainingDay.day}
                        </AppText>
                        {trainingDay.groups.map((group) => (
                            <View key={group.name} style={styles.group}>
                                <AppText style={styles.groupText}>
                                    {group.name} ({group.count})
                                </AppText>
                                {group.exercises.map((ex) => (
                                    <TouchableOpacity
                                        key={`${group.name}-${ex.name}`}
                                        style={styles.exerciseContainer}
                                    >
                                        <AppText style={styles.exerciseText}>
                                            {ex.name}
                                        </AppText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#526D82",
        padding: 16,
    },
    dayBlock: {
        marginBottom: 24,
    },
    dayTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#DDE6ED",
        marginBottom: 8,
    },
    group: {
        marginBottom: 12,
        paddingLeft: 10,
    },
    groupText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#F5F5F5",
    },
    exerciseText: {
        fontSize: 14,
        color: "#E0E0E0",
        marginLeft: 10,
    },
    exerciseContainer: {
        padding: 5,
        backgroundColor: "#27374D",
        borderRadius: 10,
        marginVertical: 5,
    },
});
