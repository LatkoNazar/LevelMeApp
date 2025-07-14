import { config } from "../config";

export function createProfileClient(token) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    return {
        async getGeneratedContentTitles() {
            const response = await fetch(
                `${config.BACKEND_URL}/user-data/generated-content`,
                {
                    method: "GET",
                    headers,
                }
            );
            if (!response.ok) throw new Error("Failed to fetch titles");
            return response.json();
        },

        async fetchEmailFirstLastNameData() {
            const response = await fetch(
                `${config.BACKEND_URL}/user-data/get-profile-data`,
                {
                    method: "POST",
                    headers,
                }
            );
            return response.json();
        },

        async getGeneratedContent() {
            const response = await fetch(
                `${config.BACKEND_URL}/user-data/generated-content/get-content`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ id: id }),
                }
            );
            return response.json();
        },

        async checkPhysicalInfo() {
            const response = await fetch(
                `${config.BACKEND_URL}/user-data/info/check-physical-info`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.json();
        },

        async savePhysicalInfoToDB(data) {
            const response = await fetch(
                `${config.BACKEND_URL}/user-data/info/save-physical-info`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        age: data.age,
                        sex: data.sex,
                        height: data.height,
                        weight: data.weight,
                        body_type: data.body_type,
                    }),
                }
            );
            return response.json();
        },
    };
}
