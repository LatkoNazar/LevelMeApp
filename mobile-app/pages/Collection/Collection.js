import { View, ScrollView, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import CollectionOptionsAssets from "../../assets/generated_objects/CollectionOptionsAssets";
import { useNavigation } from "@react-navigation/native";

import themes from "../../design/themes";
import { useSelector } from "react-redux";

import { collectionOptions } from "./collectionOptions";
import CurveLine from "../../design/backgrounds/CurveLine";

export default function Collection() {
    const navigation = useNavigation();

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    return (
        <>
            <CurveLine />
            <ScrollView style={style.main}>
                <View style={style.container}>
                    {collectionOptions.map((optionObject) => (
                        <OptionCard
                            key={optionObject.title}
                            optionName={optionObject.title}
                            img={
                                CollectionOptionsAssets[optionObject.title].img
                            }
                            title={
                                CollectionOptionsAssets[optionObject.title].text
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
