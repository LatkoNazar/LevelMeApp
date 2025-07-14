import { useRoute, useNavigation } from "@react-navigation/native";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLayoutEffect } from "react";
import AppText from "../../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import ExpandableContainer from "../../components/ExpandableContainer";
import ExerciseCard from "../../components/cards/ExerciseCard";

import themes from "../../design/themes";
import { config } from "../../config";
import { useSelector } from "react-redux";

import ShowGeneratedTrainingProgram from "./ShowGeneratedTrainingProgram";
import ShowGeneratedNutritionPlan from "./ShowGeneratedNutritionPlan";

import CurveLine from "../../design/backgrounds/CurveLine";

export default function ShowGeneratedResult(props) {
    const token = useSelector((state) => state.auth.token);
    const route = useRoute();
    const navigation = useNavigation();
    const { title, content, saveOpt, planType } = route.params;
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation, title]);

    async function handleSavePlan() {
        fetch(`${config.BACKEND_URL}/chatbot/generated-plan/save-plan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                plan: content,
                plan_type: planType,
            }),
        });
    }
    return (
        <>
            <CurveLine />
            {planType === "training_program" && (
                <ShowGeneratedTrainingProgram
                    content={content}
                    saveOpt={saveOpt}
                    handleSavePlan={handleSavePlan}
                />
            )}
            {planType === "nutrition_plan" && (
                <ShowGeneratedNutritionPlan
                    content={content}
                    saveOpt={saveOpt}
                    handleSavePlan={handleSavePlan}
                />
            )}
        </>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: "transparent",
            padding: 16,
        },
        dayBlock: {
            backgroundColor: theme.ShowGeneratedresult.BackgroundColor,
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
