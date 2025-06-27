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
import { getAnswerWS, handleNewChat } from "../../api/chatbotInteraction";
import { getMarkdownStyles, styles } from "./AssistantStyle";
import config from "../../config";
import IconCounter from "../../components/IconCounter";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import themes from "../../design/themes";

const MessageBubble = ({ text, isUser, style }) => {
    const textColor = isUser ? "#27374D" : "#DDE6ED";

    return (
        <View
            style={[
                style.bubble,
                isUser ? style.userMessage : style.botMessage,
            ]}
        >
            <Markdown style={getMarkdownStyles(textColor)}>{text}</Markdown>
        </View>
    );
};

export default function Assistant() {
    const navigation = useNavigation();

    const generateId = () =>
        Date.now().toString() + Math.random().toString(36).substring(2, 6);

    const headerHeight = useHeaderHeight();
    const [inputText, setInputText] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const [generatedContent, setGeneratedContent] = useState([]);

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    function handleInputChange(text) {
        setInputText(text);
    }

    const handleResetChat = async () => {
        await handleNewChat();
        setInputText("");
        setMessagesList([]);
    };

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
                console.log("Stream done");
            },
            (err) => {
                setMessagesList((prev) =>
                    prev.map((msg) =>
                        msg.id === botId
                            ? {
                                  ...msg,
                                  text:
                                      msg.text +
                                      "⚠️ Error while getting answer.",
                              }
                            : msg
                    )
                );
            },
            (newContent) => {
                setGeneratedContent((prev) => [
                    ...prev,
                    { date: Date(), content: newContent },
                ]);
            }
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <IconCounter
                        name={
                            generatedContent.length == 0
                                ? "folder-outline"
                                : "folder-open-outline"
                        }
                        badgeCount={generatedContent.length}
                        color="#27374D"
                        size={30}
                        handlePress={() => {
                            navigation.navigate("Generated Results", {
                                generatedContent: generatedContent,
                            });
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => handleResetChat()}
                    style={{ marginRight: 20 }}
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
    }, [navigation, generatedContent]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#526D82" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
        >
            <View style={style.main}>
                <ScrollView
                    style={style.scrollView}
                    contentContainerStyle={[style.scrollViewContent]}
                    keyboardShouldPersistTaps="handled"
                >
                    {messagesList.map((message) => (
                        <MessageBubble
                            style={style}
                            key={message.id}
                            text={message.text}
                            isUser={message.isUser}
                        />
                    ))}
                </ScrollView>
                <View style={{ borderTopWidth: 1 }}>
                    <View style={style.inputContainer}>
                        <TextInput
                            placeholder="Enter text:"
                            placeholderTextColor={"#27374D"}
                            onChangeText={handleInputChange}
                            keyboardAppearance="dark"
                            value={inputText}
                            style={style.input}
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
