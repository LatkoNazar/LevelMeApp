import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        token: "",
    },
    reducers: {
        loginSuccess(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = "";
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        removeToken(state) {
            state.token = "";
        },
    },
});

export const { loginSuccess, logout, setToken, removeToken } =
    authSlice.actions;
export default authSlice.reducer;
