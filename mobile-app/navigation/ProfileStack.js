import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../pages/Profile/Profile";
import SettingsPage from "../pages/Profile/Details/SettingsPage/SettingsPage";
import GeneratedContent from "../pages/Profile/Details/GeneratedContent/GeneratedContent";
import ShowGeneratedResult from "../pages/ShowGeneratedResult/ShowGeneratedResult";
import BrowseStack from "./BrowseStack";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
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
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
                name="Generated Content"
                component={GeneratedContent}
            />
            <Stack.Screen
                name="Your Generated Result"
                component={ShowGeneratedResult}
            />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen
                name="Browse Stack"
                component={BrowseStack}
                options={{ headerShown: false, title: "Browse" }}
            />
        </Stack.Navigator>
    );
}
