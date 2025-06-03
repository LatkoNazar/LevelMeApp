import { Text, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";

export default function HomePage() {
    return (
        <View style={styles.main}>
            <View style={styles.main}>
                <AppText>Home Page</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#526D82",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
