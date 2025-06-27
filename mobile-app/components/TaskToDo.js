import {
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    TextInput,
    Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppText from "./AppText";

import themes from "../design/themes";
import { useSelector } from "react-redux";

export default function TaskToDo(props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [changeTaskVisible, setChangeTaskVisible] = useState(false);
    const [taskText, setTaskText] = useState(props.task.title);

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    function handleCompletedTask() {
        props.toggleTaskCompleted(props.task.id);
    }

    function handleLongPress() {
        setMenuVisible(!menuVisible);
    }

    function handleChangeButtonPress() {
        setMenuVisible(!menuVisible);
        setChangeTaskVisible(!changeTaskVisible);
    }

    function handleDelete() {
        props.onDeleteTask(props.task.id);
    }

    function handleChangeTask() {
        if (taskText.trim()) {
            props.onEditTask(props.task.id, taskText);
            setTaskText("");
            setChangeTaskVisible(false);
        }
    }

    useEffect(() => {
        if (changeTaskVisible) {
            setTaskText(props.task.title);
        }
    }, [changeTaskVisible]);

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={handleCompletedTask} style={style.check}>
                {props.task.completed && (
                    <AppText style={{ fontSize: 25 }}>✔</AppText>
                )}
            </TouchableOpacity>
            <View style={style.separator}></View>
            <TouchableOpacity
                style={style.taskDesc}
                onLongPress={handleLongPress}
            >
                <AppText style={style.taskText}>{props.task.title}</AppText>
            </TouchableOpacity>

            <Modal transparent={true} visible={menuVisible}>
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <View style={style.menuText}>
                            <AppText>Choose option:</AppText>
                            <TouchableOpacity
                                onPress={() => setMenuVisible(!menuVisible)}
                                style={style.close}
                            >
                                <AppText style={style.X}>✖️</AppText>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttonGroup}>
                            <TouchableOpacity
                                style={style.changeButton}
                                onPress={handleChangeButtonPress}
                            >
                                <AppText style={style.changeText}>
                                    Change
                                </AppText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={style.deleteButton}
                                onPress={handleDelete}
                            >
                                <AppText style={style.deleteText}>
                                    Delete
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={changeTaskVisible}>
                <View style={style.changeModalContainer}>
                    <View style={style.changeModalContent}>
                        <AppText>Enter your task:</AppText>
                        <TextInput
                            placeholder="Change task..."
                            value={taskText}
                            onChangeText={setTaskText}
                            style={style.input}
                        />
                        <View style={style.buttonGroup}>
                            <Button title="Change" onPress={handleChangeTask} />
                            <Button
                                title="Cancel"
                                color="gray"
                                onPress={() => setChangeTaskVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

TaskToDo.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    toggleTaskCompleted: PropTypes.func,
    onEditTask: PropTypes.func,
};

const styles = (theme) =>
    StyleSheet.create({
        container: {
            width: "100%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.TaskToDoBackgroundColor,
        },

        check: {
            width: 35,
            height: 35,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
        },

        taskDesc: {
            flex: 1,
            padding: 5,
        },

        separator: {
            height: "100%",
            width: 1,
            backgroundColor: "black",
            marginHorizontal: 10,
        },

        overlay: {
            flex: 1,
            justifyContent: "center",
            position: "absolute",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            elevation: 5,
        },

        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.mainBackgroundContainerColor,
        },

        modalContent: {
            borderRadius: 10,
            backgroundColor: "#fff",
            padding: 20,
            width: "80%",
            alignItems: "center",
        },

        buttonGroup: {
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            gap: 10,
        },

        deleteButton: {
            alignItems: "center",
            flex: 1,
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
        },
        changeButton: {
            alignItems: "center",
            flex: 1,
            backgroundColor: "lightblue",
            padding: 10,
            borderRadius: 5,
        },

        close: {
            position: "absolute",
            right: -15,
            top: -15,
        },

        menuText: {
            width: "100%",
            alignItems: "center",
        },

        X: {
            fontSize: 30,
        },
        changeModalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgrey",
        },

        changeModalContent: {
            borderRadius: 10,
            backgroundColor: "#fff",
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
    });
