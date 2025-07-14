import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

export function createChatbotClient() {
    function generateId() {
        return Date.now().toString() + Math.random().toString(36).slice(2, 6);
    }

    async function getOrCreateChatId() {
        let chatId = await AsyncStorage.getItem("chatId");
        if (!chatId) {
            chatId = generateId();
            await AsyncStorage.setItem("chatId", chatId);
        }
        return chatId;
    }
    return {
        async getAnswerWS(prompt, onData, onDone, onError, addContent) {
            const chatId = await getOrCreateChatId();
            const socket = new WebSocket(
                `${config.WEBSOCKET_URL}/chat/ws/${chatId}`
            );

            socket.onopen = () => {
                socket.send(JSON.stringify({ prompt }));
            };

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === "training_plan") {
                    addContent(message.message);
                } else if (message.type === "message") {
                    onData(message.message);
                } else {
                    socket.close();
                    onDone?.();
                }
            };

            socket.onerror = (err) => {
                console.error("WebSocket error:", err);
                socket.close();
                onError?.(err);
            };
            socket.onclose = () => {
                onDone?.();
            };

            return socket;
        },

        async handleNewChat() {
            const chatId = await getOrCreateChatId();
            try {
                await fetch(`${config.BACKEND_URL}/chat/new-chat/${chatId}`, {
                    method: "POST",
                });
                return chatId;
            } catch (error) {
                console.error(
                    "New session is not created successfully:",
                    error
                );
            }
        },
    };
}
