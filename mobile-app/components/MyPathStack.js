import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPath from "../pages/MyPath";
import Exercises from "../pages/Exercises";
import Nutrition from "../pages/Nutrition";

const Stack = createNativeStackNavigator();

export default function MyPathStack() {
    return (
        <Stack.Navigator options={{ headerShown: false }}>
            <Stack.Screen name="My Path" component={MyPath} />
            <Stack.Screen name="Exercises" component={Exercises} />
            <Stack.Screen name="Nutrition" component={Nutrition} />
        </Stack.Navigator>
    );
}
