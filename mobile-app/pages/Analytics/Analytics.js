import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import { useEffect } from "react";
import AppText from "../../components/AppText";
import SectionButton from "../../components/SectionButton";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
    const navigation = useNavigation();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <View style={style.main}>
            <SectionButton
                text={"Weight Tracker"}
                iconName={"Weight"}
                handlePress={() => {
                    navigation.navigate("Weight Tracker");
                }}
            />
            <SectionButton
                text={"Sleep"}
                iconName={"moon-outline"}
                handlePress={() => {}}
            />
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
    });
