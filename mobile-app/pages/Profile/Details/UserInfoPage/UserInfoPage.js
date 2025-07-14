import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    ScrollView,
} from "react-native";
import AppText from "../../../../components/AppText";
import { useSelector } from "react-redux";
import themes from "../../../../design/themes";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { config } from "../../../../config";

import { createProfileClient } from "../../../../api/profileClient";

const LabeledInput = ({ label, value, setValue, error, isEditing }) => (
    <View style={{ marginBottom: 10, zIndex: 0 }}>
        <AppText>{label}</AppText>
        <TextInput
            editable={isEditing}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={{
                borderColor: error ? "red" : "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                padding: 8,
                marginTop: 4,
                backgroundColor: isEditing ? "#fff" : "#eee",
                color: "#000",
            }}
        />
        {error && (
            <AppText style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                {error}
            </AppText>
        )}
    </View>
);

export default function UserInfoPage() {
    const token = useSelector((state) => state.auth.token);
    const api = createProfileClient(token);

    const [infoInDatabase, setInfoInDatabase] = useState(false);

    const route = useRoute();
    const { first_name, last_name, email } = route.params || {};
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    const [errors, setErrors] = useState({});

    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();

    const [sexOpen, setSexOpen] = useState(false);
    const [sex, setSex] = useState(null);
    const [sexItems, setSexItems] = useState([
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ]);

    const [bodyTypeOpen, setBodyTypeOpen] = useState(false);
    const [bodyType, setBodyType] = useState(null);
    const [bodyTypeItems, setBodyTypeItems] = useState([
        { label: "Ectomorph", value: "ectomorph" },
        { label: "Mesomorph", value: "mesomorph" },
        { label: "Endomorph", value: "endomorph" },
    ]);

    const calculateBMI = () => {
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        if (!h || !w) return "-";
        return (w / (h * h)).toFixed(1);
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!age || isNaN(age) || parseInt(age) <= 0 || parseInt(age) > 120) {
            newErrors.age = "Enter a valid age (1–120)";
        }

        if (
            !height ||
            isNaN(height) ||
            parseFloat(height) < 50 ||
            parseFloat(height) > 300
        ) {
            newErrors.height = "Enter a valid height (50–300 cm)";
        }

        if (
            !weight ||
            isNaN(weight) ||
            parseFloat(weight) < 20 ||
            parseFloat(weight) > 500
        ) {
            newErrors.weight = "Enter a valid weight (20–500 kg)";
        }

        if (!sex) {
            newErrors.sex = "Please select your sex";
        }

        if (!bodyType) {
            newErrors.bodyType = "Please select your body type";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <View style={style.main}>
            <View style={style.infoBlock}>
                <AppText style={style.label}>Full Name:</AppText>
                <AppText style={style.value}>
                    {first_name} {last_name}
                </AppText>
            </View>
            <View style={style.infoBlock}>
                <AppText style={style.label}>Email:</AppText>
                <AppText style={style.value}>{email}</AppText>
            </View>
            <View style={style.infoBlock}>
                <AppText style={style.label}>
                    Your Initial Physical Information
                </AppText>
                <TouchableOpacity
                    style={style.editPhysicalInfo}
                    onPress={async () => {
                        const response = await api.checkPhysicalInfo();
                        if (response.result) {
                            const info = response.physical_info;
                            setAge(String(info.age));
                            setSex(info.sex);
                            setWeight(String(info.weight));
                            setHeight(String(info.height));
                            setBodyType(info.body_type);
                            setInfoInDatabase(true);
                        } else {
                            setInfoInDatabase(response.result);
                        }
                        setModalVisible(true);
                    }}
                >
                    <AppText>Show Info</AppText>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.modalOverlay}>
                        <View style={style.modalContainer}>
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                            >
                                <LabeledInput
                                    label="Age"
                                    value={age}
                                    setValue={setAge}
                                    error={errors.age}
                                    isEditing={isEditing}
                                />

                                {isEditing ? (
                                    <View
                                        style={{
                                            zIndex: 1000,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <AppText>Sex</AppText>
                                        <DropDownPicker
                                            open={sexOpen}
                                            value={sex}
                                            items={sexItems}
                                            setOpen={setSexOpen}
                                            setValue={setSex}
                                            setItems={setSexItems}
                                            disabled={!isEditing}
                                            placeholder="Select sex"
                                            style={{
                                                marginTop: 4,
                                                backgroundColor: isEditing
                                                    ? "#fff"
                                                    : "#eee",
                                                borderColor: errors.sex
                                                    ? "red"
                                                    : "#ccc",
                                            }}
                                            dropDownContainerStyle={{
                                                borderColor: errors.sex
                                                    ? "red"
                                                    : "#ccc",
                                            }}
                                            listMode="SCROLLVIEW"
                                            zIndex={1000}
                                        />
                                        {errors.sex && (
                                            <AppText
                                                style={{
                                                    color: "red",
                                                    fontSize: 12,
                                                    marginTop: 4,
                                                }}
                                            >
                                                {errors.sex}
                                            </AppText>
                                        )}
                                    </View>
                                ) : (
                                    <LabeledInput
                                        isEditing={false}
                                        label="Sex"
                                        value={sex}
                                        setValue={setSex}
                                        error={errors.sex}
                                    />
                                )}

                                <LabeledInput
                                    label="Height (cm)"
                                    value={height}
                                    setValue={setHeight}
                                    error={errors.height}
                                    isEditing={isEditing}
                                />
                                <LabeledInput
                                    label="Weight (kg)"
                                    value={weight}
                                    setValue={setWeight}
                                    error={errors.weight}
                                    isEditing={isEditing}
                                />
                                {isEditing ? (
                                    <View
                                        style={{
                                            zIndex: 999,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <AppText>Body Type</AppText>
                                        <DropDownPicker
                                            open={bodyTypeOpen}
                                            value={bodyType}
                                            items={bodyTypeItems}
                                            setOpen={setBodyTypeOpen}
                                            setValue={setBodyType}
                                            setItems={setBodyTypeItems}
                                            disabled={!isEditing}
                                            placeholder="Select body type"
                                            style={{
                                                marginTop: 4,
                                                backgroundColor: isEditing
                                                    ? "#fff"
                                                    : "#eee",
                                                borderColor: errors.bodyType
                                                    ? "red"
                                                    : "#ccc",
                                            }}
                                            dropDownContainerStyle={{
                                                borderColor: errors.bodyType
                                                    ? "red"
                                                    : "#ccc",
                                            }}
                                            listMode="SCROLLVIEW"
                                            zIndex={999}
                                        />
                                        {errors.bodyType && (
                                            <AppText
                                                style={{
                                                    color: "red",
                                                    fontSize: 12,
                                                    marginTop: 4,
                                                }}
                                            >
                                                {errors.bodyType}
                                            </AppText>
                                        )}
                                    </View>
                                ) : (
                                    <LabeledInput
                                        isEditing={false}
                                        label="Body Type"
                                        value={bodyType}
                                        setValue={setBodyType}
                                        error={errors.bodyType}
                                    />
                                )}
                                <AppText style={style.bmiText}>
                                    BMI: {calculateBMI()}
                                </AppText>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={style.closeButton}
                                        onPress={() => {
                                            setModalVisible(false);
                                            setIsEditing(false);
                                        }}
                                    >
                                        <AppText style={{ color: "#fff" }}>
                                            Close
                                        </AppText>
                                    </TouchableOpacity>
                                    {!infoInDatabase && (
                                        <TouchableOpacity
                                            style={[
                                                style.closeButton,
                                                { backgroundColor: "#2e8b57" },
                                            ]}
                                            onPress={async () => {
                                                if (isEditing) {
                                                    if (validateInputs()) {
                                                        const response =
                                                            await api.savePhysicalInfoToDB(
                                                                {
                                                                    age: Number(
                                                                        age
                                                                    ),
                                                                    sex: sex,
                                                                    height: Number(
                                                                        height
                                                                    ),
                                                                    weight: Number(
                                                                        weight
                                                                    ),
                                                                    body_type:
                                                                        bodyType,
                                                                }
                                                            );
                                                        setIsEditing(false);
                                                    }
                                                } else {
                                                    setIsEditing(true);
                                                }
                                            }}
                                        >
                                            <AppText style={{ color: "#fff" }}>
                                                {isEditing ? "Save" : "Edit"}
                                            </AppText>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        infoBlock: {
            marginBottom: 15,
        },
        label: {
            fontSize: 14,
            fontWeight: "600",
            color: theme.textColor,
            marginBottom: 4,
        },
        value: {
            fontSize: 16,
            color: theme.textColor,
        },
        editPhysicalInfo: {
            backgroundColor: theme.Profile.editHealthInfo,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 10,
            alignSelf: "flex-start",
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
        },
        modalContainer: {
            backgroundColor: "#f9f9f9",
            padding: 20,
            borderRadius: 15,
            width: "85%",
            maxHeight: "90%",
        },
        closeButton: {
            backgroundColor: "#555",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
        },
        bmiText: {
            marginTop: 10,
            fontWeight: "600",
            fontSize: 16,
        },
    });
