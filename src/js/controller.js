import * as model from './model';
import ViewRecipe from './views/recipeView';
import searchBarView from './views/searchBarView';
import searchResultsView from './views/searchResultsView';
import paginationView from './views/paginationView';
import BookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Remove after completing the project
// if (module.hot) {
//   module.hot.accept();
// }

//  Instantiate objects out of View classes to use both static and public methods
const recipeView = new ViewRecipe();
const bookmarksView = new BookmarksView();

const controlRecipes = async function () {
  try {
    // Get recipe id from the browser url line
    const recipeId = window.location.hash.slice(1);

    // Do nothing if there's no recipe id available in the browser url line
    if (!recipeId) return;

    // Update results view to mark selected recipe from Search Results
    searchResultsView.update(model.getSearchResultsPage());

    // Update bookmarks in the View
    bookmarksView.update(model.state.bookmarks);

    // Show the spinner while a recipe is being fetched
    recipeView.renderSpinner();

    // Fetch a recipe by recipe id
    await model.loadRecipe(recipeId);

    // Render fetched recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // get a user's query from the search bar
    const query = searchBarView.getQuery();

    // Do nothing if the search bar is empty
    if (!query) return;

    searchResultsView.renderSpinner();

    // Fetch search results based on a user's input
    await model.loadSearchResults(query);

    // Render search results
    searchResultsView.render(model.getSearchResultsPage());

    // Render the initial pagination
    paginationView.render(model.state.search);
  } catch (error) {
    searchResultsView.renderError();
  }
};

// eslint-disable-next-line max-len
// A handler function that provides search results for the needed page via Model, displays search results and pagination via Pagination View
const controlPagination = function (page) {
  searchResultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

// eslint-disable-next-line max-len
// A handler function that calculates ingredient amounts for updated servings and renders an updated Recipe in the UI
const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show the spinner while waiting for the recipe to upload
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    // Display a success message after uploading a user recipe
    addRecipeView.renderMessage();

    // Render bookmarks list
    bookmarksView.render(model.state.bookmarks);

    // Add the hash of the new recipe to the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close the Modal Window with the success message and restore the recipe form to its initial state
    addRecipeView.closeAddRecipeForm();
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  // Add an event listener for rendering bookmarks upon loading the page
  BookmarksView.addHandlerRenderBookmarksOnLoad(controlBookmarks);

  // Add event handlers for hashchange and load events
  ViewRecipe.addHandlerForRender(controlRecipes);

  // Add an event handler for increasing or decreasing the number of servings
  recipeView.addHandlerForServings(controlServings);

  // Add an event listener for adding and removing bookmarks
  recipeView.addHandlerForBookmark(controlBookmark);

  // Add an event handler for the submit search query button
  searchBarView.addHandlerForSearch(controlSearchResults);

  // Add an event listener for the pagination element to listen for future pagination button clicks via event propagation
  paginationView.addHandlerForPagination(controlPagination);

  // Add an event listener for receiving user recipe data
  addRecipeView.addHandlerUploadBtn(controlAddRecipe);
};

init();
