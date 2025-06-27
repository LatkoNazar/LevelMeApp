import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpPage from "../pages/LoginAndSignUp/SignUp";
import LoginPage from "../pages/LoginAndSignUp/Login";

const Auth = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Auth.Navigator screenOptions={{ headerShown: false }}>
            <Auth.Screen name="Sign Up" component={SignUpPage} />
            <Auth.Screen name="Login" component={LoginPage} />
        </Auth.Navigator>
    );
}
