import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage/HomePage";
import DailyRoutine from "./pages/DailyRoutine/DailyRoutine";
import MyPathStack from "./navigation/MyPathStack";
import Assistant from "./pages/Assistant/Assistant";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        if (route.name === "Assistant") {
                            const icon = focused
                                ? require("./assets/icons/assistant_dark.png")
                                : require("./assets/icons/assistant_light.png");
                            return (
                                <Image
                                    source={icon}
                                    style={{
                                        width: size,
                                        height: size,
                                        tintColor: color,
                                    }}
                                    resizeMode="contain"
                                />
                            );
                        } else {
                            let iconName;

                            if (route.name === "Home") {
                                iconName = focused ? "home" : "home-outline";
                            } else if (route.name === "Your Daily Tasks") {
                                iconName = focused
                                    ? "checkmark-circle"
                                    : "checkmark-circle-outline";
                            } else if (route.name === "My Path") {
                                iconName = focused ? "star" : "star-outline";
                            }
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                    },
                    tabBarActiveTintColor: "#27374D",
                    tabBarInactiveTintColor: "#27374D",
                    tabBarStyle: {
                        backgroundColor: "#9DB2BF",
                    },
                    headerStyle: {
                        backgroundColor: "#9DB2BF",
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen name="Your Daily Tasks" component={DailyRoutine} />
                <Tab.Screen name="Assistant" component={Assistant} />
                <Tab.Screen
                    name="My Path"
                    component={MyPathStack}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: "#9DB2BF",
    },
});
