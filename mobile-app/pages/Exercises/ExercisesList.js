import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import ExerciseCard from "../../components/ExerciseCard.js";
import { getAllExercises } from "../../api/exercisesRetrieval.js";

export default function ExercisesList({ route }) {
    const [exercises, setExercises] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { category } = route.params;

    useEffect(() => {
        fetchExercises(page);
    }, []);

    async function fetchExercises(currentPage) {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const data = await getAllExercises(category, currentPage, 50);

            if (data.exercises.length === 0) {
                setHasMore(false);
                return;
            }

            setExercises((prev) => [...prev, ...data.exercises]);
            setPage((prev) => prev + 1);
        } catch (err) {
            console.error("Failed to fetch exercises:", err);
        } finally {
            setLoading(false);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.id}>
            <ExerciseCard item={item} />
        </TouchableOpacity>
    );

    const renderFooter = () =>
        loading ? (
            <ActivityIndicator size="large" style={{ margin: 20 }} />
        ) : null;

    return (
        <FlatList
            data={exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
            onEndReached={() => fetchExercises(page)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#526D82",
    },
});

ExercisesList.propTypes = {};
