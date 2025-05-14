import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage";
import DailyRoutine from "./pages/DailyRoutine";
import MyPath from "./pages/MyPath";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
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
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen name="Your Daily Tasks" component={DailyRoutine} />
                <Tab.Screen name="My Path" component={MyPath} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
