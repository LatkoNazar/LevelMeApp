import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { config } from "../../../../config.js";
import AppText from "../../../../components/AppText.js";
import themes from "../../../../design/themes.js";
import { useSelector } from "react-redux";

import { createUserClient } from "../../../../api/userClient.js";

export default function GeneratedContent(props) {
    const api = createUserClient();

    const navigation = useNavigation();
    const route = useRoute();
    const { generatedContent } = route.params || {};
    const token = useSelector((state) => state.auth.token);
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    async function getGeneratedContent(id) {
        try {
            const content = await api.getGeneratedContent();
            return content;
        } catch (error) {
            console.error("Error sending generated exercises:", error);
        }
    }

    return (
        <ScrollView style={style.main}>
            <View style={style.container}>
                {generatedContent.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={style.optionCardComponent}
                        onPress={async () => {
                            const content = await getGeneratedContent(item.id);
                            navigation.navigate("Your Generated Result", {
                                saveOpt: true,
                                title: item.title,
                                content: content["plan"],
                                planType: item.plan_type,
                            });
                        }}
                    >
                        <AppText style={{ fontWeight: "bold" }}>
                            {item.title}
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
