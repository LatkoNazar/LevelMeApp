import * as SecureStore from "expo-secure-store";

export async function saveUserToken(token) {
    await SecureStore.setItemAsync("userToken", token);
}

export async function getUserToken() {
    return await SecureStore.getItemAsync("userToken");
}

export async function removeUserToken() {
    await SecureStore.deleteItemAsync("userToken");
}
