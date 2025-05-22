import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowExercisesCategories from "../pages/Exercises/ShowExercisesCategories";
import ExercisesList from "../pages/Exercises/ExercisesList";

const Stack = createNativeStackNavigator();

export default function ExercisesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Show Exercises Categories"
                component={ShowExercisesCategories}
            />
            <Stack.Screen name="Exercises List" component={ExercisesList} />
        </Stack.Navigator>
    );
}
