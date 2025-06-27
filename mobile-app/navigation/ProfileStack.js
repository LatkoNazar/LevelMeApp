import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../pages/Profile/Profile";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
            }}
        >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={SettingsPage} />
        </Stack.Navigator>
    );
}
