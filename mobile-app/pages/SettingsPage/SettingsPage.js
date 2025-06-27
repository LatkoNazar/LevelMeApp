import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";

import themes from "../../design/themes";

import { removeUserToken } from "../LoginAndSignUp/tokenOperations";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

export default function SettingsPage() {
    const dispatch = useDispatch();
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    async function handleLogOut() {
        removeUserToken();
        dispatch(logout());
    }

    return (
        <View style={style.main}>
            <View style={style.main}>
                <TouchableOpacity
                    style={style.logOutButton}
                    onPress={handleLogOut}
                >
                    <AppText style={style.logOutText}>Log Out</AppText>
                </TouchableOpacity>
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
        logOutButton: {
            backgroundColor: "red",
            borderRadius: 10,
            padding: 10,
        },
        logOutText: {
            color: theme.SettingsLogOutButtonTextColor,
        },
    });
