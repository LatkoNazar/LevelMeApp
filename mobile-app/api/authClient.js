import { config } from "../config.js";
export function authClient() {
    return {
        async SignUp(userData) {
            const response = await fetch(`${config.BACKEND_URL}/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            return response;
        },

        async Login(userData, deviceInfo) {
            const response = await fetch(`${config.BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData, deviceInfo),
            });
            return response;
        },
    };
}
