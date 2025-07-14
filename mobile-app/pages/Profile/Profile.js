import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AppText from "../../components/AppText";
import SectionButton from "../../components/buttons/SectionButton";

import themes from "../../design/themes";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../config";

import { createProfileClient } from "../../api/profileClient";

import CurveLine from "../../design/backgrounds/CurveLine";

export default function Profile() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    const [userData, setUserData] = useState();
    const navigation = useNavigation();

    const token = useSelector((state) => state.auth.token);
    const api = createProfileClient(token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await api.fetchEmailFirstLastNameData();
                setUserData(profile);
            } catch (e) {
                console.error("Error:", e);
            }
        };

        fetchData();
    }, []);

    function getGeneratedContentTitles() {
        return api.getGeneratedContentTitles();
    }

    return (
        <View style={style.main}>
            <CurveLine />
            <View style={style.profilePictureContainer}>
                <Image
                    style={style.profilePicture}
                    source={require("../../assets/Images/DefaultImages/no-profile-pic.jpg")}
                />
                <AppText style={style.profileFirstLastName}>
                    {userData?.first_name} {userData?.last_name}
                </AppText>
                <AppText style={style.profileEmail}>{userData?.email}</AppText>
            </View>
            <View style={style.buttonsSection}>
                <SectionButton
                    text={"Info"}
                    iconName={"id-card-outline"}
                    handlePress={() =>
                        navigation.navigate("Info", {
                            first_name: userData?.first_name,
                            last_name: userData?.last_name,
                            email: userData?.email,
                        })
                    }
                />
            </View>
            <View style={style.buttonsSection}>
                <SectionButton
                    text={"Browse"}
                    iconName={"book-outline"}
                    handlePress={() => navigation.navigate("Browse Stack")}
                />
            </View>
            <View style={style.buttonsSection}>
                <SectionButton
                    text={"Generated Content"}
                    iconName={"library-outline"}
                    handlePress={async () => {
                        try {
                            const data = await getGeneratedContentTitles();
                            navigation.navigate("Generated Content", {
                                generatedContent: data,
                            });
                        } catch (error) {
                            console.error(
                                "Failed to load generated content",
                                error
                            );
                        }
                    }}
                />
            </View>
            <View style={style.buttonsSection}>
                <SectionButton
                    text={"Settings"}
                    iconName={"settings-outline"}
                    handlePress={() => navigation.navigate("Settings")}
                />
            </View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: theme.mainBackgroundContainerColor,
            flex: 1,
        },
        profilePicture: {
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 1,
        },
        profilePictureContainer: {
            margin: 30,
            alignItems: "center",
        },
        profileFirstLastName: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            color: theme.Profile.UserDataColor,
        },
        profileEmail: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            color: theme.Profile.UserDataColor,
        },
    });
