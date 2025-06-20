import { View, Text, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import CollectionOptionsAssets from "../../assets/generated_objects/CollectionOptionsAssets";
import { useNavigation } from "@react-navigation/native";

const options = ["Exercises", "Nutrition"];

export default function MyPath() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                {options.map((optionName) => (
                    <OptionCard
                        key={optionName}
                        optionName={optionName}
                        img={CollectionOptionsAssets[optionName].img}
                        text={CollectionOptionsAssets[optionName].text}
                        withImage={true}
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
        backgroundColor: "#526D82",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
});
