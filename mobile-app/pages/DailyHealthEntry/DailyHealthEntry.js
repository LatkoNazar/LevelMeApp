import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Platform,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert,
} from "react-native";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppText from "../../components/AppText";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { createUserClient } from "../../api/userClient";

const weightValues = Array.from({ length: 1101 }, (_, i) =>
    (30 + i * 0.1).toFixed(1)
);
const { width } = Dimensions.get("window");

export default function DailyHealthEntry() {
    const token = useSelector((state) => state.auth.token);
    const api = createUserClient(token);

    const navigation = useNavigation();

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const [weight, setWeight] = useState();
    const [bedTime, setBedTime] = useState();
    const [wakeUpTime, setWakeUpTime] = useState();
    const [mood, setMood] = useState();
    const [currentStep, setCurrentStep] = useState(0);
    const flatListRef = useRef();

    const steps = ["weight", "bedTime", "wakeUpTime", "mood"];

    async function handleDone() {
        let adjustedBedTime = bedTime;
        if (wakeUpTime && bedTime && wakeUpTime - bedTime < 0) {
            adjustedBedTime = new Date(bedTime);
            adjustedBedTime.setDate(adjustedBedTime.getDate() - 1);
        }
        const hoursSlept = (wakeUpTime - adjustedBedTime) / (1000 * 60 * 60);

        const response = await api.saveDailyHealthEntry({
            weight: Number(weight),
            bed_time: formatDateTime(adjustedBedTime),
            wake_up: formatDateTime(wakeUpTime),
            mood: Number(mood).toFixed(2),
            hours_slept: Number(hoursSlept),
        });
        if (response.ok) {
            Alert.alert("Success");
            navigation.goBack();
        } else {
            Alert.alert("Error", `Status: ${response.status}\n${errorText}`);
        }
    }

    function formatDateTime(date) {
        const local = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
        );
        return local.toISOString();
    }

    function handleScrollToPrevious() {
        if (currentStep > 0) {
            const prev = currentStep - 1;
            flatListRef.current.scrollToIndex({ index: prev });
            setCurrentStep(prev);
        }
    }

    function handleScrollToNext() {
        if (currentStep < steps.length - 1) {
            const next = currentStep + 1;
            flatListRef.current.scrollToIndex({ index: next });
            setCurrentStep(next);
        }
    }

    const handleTimeChange = (setter) => (event, selectedDate) => {
        if (event.type !== "dismissed" && selectedDate) {
            setter(selectedDate);
        }
    };

    function renderStep({ item }) {
        switch (item) {
            case "weight":
                return (
                    <View style={style.step}>
                        <AppText style={style.label}>
                            Select your weight (kg):
                        </AppText>
                        <WheelPickerExpo
                            height={250}
                            width={100}
                            initialSelectedIndex={40}
                            items={weightValues.map((w) => ({
                                label: w,
                                value: w,
                            }))}
                            onChange={({ item }) => {
                                setWeight(item.value);
                            }}
                            backgroundColor={
                                theme.DailyHealthEntry.weightPicker
                                    .backgroundColor
                            }
                        />
                        <View style={style.NextPrevious}>
                            <View style={{ alignSelf: "flex-start" }}></View>
                            {weight && (
                                <TouchableOpacity
                                    onPress={handleScrollToNext}
                                    style={[
                                        style.navButton,
                                        { alignSelf: "flex-end" },
                                    ]}
                                >
                                    <Ionicons
                                        name="arrow-forward"
                                        size={25}
                                        color={
                                            theme.DailyHealthEntry.Ionicons
                                                .color
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                );
            case "bedTime":
                return (
                    <View style={style.step}>
                        <AppText style={style.label}>
                            When did you go to bed?
                        </AppText>
                        <DateTimePicker
                            value={bedTime || new Date()}
                            mode="time"
                            display={
                                Platform.OS === "ios" ? "spinner" : "default"
                            }
                            is24Hour={true}
                            onChange={handleTimeChange(setBedTime)}
                            textColor={
                                theme.DailyHealthEntry.dateTimePicker.textColor
                            }
                        />
                        <View style={style.NextPrevious}>
                            <TouchableOpacity
                                onPress={handleScrollToPrevious}
                                style={[
                                    style.navButton,
                                    { alignSelf: "flex-start" },
                                ]}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={25}
                                    color={
                                        theme.DailyHealthEntry.Ionicons.color
                                    }
                                />
                            </TouchableOpacity>
                            <View>
                                {bedTime && (
                                    <TouchableOpacity
                                        onPress={handleScrollToNext}
                                        style={[
                                            style.navButton,
                                            { alignSelf: "flex-end" },
                                        ]}
                                    >
                                        <Ionicons
                                            name="arrow-forward"
                                            size={25}
                                            color={
                                                theme.DailyHealthEntry.Ionicons
                                                    .color
                                            }
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                );
            case "wakeUpTime":
                return (
                    <View style={style.step}>
                        <AppText style={style.label}>
                            When did you wake up?
                        </AppText>
                        <DateTimePicker
                            value={wakeUpTime || new Date()}
                            mode="time"
                            display={
                                Platform.OS === "ios" ? "spinner" : "default"
                            }
                            is24Hour={true}
                            onChange={handleTimeChange(setWakeUpTime)}
                            textColor={
                                theme.DailyHealthEntry.dateTimePicker.textColor
                            }
                        />
                        <View style={style.NextPrevious}>
                            <TouchableOpacity
                                onPress={handleScrollToPrevious}
                                style={[
                                    style.navButton,
                                    { alignSelf: "flex-start" },
                                ]}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={25}
                                    color={
                                        theme.DailyHealthEntry.Ionicons.color
                                    }
                                />
                            </TouchableOpacity>
                            {wakeUpTime && (
                                <TouchableOpacity
                                    onPress={handleScrollToNext}
                                    style={[
                                        style.navButton,
                                        { alignSelf: "flex-end" },
                                    ]}
                                >
                                    <Ionicons
                                        name="arrow-forward"
                                        size={25}
                                        color={
                                            theme.DailyHealthEntry.Ionicons
                                                .color
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                );
            case "mood":
                return (
                    <View style={style.step}>
                        <AppText style={style.label}>Mood (1-10):</AppText>
                        <Slider
                            style={{ width: "100%", height: 40 }}
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            value={mood ? Number(mood) : 5}
                            onValueChange={(value) => setMood(String(value))}
                            minimumTrackTintColor={
                                theme.DailyHealthEntry.Slider
                                    .minimumTrackTintColor
                            }
                            maximumTrackTintColor={
                                theme.DailyHealthEntry.Slider
                                    .maximumTrackTintColor
                            }
                        />
                        <AppText style={{ marginTop: 10, fontSize: 18 }}>
                            Mood: {mood || 5}
                        </AppText>
                        <View style={style.NextPrevious}>
                            <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <TouchableOpacity
                                    onPress={handleScrollToPrevious}
                                    style={style.navButton}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={25}
                                        color={
                                            theme.DailyHealthEntry.Ionicons
                                                .color
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                {mood && (
                                    <TouchableOpacity
                                        onPress={handleDone}
                                        style={style.navButton}
                                    >
                                        <Ionicons
                                            name="send"
                                            size={25}
                                            color={
                                                theme.DailyHealthEntry.Ionicons
                                                    .color
                                            }
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    }

    return (
        <View style={style.main}>
            <View style={style.indicatorRow}>
                {steps.map((step, index) => {
                    const completed =
                        (step === "weight" && weight) ||
                        (step === "bedTime" && bedTime) ||
                        (step === "wakeUpTime" && wakeUpTime) ||
                        (step === "mood" && mood);
                    return (
                        <View key={step} style={style.indicator}>
                            <AppText
                                style={{
                                    fontSize: 30,
                                    color: theme.DailyHealthEntry.signsColor
                                        .color,
                                }}
                            >
                                {completed ? (
                                    <Ionicons
                                        name="checkmark-done"
                                        size={30}
                                        color={
                                            theme.DailyHealthEntry.signsColor
                                                .color
                                        }
                                    />
                                ) : (
                                    <Ionicons
                                        name="ellipse-outline"
                                        size={20}
                                        color={
                                            theme.DailyHealthEntry.signsColor
                                                .color
                                        }
                                    />
                                )}
                            </AppText>
                        </View>
                    );
                })}
            </View>
            <FlatList
                data={steps}
                renderItem={renderStep}
                keyExtractor={(item) => item}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.DailyHealthEntry.main.backgroundColor,
        },
        step: {
            width: width,
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: theme.DailyHealthEntry.step.backgroundColor,
        },
        indicatorRow: {
            flexDirection: "row",
            justifyContent: "center",

            backgroundColor: "transparent",
        },
        indicator: {
            margin: 15,
            justifyContent: "center",
        },
        label: {
            fontSize: 20,
            fontWeight: "600",
            color: theme.DailyHealthEntry.label.color,
            marginBottom: 20,
            textAlign: "center",
        },
        navButton: {
            marginTop: 20,
            backgroundColor: theme.DailyHealthEntry.navButton.backgroundColor,
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 12,
            shadowColor: theme.DailyHealthEntry.navButton.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            marginHorizontal: 10,
        },
        NextPrevious: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            marginTop: 20,
        },
    });
