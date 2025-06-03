import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPath from "../pages/MyPath/MyPath";
import ExercisesStack from "./ExercisesStack";
import Nutrition from "../pages/Nutrition/Nutrition";

const Stack = createNativeStackNavigator();

export default function MyPathStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
            }}
        >
            <Stack.Screen name="My Path" component={MyPath} />
            <Stack.Screen name="Exercises" component={ExercisesStack} />
            <Stack.Screen name="Nutrition" component={Nutrition} />
        </Stack.Navigator>
    );
}
