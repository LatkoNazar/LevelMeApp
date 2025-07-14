import AppText from "../../../components/AppText";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import themes from "../../../design/themes";

export default function DailyQuote() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchQuote = async () => {
        try {
            const today = new Date().toISOString().split("T")[0];
            const stored = await AsyncStorage.getItem("dailyQuote");

            if (stored) {
                const { date, q, a } = JSON.parse(stored);
                if (date === today) {
                    setQuote(q);
                    setAuthor(a);
                    setLoading(false);
                    return;
                }
            }

            const res = await fetch("https://zenquotes.io/api/today");
            const [data] = await res.json();

            const newQuote = data.q;
            const author = data.a;

            await AsyncStorage.setItem(
                "dailyQuote",
                JSON.stringify({ date: today, q: newQuote, a: author })
            );
            setQuote(newQuote);
            setAuthor(author);
        } catch (e) {
            setQuote(`Failed to load quote. Error: ${e}`);
            setAuthor("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <View>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={style.mainContainer}>
                    <View style={style.vertivalBar}></View>
                    <View style={style.quoteContainer}>
                        <View style={style.quoteContainer}>
                            <AppText style={style.quoteSign}>❝</AppText>
                            <AppText style={style.quoteText}>«{quote}»</AppText>
                        </View>
                        <View style={style.authorContainer}>
                            <AppText style={style.quoteText}>
                                {" "}
                                - {author}
                            </AppText>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        mainContainer: {
            flexDirection: "row",
            borderWidth: 1,
        },
        quoteContainer: {
            padding: 5,
        },
        quoteText: {
            fontStyle: "italic",
            fontSize: 14,
        },
        vertivalBar: {
            backgroundColor: theme.quoteStyle.fillColor,
            width: 8,
        },
        authorContainer: {
            alignItems: "flex-end",
            marginTop: 5,
            marginRight: 20,
        },
        quoteSign: {
            fontSize: 40,
        },
    });
