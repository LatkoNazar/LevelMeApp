import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import ExerciseCard from "../components/ExerciseCard";
import exerciseImages from "../assets/generated_objects/exerciseImages.js";
import { getAllExercises } from "../api/exercisesRetrieval.js";

export default function ExercisesList(props) {
    const [images, setImages] = useState(exerciseImages);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        async function fetchAllExercises() {
            try {
                const data = await getAllExercises();
                console.log("Fetched exercises data:", data);
                setExercises(data);
            } catch (err) {
                console.error("Failed to fetch exercises:", err);
            }
        }
        fetchAllExercises();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {exercises.map((exercise) => (
                <TouchableOpacity key={exercise.id}>
                    <ExerciseCard
                        item={exercise}
                        images={images[exercise.id]}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

ExercisesList.PropTypes = {};
