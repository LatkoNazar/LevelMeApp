import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";

export default function IconCounter({
    name,
    badgeCount,
    color,
    size,
    handlePress,
}) {
    return (
        <TouchableOpacity
            style={{ width: size, height: size, margin: 5 }}
            onPress={handlePress}
        >
            <Ionicons name={name} size={size} color={color} />
            {badgeCount > 0 && (
                <View
                    style={{
                        position: "absolute",
                        right: -6,
                        top: -3,
                        backgroundColor: "red",
                        borderRadius: 8,
                        minWidth: 16,
                        height: 16,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 3,
                    }}
                >
                    <AppText
                        style={{
                            color: "white",
                            fontSize: 10,
                            fontWeight: "bold",
                        }}
                    >
                        {badgeCount}
                    </AppText>
                </View>
            )}
        </TouchableOpacity>
    );
}
