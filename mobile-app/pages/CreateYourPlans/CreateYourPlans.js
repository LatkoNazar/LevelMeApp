import { View, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import CreateYourPlansOptionsAssets from "../../assets/generated_objects/CreateYourPlansOptionsAssets";
import { useNavigation } from "@react-navigation/native";

import themes from "../../design/themes";
import { useSelector } from "react-redux";

import { createYourPlansOptions } from "./createYourPlansOptions";
import Schema from "../../design/backgrounds/Schema";

export default function CreateYourPlans() {
    const navigation = useNavigation();

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <>
            <Schema />
            <ScrollView style={style.main}>
                <View style={style.container}>
                    {createYourPlansOptions.map((optionObject) => (
                        <OptionCard
                            key={optionObject.title}
                            optionName={optionObject.title}
                            img={
                                CreateYourPlansOptionsAssets[optionObject.title]
                                    .img
                            }
                            title={
                                CreateYourPlansOptionsAssets[optionObject.title]
                                    .text
                            }
                            description={optionObject.description}
                            withImage={true}
                            styles={style.optionCardComponent}
                            handlePress={() =>
                                navigation.navigate(optionObject.title)
                            }
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            backgroundColor: "transparent",
        },
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
        },
    });
