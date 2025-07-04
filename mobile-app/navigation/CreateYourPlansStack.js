import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateYourPlans from "../pages/CreateYourPlans/CreateYourPlans";
import GenerateTrainingProgram from "../pages/CreateYourPlans/GenerateTrainingProgram/GenerateTrainingProgram";
import ShowGeneratedResult from "../pages/ShowGeneratedResult/ShowGeneratedResult";
import GenerateNutritionPlan from "../pages/CreateYourPlans/GenerateNutritionPlan/GenerateNutritionPlan";
const Stack = createNativeStackNavigator();

export default function CreateYourPlansStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
            }}
        >
            <Stack.Screen
                name="Create your own plan"
                component={CreateYourPlans}
            />
            <Stack.Screen
                name="Generate Training Program"
                component={GenerateTrainingProgram}
            />
            <Stack.Screen
                name="Generate Nutrition Plan"
                component={GenerateNutritionPlan}
            />
            <Stack.Screen
                name="Your Generated Result"
                component={ShowGeneratedResult}
            />
        </Stack.Navigator>
    );
}
