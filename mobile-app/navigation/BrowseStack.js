import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CollectionStack from "./CollectionStack";
import BrowsePage from "../pages/BrowsePage/BrowsePage";
import CreateYourPlansStack from "./CreateYourPlansStack";
const Stack = createNativeStackNavigator();

export default function BrowseStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
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
