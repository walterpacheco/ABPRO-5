export async function fetchRecipesByName(name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error al obtener las recetas:', error);
        return null;
    }
}
