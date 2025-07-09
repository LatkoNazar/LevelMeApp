import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../../components/AppText";
import themes from "../../design/themes";
import { useSelector } from "react-redux";

export default function ShowGeneratedNutritionPlan({ content = [] }) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    console.log("Fetched plan:", JSON.stringify(content, null, 2));

    return (
        <ScrollView style={style.mainContainer}>
            {Array.isArray(content.plan) &&
                content.plan.map((mealBlock, idx) => (
                    <View key={idx} style={style.generatedObjectContainer}>
                        <AppText style={style.mealTitle}>
                            {mealBlock.meal}
                        </AppText>

                        {mealBlock.recipes?.map((recipe, rIdx) => (
                            <View key={rIdx} style={style.recipeContainer}>
                                <AppText style={style.recipeText}>
                                    {recipe.trim()}
                                </AppText>
                            </View>
                        ))}
                    </View>
                ))}
        </ScrollView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            marginTop: 10,
        },
        generatedObjectContainer: {
            backgroundColor: theme.mainBackgroundContainerColor || "#f0f0f0",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            margin: 10,
        },
        mealTitle: {
            fontWeight: "bold",
            fontSize: 18,
            color: theme.AppTextColor || "black",
            marginBottom: 4,
        },
        recipeContainer: {
            marginVertical: 6,
        },
        recipeText: {
            fontSize: 14,
            color: theme.AppTextColor || "#333",
            lineHeight: 20,
        },
    });
