import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from "react-native";
import AppText from "../../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../../design/themes";
import CurveLine from "../../../design/backgrounds/CurveLine";
import { useState } from "react";
import { config } from "../../../config.js";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

const nutritionGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Maintenance",
    "Vegan",
    "Keto",
    "Low Carb",
];

export default function GenerateNutritionPlan() {
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const [productsInput, setProductsInput] = useState("");
    const [allergiesInput, setAllergiesInput] = useState("");
    const [goal, setGoal] = useState(null);
    const [customNotes, setCustomNotes] = useState("");

    async function handleSubmit() {
        if (!goal || productsInput.trim().length === 0) {
            Alert.alert(
                "Missing Info",
                "Please enter at least one product and select a nutrition goal."
            );
            return;
        }

        try {
            const response = await fetch(
                `${config.BACKEND_URL}/generators/generate-nutrition-plan`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        available_products: productsInput,
                        allergies_list: allergiesInput,
                        goal: goal,
                        additional_notes: customNotes,
                    }),
                }
            );

            const data = await response.json();
            navigation.navigate("Your Generated Result", {
                title: "Nutrition Plan",
                content: data.plan,
                saveOpt: true,
                planType: "nutrition_plan",
            });
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error("Submit error:", error);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
        >
            <CurveLine />
            <View style={style.mainContainer}>
                <ScrollView
                    style={style.main}
                    keyboardShouldPersistTaps="handled"
                >
                    <AppText style={style.detailtTitle}>
                        Enter Available Products*
                    </AppText>
                    <TextInput
                        multiline
                        placeholder="e.g. Milk, Eggs, Rice, Chicken"
                        placeholderTextColor={style.textInput.color}
                        style={style.textInput}
                        value={productsInput}
                        onChangeText={setProductsInput}
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                    />

                    <AppText style={style.detailtTitle}>
                        Enter Allergies
                    </AppText>
                    <TextInput
                        multiline
                        placeholder="e.g. Gluten, Nuts, Lactose"
                        placeholderTextColor={style.textInput.color}
                        style={style.textInput}
                        value={allergiesInput}
                        onChangeText={setAllergiesInput}
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                    />

                    <AppText style={style.detailtTitle}>
                        Nutrition Goal*
                    </AppText>
                    <View style={style.optionContainer}>
                        {nutritionGoals.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    style.optionButton,
                                    {
                                        backgroundColor:
                                            goal === item
                                                ? theme.GenerateNutritionPlanButtonActive
                                                : theme.GenerateNutritionPlanButtonNotActive,
                                        borderColor:
                                            goal === item
                                                ? "white"
                                                : "transparent",
                                        borderWidth: 1,
                                    },
                                ]}
                                onPress={() => setGoal(item)}
                            >
                                <AppText
                                    style={{
                                        color:
                                            goal === item ? "white" : "black",
                                    }}
                                >
                                    {item}
                                </AppText>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <AppText style={style.detailtTitle}>
                        Additional Notes
                    </AppText>
                    <TextInput
                        multiline
                        placeholder="Any additional info or preferences..."
                        placeholderTextColor={style.textInput.color}
                        style={style.textInput}
                        value={customNotes}
                        onChangeText={setCustomNotes}
                        keyboardAppearance="dark"
                    />

                    <TouchableOpacity
                        style={style.submitButton}
                        onPress={handleSubmit}
                    >
                        <AppText>Generate Nutrition Plan</AppText>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: "transparent",
            padding: 10,
        },
        mainContainer: {
            flexGrow: 1,
        },
        detailtTitle: {
            fontSize: 24,
            color: theme.GenerateTrainingProgramDetailTitle,
            marginTop: 5,
            marginBottom: 5,
        },
        optionContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 10,
            paddingBottom: 10,
        },
        optionButton: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "transparent",
            backgroundColor: theme.GenerateTrainingProgramButtonNotActive,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
            marginRight: 8,
            marginBottom: 8,
        },
        textInput: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 10,
            height: 80,
            textAlignVertical: "top",
            marginBottom: 20,
            color: theme.AppTextColor,
            backgroundColor:
                theme.GenerateNutritionPlanInputBackgroundColor || "#f5f5f5",
        },
        submitButton: {
            backgroundColor: "#007AFF",
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.SignUpANDLoginButtonBorderColor,
            alignItems: "center",
            marginVertical: 10,
        },
    });
