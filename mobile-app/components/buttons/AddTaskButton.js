import React, { useState } from "react";
import {
    View,
    Button,
    TextInput,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import AppText from "../AppText";

import themes from "../../design/themes";
import { useSelector } from "react-redux";

export default function AddTaskButton(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState("");

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    function handleAdd() {
        if (taskText.trim()) {
            props.onAddTask(taskText);
            setTaskText("");
            setModalVisible(false);
        }
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={props.style}
            >
                <AppText style={{ fontSize: 16 }}>Add new task</AppText>
            </TouchableOpacity>

            <Modal transparent={true} visible={modalVisible}>
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <AppText style={style.textModal}>
                            Enter your task:
                        </AppText>
                        <TextInput
                            placeholder="Your new task..."
                            placeholderTextColor="#27374D"
                            value={taskText}
                            onChangeText={setTaskText}
                            style={style.input}
                        />
                        <View style={style.buttonGroup}>
                            <TouchableOpacity
                                style={style.addButton}
                                onPress={handleAdd}
                            >
                                <AppText
                                    style={[
                                        style.buttonText.base,
                                        style.buttonText.add,
                                    ]}
                                >
                                    Add
                                </AppText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={style.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <AppText
                                    style={[
                                        style.buttonText.base,
                                        style.buttonText.cancel,
                                    ]}
                                >
                                    Cancel
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

AddTaskButton.propTypes = {
    onAddTask: PropTypes.func.isRequired,
    style: PropTypes.object,
};

const styles = (theme) =>
    StyleSheet.create({
        textModal: {
            fontWeight: "bold",
            color: theme.AppTextColor,
        },
        buttonWrapper: {
            flex: 1,
        },
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.mainBackgroundContainerColor,
        },

        modalContent: {
            borderRadius: 10,
            backgroundColor: theme.AddTaskButtonModalContentBackgroundColor,
            padding: 20,
            width: "80%",
            alignItems: "center",
        },

        input: {
            marginTop: 5,
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 5,
        },

        buttonGroup: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        },
        buttonText: {
            base: { fontWeight: "bold" },
            add: { color: "blue" },
            cancel: { color: "red" },
        },
        addButton: {
            padding: 5,
        },
        cancelButton: {
            padding: 5,
        },
    });
