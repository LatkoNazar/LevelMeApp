import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AppText from "../../components/AppText";
import ProfileButton from "../../components/ProfileButton";

import themes from "../../design/themes";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../config";

import CurveLine from "../../design/backgrounds/CurveLine";

export default function Profile() {
    const token = useSelector((state) => state.auth.token);
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);
    const [userData, setUserData] = useState();
    const [generatedContent, setGeneratedContent] = useState();
    const navigation = useNavigation();

    async function getGeneratedContentTitles() {
        const response = await fetch(
            `${config.BACKEND_URL}/user-data/generated-content`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGeneratedContent(data);
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${config.BACKEND_URL}/user-data/get-profile-data`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            }
        };

        fetchData();
    }, []);

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
                <ProfileButton
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
                <ProfileButton
                    text={"Settings"}
                    iconName={"settings"}
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
            color: theme.ProfileUserDataColor,
        },
        profileEmail: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            color: theme.ProfileUserDataColor,
        },
    });
