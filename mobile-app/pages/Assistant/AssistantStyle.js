import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        fontFamily: "Arial",
        fontSize: 16,
    },
    textBot: {
        color: "#DDE6ED",
        fontFamily: "Arial",
        fontSize: 16,
    },
});

export const getMarkdownStyles = (textColor) => ({
    body: {
        color: textColor,
        fontSize: 16,
    },
    heading1: {
        fontSize: 32,
        fontWeight: "bold",
        marginVertical: 8,
        color: textColor,
    },
    heading2: {
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 8,
        color: textColor,
    },
    heading3: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 6,
        color: textColor,
    },
    heading4: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 6,
        color: textColor,
    },
    heading5: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 4,
        color: textColor,
    },
    heading6: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 4,
        color: textColor,
    },
    strong: { fontWeight: "bold" },
    em: { fontStyle: "italic" },
    s: { textDecorationLine: "line-through" },
    blockquote: {
        backgroundColor: "#526D82",
        borderLeftWidth: 4,
        borderLeftColor: "#DDE6ED",
        paddingLeft: 10,
        fontStyle: "italic",
        marginVertical: 8,
        color: textColor,
    },
    code_inline: {
        backgroundColor: "#333",
        color: "#fff",
        fontFamily: "Courier",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    code_block: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        fontFamily: "Courier",
        padding: 10,
        borderRadius: 6,
        marginVertical: 8,
    },
    fence: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        fontFamily: "Courier",
        padding: 10,
        borderRadius: 6,
        marginVertical: 8,
    },
    bullet_list: { marginVertical: 4 },
    ordered_list: { marginVertical: 4 },
    list_item: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginVertical: 2,
    },
    hr: {
        borderBottomWidth: 1,
        borderColor: "#999",
        marginVertical: 8,
    },
    link: {
        color: "#4da6ff",
        textDecorationLine: "underline",
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: "contain",
        marginVertical: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
    },
    thead: {
        backgroundColor: "#526D82",
        borderRadius: 4,
    },
    tbody: {},
    tr: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    th: {
        padding: 6,
        fontWeight: "bold",
    },
    td: {
        padding: 6,
    },
    pre: {
        backgroundColor: "#DDE6ED",
        padding: 10,
        borderRadius: 6,
        color: "#fff",
    },
});
