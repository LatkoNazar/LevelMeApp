import { View, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import config from "../../config.js";

export default function GeneratedResults(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { generatedContent } = route.params;

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                {generatedContent.map((object) => (
                    <OptionCard
                        key={object.date}
                        optionName={object.date}
                        text={object.date}
                        withImage={false}
                        styles={styles.optionCardComponent}
                        handlePress={async () => {
                            try {
                                const response = await fetch(
                                    `${config.BACKEND_URL}/generated-exercises`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify([object.content]),
                                    }
                                );
                                const newContent = await response.json();

                                navigation.navigate("Generated Result", {
                                    title: object.date,
                                    content: newContent,
                                });
                            } catch (error) {
                                console.error(
                                    "Error sending generated exercises:",
                                    error
                                );
                            }
                        }}
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
