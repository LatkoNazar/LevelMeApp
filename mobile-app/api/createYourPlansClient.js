export function createYourPlansClient() {
    return {
        async generateTrainingProgram() {
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

            return response.json();
        },

        async generateNutritionPlan() {
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
            return response.json();
        },
    };
}
