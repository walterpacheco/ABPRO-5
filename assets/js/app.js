import { fetchRecipesByName } from './api.js';

document.getElementById('recipeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value.trim();

    if (searchInput === '' || !/^[A-Za-z\s]+$/.test(searchInput)) {
        alert('Por favor, ingrese un nombre válido.');
        return;
    }

    const recipes = await fetchRecipesByName(searchInput);

    if (recipes) {
        displayRecipes(recipes);
    } else {
        displayError('No se encontraron recetas.');
    }
});

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.strMeal}</h5>
                        <p class="card-text">${recipe.strInstructions.substring(0, 100)}...</p>
                    </div>
                </div>
            </div>
        `;
        recipesContainer.innerHTML += recipeCard;
    });
}

function displayError(message) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = `<div class="col-12"><p class="alert alert-danger">${message}</p></div>`;
}
