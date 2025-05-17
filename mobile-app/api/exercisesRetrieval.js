export async function getAllExercises() {
    const response = await fetch("http://192.168.0.105:5000/all-exercises");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}
