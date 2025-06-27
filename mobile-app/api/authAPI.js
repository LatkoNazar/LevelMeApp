import { config } from "../config.js";

export async function SignUp(userData) {
    const response = await fetch(`${config.BACKEND_URL}/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return response;
}

export async function Login(userData, deviceInfo) {
    const response = await fetch(`${config.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData, deviceInfo),
    });
    return response;
}
