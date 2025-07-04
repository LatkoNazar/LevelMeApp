// REDUX
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

// REACT HOOKS
import { useState, useEffect } from "react";

// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

// AUTH FUNCTIONS
import { getUserToken } from "./pages/LoginAndSignUp/tokenOperations";

// STACKS
import MainTabsStack from "./navigation/MainTabsStack";
import AuthStack from "./navigation/AuthStack";
import { loginSuccess, logout, setToken } from "./redux/authSlice";

import { StyleSheet, View } from "react-native";

export default function Root() {
    return (
        <Provider store={store}>
            <View style={{ flex: 1 }}>
                <App />
            </View>
        </Provider>
    );
}

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        async function userToken() {
            const token = await getUserToken();
            dispatch(setToken(token ?? ""));
            if (token) {
                dispatch(loginSuccess());
            } else {
                dispatch(logout());
            }
            setCheckingAuth(false);
        }
        userToken();
    }, [dispatch]);

    if (checkingAuth) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#9DB2BF",
                    },
                    headerTintColor: "#27374D",
                }}
            >
                {isAuthenticated ? (
                    <Stack.Screen
                        name="App"
                        component={MainTabsStack}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="SignUp & Login"
                        component={AuthStack}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
