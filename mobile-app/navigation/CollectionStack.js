import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Collection from "../pages/Collection/Collection";
import ExercisesStack from "./ExercisesStack";
import Nutrition from "../pages/Nutrition/Nutrition";

const Stack = createNativeStackNavigator();

export default function CollectionStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
            }}
        >
            <Stack.Screen name="Your Collection" component={Collection} />
            <Stack.Screen name="Exercises" component={ExercisesStack} />
            <Stack.Screen name="Nutrition" component={Nutrition} />
        </Stack.Navigator>
    );
}
