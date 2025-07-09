import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import Analytics from "../pages/Analytics/Analytics";
import WeightTracker from "../pages/Analytics/Sections/WeightTracker";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function AnalyticsStack() {
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
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name="Weight Tracker" component={WeightTracker} />
        </Stack.Navigator>
    );
}
