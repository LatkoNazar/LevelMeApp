import { View, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import ExercisesMusclesCategoryAssets from "../../assets/generated_objects/ExercisesMusclesCategoryAssets";
import { useNavigation } from "@react-navigation/native";

const categories = ["all", "legs", "back", "chest", "arms", "neck", "abs"];

export default function ShowExerciseCategories() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                {categories.map((optionName) => (
                    <OptionCard
                        key={optionName}
                        optionName={optionName}
                        img={ExercisesMusclesCategoryAssets[optionName].img}
                        text={ExercisesMusclesCategoryAssets[optionName].text}
                        styles={styles.optionCardComponent}
                        handlePress={() =>
                            navigation.navigate("Exercises List", {
                                category: optionName,
                            })
                        }
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#526D82",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
});
