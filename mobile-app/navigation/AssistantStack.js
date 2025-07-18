﻿import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Assistant from "../pages/Assistant/Assistant";
import GeneratedResults from "../pages/Assistant/GeneratedResults";
import ShowGeneratedResult from "../pages/ShowGeneratedResult/ShowGeneratedResult";
import { useSelector, useDispatch } from "react-redux";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function AssistantStack() {
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
