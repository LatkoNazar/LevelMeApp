import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

import themes from "../design/themes";
import { useSelector } from "react-redux";

export default function ExerciseCard(props) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <View style={style.card}>
            <AppText style={style.title}>{props.item.name}</AppText>
            <AppText>Category: {props.item.category}</AppText>
            <AppText>Level: {props.item.level}</AppText>
            <AppText>Equipment: {props.item.equipment}</AppText>
            <AppText>Force: {props.item.force}</AppText>
            <AppText>Mechanic: {props.item.mechanic}</AppText>
            <AppText>
                Primary Muscles: {props.item.primaryMuscles.join(", ")}
            </AppText>
            <AppText>
                Secondary Muscles: {props.item.secondaryMuscles.join(", ")}
            </AppText>

            <AppText style={style.subTitle}>Instructions:</AppText>
            {JSON.parse(props.item.instructions).map((step, index) => (
                <AppText key={index}>• {step}</AppText>
            ))}
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        card: {
            padding: 15,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: theme.ExerciseCardBorderColor,
            borderRadius: 15,
            backgroundColor: theme.ExerciseCardBackgroundColor,
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
        },
        subTitle: {
            marginTop: 10,
            fontWeight: "bold",
        },
        imageContainer: {
            marginTop: 10,
        },
        image: {
            width: 100,
            height: 120,
            marginRight: 10,
            borderRadius: 6,
        },
    });

ExerciseCard.propTypes = {};
