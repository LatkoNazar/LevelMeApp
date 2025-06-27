import { useState } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import TaskToDo from "../../components/TaskToDo.js";
import AddTaskButton from "../../components/AddTaskButton.js";
import ClearTasks from "../../components/ClearTasks.js";
import AppText from "../../components/AppText.js";

import themes from "../../design/themes.js";
import { useSelector } from "react-redux";

export default function DailyRoutine() {
    const [tasks, setTasks] = useState([]);

    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    const style = styles(theme);

    function handleAddTask(newTask) {
        setTasks((prev) => [
            ...prev,
            { id: Date.now().toString(), title: newTask, completed: false },
        ]);
    }

    function handleChangeTask(taskId, newtext) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title: newtext } : task
            )
        );
    }

    function toggleTaskCompleted(taskId) {
        setTasks((prevTasks) => {
            const updated = prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            );
            return [...updated].sort((a, b) => a.completed - b.completed);
        });
    }

    function handleClearList() {
        setTasks([]);
    }

    function handleDeleteTask(taskId) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <View style={style.main}>
            <View></View>
            <ScrollView contentContainerStyle={style.scrollContent}>
                <View style={style.taskSection}>
                    <AppText style={style.sectionHeader}>Pending:</AppText>
                    {pendingTasks.length > 0 ? (
                        <FlatList
                            data={pendingTasks}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TaskToDo
                                    task={item}
                                    onDeleteTask={handleDeleteTask}
                                    onEditTask={handleChangeTask}
                                    toggleTaskCompleted={toggleTaskCompleted}
                                />
                            )}
                            scrollEnabled={false}
                        />
                    ) : (
                        <AppText style={style.emptyText}>No tasks</AppText>
                    )}
                </View>

                <View style={style.taskSection}>
                    <AppText style={style.sectionHeader}>Completed:</AppText>
                    {completedTasks.length > 0 ? (
                        <FlatList
                            data={completedTasks}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TaskToDo
                                    task={item}
                                    onDeleteTask={handleDeleteTask}
                                    toggleTaskCompleted={toggleTaskCompleted}
                                />
                            )}
                            scrollEnabled={false}
                        />
                    ) : (
                        <AppText style={style.emptyText}>
                            No pending tasks
                        </AppText>
                    )}
                </View>
            </ScrollView>

            <View style={style.buttons}>
                <AddTaskButton
                    onAddTask={handleAddTask}
                    style={style.customButton}
                />
                <ClearTasks
                    onClearTask={handleClearList}
                    style={style.customButton}
                />
            </View>
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        main: {
            flex: 1,
            padding: 10,
            backgroundColor: theme.mainBackgroundContainerColor,
        },
        scrollContent: {
            padding: 10,
        },
        taskSection: {
            marginBottom: 20,
        },
        sectionHeader: {
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 10,
        },
        emptyText: {
            fontStyle: "italic",
            color: theme.AppTextColor,
        },
        buttons: {
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
            gap: 15,
        },
        customButton: {
            flex: 1,
            borderWidth: 1,
            backgroundColor: theme.DailyRoutineButtonsColor,
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 10,
            alignItems: "center",
            gap: 10,
        },
    });
