import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";

export default function Nutrition() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <AppText>Nutrition</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#DDE6ED",
    },
});
