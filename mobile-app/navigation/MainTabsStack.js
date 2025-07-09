// REACT NATIVE COMPONENTS
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// STACKS & PAGES
import HomePage from "../pages/HomePage/HomePage";
import DailyRoutineStack from "../navigation/DailyRoutineStack";
import AnalyticsStack from "../navigation/AnalyticsStack";
import AssistantStack from "../navigation/AssistantStack";
import ProfileStack from "../navigation/ProfileStack";
import HomePageStack from "./HomePageStack";
// ICONS & IMAGES
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

// HOOKS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

// THEME
import { setTheme, markLoaded } from "../redux/themeSlice";
import themes from "../design/themes";
import SignupPage from "../pages/LoginAndSignUp/SignUp";

const THEME_KEY = "APP_THEME";
const SIZE = 30;
const Tab = createBottomTabNavigator();

export default function MainTabsStack() {
    const dispatch = useDispatch();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;

    useEffect(() => {
        async function loadTheme() {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            if (savedTheme) {
                dispatch(setTheme(savedTheme));
            } else {
                dispatch(markLoaded());
            }
        }
        loadTheme();
    }, [dispatch]);

    const style = styles(theme);
    return (
        <View style={style.wrapper}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        if (route.name === "Assistant Stack") {
                            const icon = focused
                                ? require("../assets/icons/assistant_dark.png")
                                : require("../assets/icons/assistant_light.png");
                            return (
                                <Image
                                    source={icon}
                                    style={{
                                        width: SIZE,
                                        height: SIZE,
                                        tintColor: color,
                                    }}
                                    resizeMode="contain"
                                />
                            );
                        } else {
                            let iconName;

                            if (route.name === "Home Stack") {
                                iconName = focused ? "home" : "home-outline";
                            } else if (
                                route.name === "Your Daily Tasks Stack"
                            ) {
                                iconName = focused
                                    ? "checkmark-circle"
                                    : "checkmark-circle-outline";
                            } else if (route.name === "Analytics Stack") {
                                iconName = focused
                                    ? "stats-chart"
                                    : "stats-chart-outline";
                            } else if (route.name === "Profile Stack") {
                                iconName = focused
                                    ? "person"
                                    : "person-outline";
                            }
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={SIZE}
                                    color={color}
                                />
                            );
                        }
                    },
                    tabBarActiveTintColor: theme.SignsColor,
                    tabBarInactiveTintColor: theme.SignsColor,
                    headerStyle: {
                        backgroundColor: theme.headerColor,
                    },
                    tabBarStyle: style.tabBarStyle,
                })}
            >
                <Tab.Screen
                    name="Home Stack"
                    component={HomePageStack}
                    options={{ headerShown: false, title: "Home" }}
                />
                <Tab.Screen
                    name="Your Daily Tasks Stack"
                    component={DailyRoutineStack}
                    options={{ headerShown: false, title: "Daily Tasks" }}
                />
                <Tab.Screen
                    name="Assistant Stack"
                    component={AssistantStack}
                    options={{ headerShown: false, title: "Assistant" }}
                />
                <Tab.Screen
                    name="Analytics Stack"
                    component={AnalyticsStack}
                    options={{ headerShown: false, title: "Analytics" }}
                />
                <Tab.Screen
                    name="Profile Stack"
                    component={ProfileStack}
                    options={{ headerShown: false, title: "Profile" }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        tab: {
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        tabBarStyle: {
            backgroundColor: theme.tabBarColor,
            height: 100,
            paddingTop: 20,
        },
        wrapper: {
            flex: 1,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
    });
