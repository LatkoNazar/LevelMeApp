import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";

import themes from "../../design/themes";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                    style={{ marginRight: 20 }}
                >
                    <AppText
                        style={{
                            color: "#27374D",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        <Ionicons name={"settings-outline"} size={30} />
                    </AppText>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={style.main}>
            <View style={style.main}>
                <AppText>Profile</AppText>
            </View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: theme.mainBackgroundContainerColor,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
