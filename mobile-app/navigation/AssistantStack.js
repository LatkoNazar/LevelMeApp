import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Assistant from "../pages/Assistant/Assistant";
import GeneratedResults from "../pages/Assistant/GeneratedResults";
import ShowGeneratedResult from "../pages/ShowGeneratedResult/ShowGeneratedResult";
const Stack = createNativeStackNavigator();

export default function AssistantStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
            }}
        >
            <Stack.Screen name="ChatBot" component={Assistant} />
            <Stack.Screen
                name="Generated Results"
                component={GeneratedResults}
            />
            <Stack.Screen
                name="Generated Result"
                component={ShowGeneratedResult}
            />
        </Stack.Navigator>
    );
}
