import { config } from "../config";

export async function getGeneratedContentTitles(token) {
    const response = await fetch(
        `${config.BACKEND_URL}/user-data/generated-content`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}

export async function saveToDB() {
    try {
        await fetch(`${config.BACKEND_URL}/chat/new-chat/${chatId}`, {
            method: "POST",
        });
        return chatId;
    } catch (error) {
        console.error("New session is not created successfully:", error);
    }
}
