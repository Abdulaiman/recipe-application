import * as model from './model.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
// console.log(model.state);
// https://forkify-api.herokuapp.com/v2
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpiner();
    bookmarksView.update(model.state.bookmarks);

    // loading recipes
    resultsView.update(model.getSearchResultPage());
    await model.loadRecipe(id);
    // console.log(recipeView);
    // rendering recipes
    recipeView.render(model.state.recipe);
    // debugger;
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpiner();
    // get search query
    const query = searchView.getQuery();

    if (!query) return;

    // load search results
    await model.loadSearchResult(query);
    // render result

    resultsView.render(model.getSearchResultPage());

    // render initial pagination button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = goToPage => {
  resultsView.render(model.getSearchResultPage(goToPage));

  // render new pagination button
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async newRecipe => {
  try {
    addRecipeView.renderSpiner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    // close form
    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err, ':D');
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerCLick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
// recipeView.addHandlerRender(controlRecipe)
// console.log(model.loadRecipe());
const clearBookmark = () => {
  localStorage.clear('bookmarks');
};
// clearBookmark();
