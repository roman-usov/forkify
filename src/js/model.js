/* eslint-disable no-useless-catch */
//  import ShortUniqueId from 'short-unique-id';
// eslint-disable-next-line no-unused-vars
import { Fraction } from 'fractional';
// eslint-disable-next-line no-unused-vars
import { async } from 'regenerator-runtime';
import { RECIPES_API_URL, RESULTS_PER_PAGE, STEP, API_KEY } from './config';
import { AJAXcall, round } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

// A function to get a recipe by its id
export const loadRecipe = async function (id) {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await AJAXcall(`${RECIPES_API_URL}${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

// A function to get an array of recipes based on a user's query
export const loadSearchResults = async function (query) {
  // eslint-disable-next-line no-useless-catch
  try {
    state.search.query = query;
    const data = await AJAXcall(
      `${RECIPES_API_URL}?search=${query}&key=${API_KEY}`
    );
    const { recipes } = data.data;
    state.search.results = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      ...(recipe.key && { key: recipe.key }),
    }));
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  const updatedIngredients = state.recipe.ingredients.map(ingredient => {
    const updatedIngredient = ingredient;
    if (!ingredient.quantity) return ingredient;

    //  const quantityPerServing = ingredient.quantity / state.recipe.servings;

    updatedIngredient.quantity = round(
      (updatedIngredient.quantity / state.recipe.servings) * newServings,
      STEP
    );

    return updatedIngredient;
  });

  state.recipe.ingredients = updatedIngredients;
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const removeBookmark = function (id) {
  // Delete bookmark
  const bookmarkToRemoveIndex = state.bookmarks.findIndex(
    bookmark => bookmark.id === id
  );

  state.bookmarks.splice(bookmarkToRemoveIndex, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// Helper function to generate a recipe Id
/* const uid = new ShortUniqueId({
  length: 24,
  dictionary: 'alphanum_lower',
}); */

// Upload a user recipe
export const uploadRecipe = async function (userRecipe) {
  try {
    const ingredients = Object.entries(userRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1])
      .map(entry => entry[1])
      .map(entry => {
        const ingredientArr = entry
          .trim()
          .replace(/\s{2,}/g, '')
          .split(',');

        if (ingredientArr.length !== 3 || !ingredientArr[2])
          throw new Error(
            'Wrong ingredient format. Please, use the following format: quantity,unit,description :)'
          );

        const [quantity, unit, description] = ingredientArr;

        const ingredient = {
          quantity: quantity ? +quantity : null,
          unit: unit || null,
          description,
        };

        return ingredient;
      });

    const recipeForUpload = {
      title: userRecipe.title,
      publisher: userRecipe.publisher,
      source_url: userRecipe.sourceUrl,
      image_url: userRecipe.image,
      ingredients,
      servings: +userRecipe.servings,
      cooking_time: +userRecipe.cookingTime,
    };

    const data = await AJAXcall(
      `${RECIPES_API_URL}?key=${API_KEY}`,
      recipeForUpload
    );

    state.recipe = createRecipeObject(data);

    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
