import AppText from "./AppText";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

import themes from "../design/themes";
import { useSelector } from "react-redux";

export default function OptionCard(props) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <View style={style.card}>
            {props.withImage && (
                <Image source={props.img} style={style.image} />
            )}
            <View style={style.textContainer}>
                <AppText style={style.title}>{props.title}</AppText>
                {props.description && (
                    <AppText style={style.description}>
                        {props.description}
                    </AppText>
                )}
            </View>
            <View style={style.exploreButtonCoontainer}>
                <TouchableOpacity
                    onPress={props.handlePress}
                    style={style.exploreButton}
                >
                    <AppText style={style.exploreButtonText}>Explore</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        card: {
            borderRadius: 16,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
            marginVertical: 12,
            width: "90%",
            alignSelf: "center",
            backgroundColor: theme.OptionCard.BackgroundColor,
        },
        image: {
            width: "100%",
            height: 180,
            resizeMode: "cover",
        },
        textContainer: {
            padding: 16,
        },
        title: {
            fontSize: 20,
            fontWeight: "700",
            color: theme.textColorPrimary,
            marginBottom: 6,
        },
        description: {
            fontSize: 14,
            color: theme.textColorSecondary,
            lineHeight: 20,
        },
        exploreButtonCoontainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            marginBottom: 16,
            marginLeft: 16,
        },
        exploreButton: {
            backgroundColor: theme.ExploreButton.BackgroundColor,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignSelf: "center",
        },
        exploreButtonText: {
            color: theme.ExploreButton.TextColor,
            fontWeight: "600",
            fontSize: 16,
        },
    });
