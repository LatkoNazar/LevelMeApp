import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";

export default function HomePage() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <AppText>Home Page</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#DDE6ED",
    },
});
