import AppText from "./AppText";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MyPathOptionCard(props) {
    return (
        <TouchableOpacity onPress={props.handlePress} style={styles.card}>
            <View>
                <Image source={props.img} style={styles.image} />
                <AppText style={styles.text}>{props.optionName}</AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        elevation: 3,
        marginVertical: 8,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#9DB2BF",
        padding: 5,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        padding: 10,
    },
});
