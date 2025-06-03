import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import AppText from "../../components/AppText";
import {
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAnswerWS } from "../../api/chatbotInteraction";

const MessageBubble = ({ text, isUser, style }) => {
    const textStyle = isUser ? styles.textUser : styles.textBot;
    return (
        <View style={[styles.bubble, style]}>
            <AppText style={textStyle}>{text}</AppText>
        </View>
    );
};

export default function Assistant() {
    const generateId = () =>
        Date.now().toString() + Math.random().toString(36).substring(2, 6);

    const headerHeight = useHeaderHeight();
    const [inputText, setInputText] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    function handleInputChange(text) {
        setInputText(text);
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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#526D82" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
        >
            <View style={styles.main}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
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
                        <TouchableOpacity onPress={handleSubmit}>
                            <Ionicons
                                name="arrow-up-circle-outline"
                                size={40}
                                color="#27374D"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#526D82",
    },
    input: {
        flex: 1,
        padding: 10,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#9DB2BF",
        margin: 15,
        height: 50,
        padding: 5,
    },
    scrollView: {
        flex: 1,
        padding: 15,
    },
    bubbleContainer: {
        flexDirection: "row",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#DDE6ED",
    },
    botMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#27374D",
    },
    bubble: {
        borderRadius: 15,
        padding: 10,
        marginBottom: 5,
    },
    textUser: {
        color: "#27374D",
    },
    textBot: {
        color: "#DDE6ED",
    },
});
