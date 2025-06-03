export function getAnswerWS(prompt, onData, onDone, onError) {
    const socket = new WebSocket("ws://192.168.0.105:5000/ws/chat");

    socket.onopen = () => {
        socket.send(JSON.stringify({ prompt }));
    };

    socket.onmessage = (event) => {
        if (event.data === "[DONE]") {
            socket.close();
            onDone?.();
        } else {
            onData(event.data);
        }
    };

    socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        socket.close();
        onError?.(err);
    };

    return socket;
}
