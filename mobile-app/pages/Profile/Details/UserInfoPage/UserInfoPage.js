import { View, StyleSheet } from "react-native";
import AppText from "../../../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../../../design/themes";
import { useRoute } from "@react-navigation/native";

export default function UserInfoPage() {
    const route = useRoute();
    const { first_name, last_name, email } = route.params || {};
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <View style={style.main}>
            <View style={style.infoBlock}>
                <AppText style={style.label}>Full Name:</AppText>
                <AppText style={style.value}>
                    {first_name} {last_name}
                </AppText>
            </View>
            <View style={style.infoBlock}>
                <AppText style={style.label}>Email:</AppText>
                <AppText style={style.value}>{email}</AppText>
            </View>
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
        infoBlock: {
            marginBottom: 15,
        },
        label: {
            fontSize: 14,
            fontWeight: "600",
            color: theme.textColor,
            marginBottom: 4,
        },
        value: {
            fontSize: 16,
            color: theme.textColor,
        },
    });
