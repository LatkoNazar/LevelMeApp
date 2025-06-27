import { View, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import config from "../../config.js";

import themes from "../../design/themes.js";
import { useSelector } from "react-redux";

export default function GeneratedResults(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { generatedContent } = route.params;

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <ScrollView style={style.main}>
            <View style={style.container}>
                {generatedContent.map((object) => (
                    <OptionCard
                        key={object.date}
                        optionName={object.date}
                        text={object.date}
                        withImage={false}
                        styles={style.optionCardComponent}
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

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
        },
    });
