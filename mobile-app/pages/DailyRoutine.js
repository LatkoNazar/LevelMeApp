import { useState } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import TaskToDo from "../components/TaskToDo.js";
import AddTaskButton from "../components/AddTaskButton.js";
import ClearTasks from "../components/ClearTasks.js";
import AppText from "../components/AppText.js";

export default function DailyRoutine() {
    const [tasks, setTasks] = useState([]);

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

    const uncompletedTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.taskSection}>
                    <AppText style={styles.sectionHeader}>Uncompleted:</AppText>
                    {uncompletedTasks.length > 0 ? (
                        <FlatList
                            data={uncompletedTasks}
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
                        <AppText style={styles.emptyText}>No tasks</AppText>
                    )}
                </View>

                <View style={styles.taskSection}>
                    <AppText style={styles.sectionHeader}>Completed:</AppText>
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
                        <AppText style={styles.emptyText}>
                            No uncompleted tasks
                        </AppText>
                    )}
                </View>
            </ScrollView>

            <View style={styles.buttons}>
                <AddTaskButton
                    onAddTask={handleAddTask}
                    style={styles.customButton}
                />
                <ClearTasks
                    onClearTask={handleClearList}
                    style={styles.customButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10,
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
        color: "#777",
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
        backgroundColor: "lightgrey",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
        gap: 10,
    },
});
