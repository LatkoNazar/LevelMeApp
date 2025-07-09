import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Collection from "../pages/Collection/Collection";
import ExercisesStack from "./ExercisesStack";
import Nutrition from "../pages/Nutrition/Nutrition";
import { useSelector, useDispatch } from "react-redux";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function CollectionStack() {
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
            <Stack.Screen name="Your Collection" component={Collection} />
            <Stack.Screen name="Exercises" component={ExercisesStack} />
            <Stack.Screen name="Nutrition" component={Nutrition} />
        </Stack.Navigator>
    );
}
