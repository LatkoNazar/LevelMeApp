import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoList from "../pages/DailyRoutine/ToDoList";
import TasksAndLists from "../pages/DailyRoutine/TasksAndLists";
import CreateNewTask from "../pages/DailyRoutine/CreateNewTask";
import { useSelector, useDispatch } from "react-redux";
import themes from "../design/themes";
const Stack = createNativeStackNavigator();

export default function DailyRoutineStack() {
    const currentThemeName = useSelector((state) => state.theme.mode);
    const theme = themes[currentThemeName] || themes.standard;
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.headerColor,
                },
                headerTintColor: theme.headerTintColor,
            }}
        >
            <Stack.Screen name="Your Tasks" component={ToDoList} />
            <Stack.Screen name="Tasks & Lists" component={TasksAndLists} />
            <Stack.Screen name="Create a New Task" component={CreateNewTask} />
        </Stack.Navigator>
    );
}
