import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { config } from "../../config.js";
import AppText from "../../components/AppText.js";
import themes from "../../design/themes.js";
import { useSelector } from "react-redux";

export default function GeneratedResults(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { generatedContent } = route.params || {};

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <ScrollView style={style.main}>
            <View style={style.container}>
                {generatedContent.map((object) => (
                    <TouchableOpacity
                        key={object.title}
                        style={style.optionCardComponent}
                        onPress={async () => {
                            try {
                                const response = await fetch(
                                    `${config.BACKEND_URL}/chatbot/generated-plan/get-plan`,
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
                                    saveOpt: true,
                                    title: object.title,
                                    content: newContent,
                                });
                            } catch (error) {
                                console.error(
                                    "Error sending generated exercises:",
                                    error
                                );
                            }
                        }}
                    >
                        <AppText style={{ fontWeight: "bold" }}>
                            {object.title}
                        </AppText>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        container: {
            flex: 1,
            flexDirection: "column",
        },
        optionCardComponent: {
            backgroundColor: theme.ShowGeneratedresultsOptionBackgroundColor,
            padding: 10,
            borderRadius: 15,
            alignItems: "center",
            margin: 10,
        },
    });
