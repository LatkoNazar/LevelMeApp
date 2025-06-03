export async function getAllExercises(category, page = 1, per_page = 50) {
    const response = await fetch(
        `http://192.168.0.105:5000/${category}-exercises?page=${page}&per_page=${per_page}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}
