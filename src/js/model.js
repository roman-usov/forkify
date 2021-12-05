export const state = {
  recipe: {},
}

export const loadRecipe = async function (id) {
  try {
    const recipeResponse = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const recipeData = await recipeResponse.json();
    if(!recipeResponse.ok) throw new Error (`${recipeResponse.status} ${recipeData.message}`);
    const {recipe} = recipeData.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    }
  } catch (err) {
    //alert(`Something went wrong: ${err.message}`);
    console.log(`Something went wrong: ${err.message}`);
  }
};