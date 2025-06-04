import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useHeaderHeight } from "@react-navigation/elements";
import AppText from "../../components/AppText";
import {
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAnswerWS } from "../../api/chatbotInteraction";
import { getMarkdownStyles, styles } from "./AssistantStyle";

const MessageBubble = ({ text, isUser, style }) => {
    const textStyle = isUser ? styles.textUser : styles.textBot;
    const textColor = isUser ? "#27374D" : "#DDE6ED";
    return (
        <View style={[styles.bubble, style]}>
            <Markdown style={getMarkdownStyles(textColor)}>{text}</Markdown>
        </View>
    );
};

export default function Assistant({ navigation }) {
    const generateId = () =>
        Date.now().toString() + Math.random().toString(36).substring(2, 6);

    const headerHeight = useHeaderHeight();
    const [inputText, setInputText] = useState("");
    const [messagesList, setMessagesList] = useState([]);

    function handleInputChange(text) {
        setInputText(text);
    }

    async function handleNewChat() {
        setInputText("");
        setMessagesList([]);
        try {
            await fetch("http://192.168.0.105:5000/chat/new-chat", {
                method: "POST",
            });
        } catch (error) {
            console.error("Не вдалось створити нову сесію:", error);
        }
    }

    const handleSubmit = () => {
        const userId = generateId();
        const botId = generateId();

        const userMessage = {
            id: userId,
            text: inputText,
            isUser: true,
        };

        const botMessage = {
            id: botId,
            text: "",
            isUser: false,
        };

        setMessagesList((prev) => [...prev, userMessage, botMessage]);
        setInputText("");

        // Start WebSocket
        getAnswerWS(
            inputText,
            (chunk) => {
                setMessagesList((prev) =>
                    prev.map((msg) =>
                        msg.id === botId
                            ? { ...msg, text: msg.text + chunk }
                            : msg
                    )
                );
            },
            () => {
                console.log("Stream завершено");
            },
            (err) => {
                setMessagesList((prev) =>
                    prev.map((msg) =>
                        msg.id === botId
                            ? {
                                  ...msg,
                                  text:
                                      msg.text +
                                      "⚠️ Помилка під час отримання відповіді.",
                              }
                            : msg
                    )
                );
            }
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => handleNewChat()}
                    style={{ marginRight: 15 }} // Додаємо трохи відступу
                >
                    <AppText
                        style={{
                            color: "#27374D",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        New Chat
                    </AppText>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#526D82" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
        >
            <View style={styles.main}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.scrollViewContent]}
                    keyboardShouldPersistTaps="handled"
                >
                    {messagesList.map((message) => (
                        <MessageBubble
                            style={
                                message.isUser
                                    ? styles.userMessage
                                    : styles.botMessage
                            }
                            key={message.id}
                            text={message.text}
                            isUser={message.isUser}
                        />
                    ))}
                </ScrollView>
                <View style={{ borderTopWidth: 1 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter text:"
                            placeholderTextColor={"#27374D"}
                            onChangeText={handleInputChange}
                            keyboardAppearance="dark"
                            value={inputText}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={inputText === ""}
                        >
                            <Ionicons
                                name="arrow-up-circle-outline"
                                size={40}
                                color={inputText === "" ? "#526D82" : "#27374D"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
