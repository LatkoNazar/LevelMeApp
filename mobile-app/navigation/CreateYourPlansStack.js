import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateYourPlans from "../pages/CreateYourPlans/CreateYourPlans";
import GenerateTrainingProgram from "../pages/CreateYourPlans/GenerateTrainingProgram/GenerateTrainingProgram";
import ShowGeneratedResult from "../pages/ShowGeneratedResult/ShowGeneratedResult";
import GenerateNutritionPlan from "../pages/CreateYourPlans/GenerateNutritionPlan/GenerateNutritionPlan";
import { useSelector, useDispatch } from "react-redux";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function CreateYourPlansStack() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.headerColor,
                },
                headerTintColor: theme.headerTintColor,
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
