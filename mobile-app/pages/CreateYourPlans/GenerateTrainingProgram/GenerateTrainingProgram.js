import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AppText from "../../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../../design/themes";
import CurveLine from "../../../design/backgrounds/CurveLine";
import {
    splitTypes,
    keyMuscles,
    equipment,
    category,
} from "./generateTrainingProgramObjects";
import { useState } from "react";
import { config } from "../../../config.js";
import { useNavigation } from "@react-navigation/native";

export default function PlanDetails() {
    const navigation = useNavigation();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const [chosenSplit, setChosenSplit] = useState();
    const [chosenMuscles, setChosenMuscles] = useState([]);
    const [chosenEquipment, setChosenEquipment] = useState([]);
    const [chosenCategory, setChosenCategory] = useState();

    function handleChooseEquipment(item) {
        if (!chosenEquipment.includes(item))
            if (item === "GYM") setChosenEquipment(["GYM"]);
            else
                setChosenEquipment([
                    ...chosenEquipment.filter((opt) => opt != "GYM"),
                    item,
                ]);
        else setChosenEquipment(chosenEquipment.filter((i) => i !== item));
    }

    function handleChooseCategory(cat) {
        setChosenCategory(cat);
    }

    function handleChooseSplit(typeOfSplit) {
        setChosenSplit(typeOfSplit);
    }

    function handleChooseMusclesToTrain(muscle) {
        if (!chosenMuscles.includes(muscle))
            setChosenMuscles([...chosenMuscles, muscle]);
        else
            setChosenMuscles([
                ...chosenMuscles.filter((item) => item != muscle),
            ]);
    }

    async function handleSubmit() {
        if (
            !chosenSplit ||
            !chosenMuscles.length ||
            !chosenEquipment.length ||
            !chosenCategory
        ) {
            Alert.alert(
                "Missing Info",
                "Please select a split, muscles, equipment, and goal before submitting."
            );
            return;
        }

        try {
            console.log("START");
            const response = await fetch(
                `${config.BACKEND_URL}/generators/generate-workout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        muscle_groups: chosenMuscles,
                        type_of_split: chosenSplit,
                        equipment: chosenEquipment,
                        goal: chosenCategory,
                    }),
                }
            );

            const data = await response.json();
            console.log(JSON.stringify(data.plan, null, 2));

            navigation.navigate("Your Generated Result", {
                title: "Generated Plan",
                content: data.plan,
                saveOpt: true,
            });
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error("Submit error:", error);
        }

        console.log("END");
    }

    return (
        <>
            <CurveLine />
            <View style={style.main}>
                {/* SPLIT */}
                <AppText style={style.detailtTitle}>Type of split</AppText>
                <View style={style.typeOfSplitContainer}>
                    {splitTypes.map((typeOfSplit) => (
                        <TouchableOpacity
                            key={typeOfSplit}
                            style={[
                                style.detailtOptionButton,
                                {
                                    backgroundColor:
                                        chosenSplit === typeOfSplit
                                            ? theme.GenerateTrainingProgramButtonActive
                                            : theme.GenerateTrainingProgramButtonNotActive,
                                    borderColor:
                                        chosenSplit === typeOfSplit
                                            ? "white"
                                            : "transparent",
                                    borderWidth: 1,
                                    shadowOpacity:
                                        chosenSplit === typeOfSplit ? 0.3 : 0.1,
                                    elevation:
                                        chosenSplit === typeOfSplit ? 4 : 2,
                                },
                            ]}
                            onPress={() => handleChooseSplit(typeOfSplit)}
                        >
                            <AppText
                                style={{
                                    color:
                                        chosenSplit === typeOfSplit
                                            ? "white"
                                            : "black",
                                }}
                            >
                                {typeOfSplit}
                            </AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* MUSCLES */}
                <AppText style={style.detailtTitle}>Muscles to train</AppText>
                <View style={style.musclesToTrainContainer}>
                    {Object.keys(keyMuscles).map((muscle) => (
                        <TouchableOpacity
                            key={muscle}
                            style={[
                                style.detailtOptionButton,
                                {
                                    backgroundColor: chosenMuscles.includes(
                                        muscle
                                    )
                                        ? theme.GenerateTrainingProgramButtonActive
                                        : theme.GenerateTrainingProgramButtonNotActive,
                                    borderColor: chosenMuscles.includes(muscle)
                                        ? "white"
                                        : "transparent",
                                    borderWidth: 1,
                                    shadowOpacity: chosenMuscles.includes(
                                        muscle
                                    )
                                        ? 0.3
                                        : 0.1,
                                    elevation: chosenMuscles.includes(muscle)
                                        ? 4
                                        : 2,
                                },
                            ]}
                            onPress={() => handleChooseMusclesToTrain(muscle)}
                        >
                            <AppText
                                style={{
                                    color: chosenMuscles.includes(muscle)
                                        ? "white"
                                        : "black",
                                }}
                            >
                                {muscle}
                            </AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* EQUIPMENT */}
                <AppText style={style.detailtTitle}>
                    Available equipment
                </AppText>
                <View style={style.musclesToTrainContainer}>
                    {equipment.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                style.detailtOptionButton,
                                {
                                    backgroundColor: chosenEquipment.includes(
                                        item
                                    )
                                        ? theme.GenerateTrainingProgramButtonActive
                                        : theme.GenerateTrainingProgramButtonNotActive,
                                    borderColor: chosenEquipment.includes(item)
                                        ? "white"
                                        : "transparent",
                                    borderWidth: 1,
                                    shadowOpacity: chosenEquipment.includes(
                                        item
                                    )
                                        ? 0.3
                                        : 0.1,
                                    elevation: chosenEquipment.includes(item)
                                        ? 4
                                        : 2,
                                },
                            ]}
                            onPress={() => handleChooseEquipment(item)}
                        >
                            <AppText
                                style={{
                                    color: chosenEquipment.includes(item)
                                        ? "white"
                                        : "black",
                                }}
                            >
                                {item}
                            </AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* CATEGORY */}
                <AppText style={style.detailtTitle}>Training goal</AppText>
                <View style={style.musclesToTrainContainer}>
                    {category.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                style.detailtOptionButton,
                                {
                                    backgroundColor:
                                        chosenCategory === cat
                                            ? theme.GenerateTrainingProgramButtonActive
                                            : theme.GenerateTrainingProgramButtonNotActive,
                                    borderColor:
                                        chosenCategory === cat
                                            ? "white"
                                            : "transparent",
                                    borderWidth: 1,
                                    shadowOpacity:
                                        chosenCategory === cat ? 0.3 : 0.1,
                                    elevation: chosenCategory === cat ? 4 : 2,
                                },
                            ]}
                            onPress={() => handleChooseCategory(cat)}
                        >
                            <AppText
                                style={{
                                    color:
                                        chosenCategory === cat
                                            ? "white"
                                            : "black",
                                }}
                            >
                                {cat}
                            </AppText>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    style={style.submitButton}
                    onPress={handleSubmit}
                >
                    <AppText>Submit</AppText>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: "transparent",
            padding: 10,
        },
        detailtTitle: {
            fontSize: 24,
            color: theme.GenerateTrainingProgramDetailTitle,
        },
        typeOfSplitContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 12,
            paddingTop: 5,
            paddingBottom: 15,
        },
        detailtOptionButton: {
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "transparent",
            backgroundColor: theme.GenerateTrainingProgramButtonNotActive,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        musclesToTrainContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 10,
            paddingTop: 5,
            paddingBottom: 15,
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
