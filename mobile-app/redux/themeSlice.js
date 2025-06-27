import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "APP_THEME";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: "standard",
        loaded: false,
    },
    reducers: {
        setTheme(state, action) {
            state.mode = action.payload; // payload - theme name
            state.loaded = true;
            AsyncStorage.setItem(THEME_KEY, action.payload);
        },
        markLoaded(state) {
            state.loaded = true;
        },
    },
});

export const { setTheme, markLoaded } = themeSlice.actions;
export default themeSlice.reducer;
