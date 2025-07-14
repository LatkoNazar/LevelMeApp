// SECURE STORE
import * as SecureStore from "expo-secure-store";

import config from "../../config";

import { saveUserToken } from "./tokenOperations";

import AppText from "../../components/AppText";

import React, { useState } from "react";
import {
    View,
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

import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import themes from "../../design/themes";

// AUTH
import { authClient } from "../../api/authClient";

export default function SignUpPage() {
    const api = authClient();

    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const handleSignup = async () => {
        if (!email || !password || !firstName || !lastName || !confirm) {
            return Alert.alert("Error", "All fields are required.");
        }
        if (password !== confirm) {
            return Alert.alert("Error", "Passwords do not match.");
        }
        try {
            const userData = {
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
            };
            const response = await api.SignUp(userData);
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Account created!");
                navigation.navigate("Login");
            } else {
                Alert.alert("Signup Failed", data.detail || "Try again!");
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
                    <AppText style={style.title}>Create your account</AppText>
                    <TextInput
                        style={style.input}
                        placeholder="Enter your first name"
                        placeholderTextColor={theme.AppTextColor}
                        autoCapitalize="none"
                        onChangeText={setFirstName}
                        value={firstName}
                    />

                    <TextInput
                        style={style.input}
                        placeholder="Enter your last name"
                        placeholderTextColor={theme.AppTextColor}
                        autoCapitalize="none"
                        onChangeText={setLastName}
                        value={lastName}
                    />

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
                        placeholder="Create a password"
                        placeholderTextColor={theme.AppTextColor}
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                    />

                    <TextInput
                        style={style.input}
                        placeholder="Confirm your password"
                        placeholderTextColor={theme.AppTextColor}
                        secureTextEntry
                        onChangeText={setConfirm}
                        value={confirm}
                    />

                    <TouchableOpacity
                        style={style.button}
                        onPress={handleSignup}
                    >
                        <AppText style={style.buttonText}>Sign Up</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <AppText style={style.switchText}>
                            Already have an account? Log in
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
