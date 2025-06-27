// REACT NATIVE COMPONENTS
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// STACKS & PAGES
import HomePage from "../pages/HomePage/HomePage";
import DailyRoutineStack from "../navigation/DailyRoutineStack";
import CollectionStack from "../navigation/CollectionStack";
import AssistantStack from "../navigation/AssistantStack";
import ProfileStack from "../navigation/ProfileStack";

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
                        if (route.name === "Assistant") {
                            const icon = focused
                                ? require("../assets/icons/assistant_dark.png")
                                : require("../assets/icons/assistant_light.png");
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
                            } else if (route.name === "Collection") {
                                iconName = focused ? "star" : "star-outline";
                            } else if (route.name === "Profile") {
                                iconName = focused
                                    ? "person"
                                    : "person-outline";
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
                    tabBarActiveTintColor: theme.SignsColor,
                    tabBarInactiveTintColor: theme.SignsColor,
                    headerStyle: {
                        backgroundColor: theme.headerColor,
                    },
                    tabBarStyle: style.tabBarStyle,
                })}
            >
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen
                    name="Your Daily Tasks"
                    component={DailyRoutineStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Assistant"
                    component={AssistantStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Collection"
                    component={CollectionStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{ headerShown: false }}
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
            margin: 7,
            marginTop: 0,
            backgroundColor: theme.tabBarColor,
            borderRadius: 47,
            height: 100,
            paddingTop: 20,
            marginTop: 10,
        },
        wrapper: {
            flex: 1,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
    });
