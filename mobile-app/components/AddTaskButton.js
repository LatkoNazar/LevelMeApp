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
import AppText from "./AppText";

export default function AddTaskButton(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState("");

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
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <AppText style={styles.textModal}>
                            Enter your task:
                        </AppText>
                        <TextInput
                            placeholder="Your new task..."
                            placeholderTextColor="#27374D"
                            value={taskText}
                            onChangeText={setTaskText}
                            style={styles.input}
                        />
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleAdd}
                            >
                                <AppText
                                    style={[
                                        styles.buttonText.base,
                                        styles.buttonText.add,
                                    ]}
                                >
                                    Add
                                </AppText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <AppText
                                    style={[
                                        styles.buttonText.base,
                                        styles.buttonText.cancel,
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

const styles = StyleSheet.create({
    textModal: {
        fontWeight: "bold",
        color: "#27374D",
    },
    buttonWrapper: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#526D82",
    },

    modalContent: {
        borderRadius: 10,
        backgroundColor: "#9DB2BF",
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
