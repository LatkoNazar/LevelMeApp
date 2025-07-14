import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Platform,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import themes from "../../design/themes";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppText from "../../components/AppText";
import { useRef, useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";

const weightValues = Array.from({ length: 1101 }, (_, i) =>
    (30 + i * 0.1).toFixed(1)
);
const { width } = Dimensions.get("window");

export default function DailyHealthEntry() {
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

    function handleDone() {
        let adjustedBedTime = bedTime;
        if (wakeUpTime && bedTime && wakeUpTime - bedTime < 0) {
            adjustedBedTime = new Date(bedTime);
            adjustedBedTime.setDate(adjustedBedTime.getDate() - 1);
        }
        const hoursSlept = (wakeUpTime - adjustedBedTime) / (1000 * 60 * 60);
        console.log(
            `RESULT => weight: ${weight}. WakeUp day: ${wakeUpTime.toLocaleDateString()}. You sleep: ${hoursSlept.toFixed(
                2
            )} hours. mood: ${mood}`
        );
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
                            height={300}
                            width={150}
                            initialSelectedIndex={40}
                            items={weightValues.map((w) => ({
                                label: w,
                                value: w,
                            }))}
                            onChange={({ item }) => {
                                setWeight(item.value);
                            }}
                        />
                        {weight && (
                            <TouchableOpacity
                                onPress={handleScrollToNext}
                                style={style.next}
                            >
                                <AppText>➔</AppText>
                            </TouchableOpacity>
                        )}
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
                        />
                        {bedTime && (
                            <TouchableOpacity
                                onPress={handleScrollToNext}
                                style={style.next}
                            >
                                <AppText>➔</AppText>
                            </TouchableOpacity>
                        )}
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
                        />
                        {wakeUpTime && (
                            <TouchableOpacity
                                onPress={handleScrollToNext}
                                style={style.next}
                            >
                                <AppText>➔</AppText>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case "mood":
                return (
                    <View style={style.step}>
                        <AppText style={style.label}>Mood (1-10):</AppText>
                        <TextInput
                            style={style.input}
                            keyboardType="numeric"
                            maxLength={2}
                            placeholder="Enter mood"
                            onChangeText={(text) => {
                                setMood(text);
                            }}
                            value={mood}
                        />
                        {mood && (
                            <TouchableOpacity
                                onPress={handleDone}
                                style={style.next}
                            >
                                <AppText>Done</AppText>
                            </TouchableOpacity>
                        )}
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
                                    fontSize: 24,
                                }}
                            >
                                {completed ? "✔" : "○"}
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
        },
        step: {
            width: width,
            alignItems: "center",
            paddingHorizontal: 20,
        },
        indicatorRow: {
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
        },
        next: {
            marginTop: 20,
            backgroundColor: theme.primary || "#ccc",
            padding: 10,
            borderRadius: 10,
        },
    });
