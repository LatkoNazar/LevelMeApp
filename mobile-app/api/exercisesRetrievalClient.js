import { config } from "../config";

export function createExerciseRetrievalClient() {
    return {
        async getAllExercises(category, page = 1, per_page = 50) {
            const response = await fetch(
                `${config.BACKEND_URL}/collection/${category}-exercises?page=${page}&per_page=${per_page}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        },

        async getGeneratedExercisesInfo() {
            const response = await fetch(
                `${config.BACKEND_URL}/generated-exercises`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        },
    };
}
