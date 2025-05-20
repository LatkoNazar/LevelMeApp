import { View, Text, ScrollView, StyleSheet } from "react-native";
import MyPathOptionCard from "../components/MyPathOptionCard";
import myPathOptions from "../assets/generated_objects/myPathOptions";
import { useNavigation } from "@react-navigation/native";

const options = ["Exercises", "Nutrition"];

export default function MyPath() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                {options.map((optionName) => (
                    <MyPathOptionCard
                        key={optionName}
                        optionName={optionName}
                        img={myPathOptions[optionName].img}
                        styles={styles.optionCardComponent}
                        handlePress={() => navigation.navigate(optionName)}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#DDE6ED",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
});
