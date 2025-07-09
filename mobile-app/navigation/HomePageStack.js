import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "../pages/HomePage/HomePage";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function HomePageStack() {
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
            <Stack.Screen name="Home Page" component={HomePage} />
        </Stack.Navigator>
    );
}
