import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoList from "../pages/DailyRoutine/ToDoList";
import TasksAndLists from "../pages/DailyRoutine/TasksAndLists";
import CreateNewTask from "../pages/DailyRoutine/CreateNewTask";

const Stack = createNativeStackNavigator();

export default function DailyRoutineStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9DB2BF",
                },
                headerTintColor: "#27374D",
            }}
        >
            <Stack.Screen name="Your Tasks" component={ToDoList} />
            <Stack.Screen name="Tasks & Lists" component={TasksAndLists} />
            <Stack.Screen name="Create a New Task" component={CreateNewTask} />
        </Stack.Navigator>
    );
}
