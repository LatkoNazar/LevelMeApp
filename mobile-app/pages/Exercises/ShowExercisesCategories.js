import { View, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import ExercisesMusclesCategoryAssets from "../../assets/generated_objects/ExercisesMusclesCategoryAssets";
import { useNavigation } from "@react-navigation/native";

import themes from "../../design/themes";
import { useSelector } from "react-redux";

import { exerciseCategories } from "./exerciseCategories";

export default function ShowExerciseCategories() {
    const navigation = useNavigation();

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <ScrollView style={style.main}>
            <View style={style.container}>
                {exerciseCategories.map((optionObject) => (
                    <OptionCard
                        key={optionObject.title}
                        optionName={optionObject.title}
                        img={
                            ExercisesMusclesCategoryAssets[optionObject.title]
                                .img
                        }
                        title={
                            ExercisesMusclesCategoryAssets[optionObject.title]
                                .text
                        }
                        description={optionObject.description}
                        withImage={true}
                        styles={style.optionCardComponent}
                        handlePress={() =>
                            navigation.navigate("Exercises List", {
                                category: optionObject.title,
                            })
                        }
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
        },
    });
