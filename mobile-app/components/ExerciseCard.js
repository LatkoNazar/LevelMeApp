// components/ExerciseCard.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import AppText from "./AppText";
import PropTypes from "prop-types";

export default function ExerciseCard(props) {
    return (
        <View style={styles.card}>
            <ScrollView horizontal style={styles.imageContainer}>
                {props.images &&
                    props.images.map((img, idx) => (
                        <Image key={idx} source={img} style={styles.image} />
                    ))}
            </ScrollView>
            <AppText style={styles.title}>{props.item.name}</AppText>
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

            <AppText style={styles.subTitle}>Instructions:</AppText>
            {JSON.parse(props.item.instructions).map((step, index) => (
                <AppText key={index}>• {step}</AppText>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
        backgroundColor: "#f9f9f9",
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
        width: 120,
        height: 120,
        marginRight: 10,
        borderRadius: 6,
    },
});

ExerciseCard.propTypes = {};
