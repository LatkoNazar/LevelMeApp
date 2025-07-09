import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";

import themes from "../../../../design/themes";

import { removeUserToken } from "../../../LoginAndSignUp/tokenOperations";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../redux/authSlice";
import { setTheme } from "../../../../redux/themeSlice";

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
            <View style={style.themeContainer}>
                <AppText>Theme:</AppText>
                {Object.entries(themes).map(([themeName, themeValues]) => (
                    <TouchableOpacity
                        style={[
                            {
                                backgroundColor:
                                    themeValues.themeButton.fillColor,
                            },
                            style.themeButton,
                        ]}
                        key={themeName}
                        onPress={() => dispatch(setTheme(themeName))}
                    >
                        <AppText
                            style={{ color: themeValues.themeButton.textColor }}
                        >
                            {themeName}
                        </AppText>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={style.logOutButton} onPress={handleLogOut}>
                <AppText style={style.logOutText}>Log Out</AppText>
            </TouchableOpacity>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: theme.mainBackgroundContainerColor,
            padding: 10,
            justifyContent: "space-between",
        },
        logOutButton: {
            backgroundColor: "red",
            borderRadius: 10,
            padding: 10,
        },
        logOutText: {
            color: theme.SettingsLogOutButtonTextColor,
            flexWrap: "wrap",
        },
        themeContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        themeButton: {
            margin: 5,
            padding: 5,
            borderRadius: 10,
        },
    });
