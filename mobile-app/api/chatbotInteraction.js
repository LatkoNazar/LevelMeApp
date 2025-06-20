import config from "../config";

export function getAnswerWS(prompt, onData, onDone, onError, addContent) {
    const socket = new WebSocket(`${config.WEBSOCKET_URL}/chat/ws`);

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

    return socket;
}
