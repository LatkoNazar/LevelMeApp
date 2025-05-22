export async function getAllExercises(category) {
    const response = await fetch(
        `http://192.168.0.105:5000/${category}-exercises`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}
