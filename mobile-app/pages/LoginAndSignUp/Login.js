// COMPONENTS
import AppText from "../../components/AppText";

// TOKENS
import { saveUserToken } from "./tokenOperations";

// CONFIG
import { config } from "../../config";

// REACT || REACT-NATIVE
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from "react-native";
import * as Device from "expo-device";

// HOOKS
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useReducer } from "react";

// THEMES
import themes from "../../design/themes";

// AUTH
import { Login } from "../../api/authAPI";

import { loginSuccess } from "../../redux/authSlice";

export default function LoginPage() {
    const dispatch = useDispatch();

    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert("Error", "All fields are required.");
        }

        try {
            const userData = {
                email: email,
                password: password,
                device_info: Device.modelName,
            };
            const response = await Login(userData);
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Logged in!");
                await saveUserToken(data.userToken);
                dispatch(loginSuccess());
            } else {
                Alert.alert(
                    "Login operation Failed",
                    data.detail || "Try again!"
                );
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Network issue");
        }
    };
    return (
        <KeyboardAvoidingView
            style={style.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <AppText style={style.title}>Welcome back! 👋</AppText>

                    <TextInput
                        style={style.input}
                        placeholder="Enter your email address"
                        placeholderTextColor={theme.AppTextColor}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />

                    <TextInput
                        style={style.input}
                        placeholder="Enter your password"
                        placeholderTextColor={theme.AppTextColor}
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                    />

                    <TouchableOpacity
                        style={style.button}
                        onPress={handleLogin}
                    >
                        <AppText style={style.buttonText}>Continue</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Sign Up")}
                    >
                        <AppText style={style.switchText}>
                            Do not have an account? Sign Up
                        </AppText>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 30,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "black",
        },
        input: {
            backgroundColor: theme.SignUpANDLogin.InputBackgroundContainerColor,
            borderWidth: 1,
            borderColor: "black",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
        },
        button: {
            backgroundColor: "#007AFF",
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.SignUpANDLogin.ButtonBorderColor,
            alignItems: "center",
            marginVertical: 10,
        },
        buttonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
        },
        switchText: {
            color: theme.SignUpANDLogin.SwitchTextColor,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
        },
    });
