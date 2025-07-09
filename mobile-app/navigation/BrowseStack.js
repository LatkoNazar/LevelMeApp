import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CollectionStack from "./CollectionStack";
import BrowsePage from "../pages/BrowsePage/BrowsePage";
import CreateYourPlansStack from "./CreateYourPlansStack";
import { useSelector, useDispatch } from "react-redux";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function BrowseStack() {
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
            <Stack.Screen name="Browse Page" component={BrowsePage} />
            <Stack.Screen
                name="Collection"
                component={CollectionStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Create your plan"
                component={CreateYourPlansStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
