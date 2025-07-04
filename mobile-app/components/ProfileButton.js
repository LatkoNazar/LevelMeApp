import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import themes from "../design/themes";

export default function ProfileButton(props) {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <TouchableOpacity
            style={style.profileButton}
            onPress={props.handlePress}
        >
            <Ionicons name={props.iconName} size={30} />
            <AppText style={style.profileButtonText}>{props.text}</AppText>
        </TouchableOpacity>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        profileButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.ProfileButtonBackgroundColor,
            borderRadius: 15,
            padding: 10,
            margin: 10,
        },
        profileButtonText: {
            marginLeft: 10,
            fontWeight: "bold",
        },
    });
