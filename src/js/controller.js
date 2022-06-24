import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

// console.log(model.state);
// https://forkify-api.herokuapp.com/v2

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    // loading recipes
    await model.loadRecipe(id);
    // console.log(recipeView);
    recipeView.renderSpiner();
    // rendering recipes
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
// recipeView.addHandlerRender(controlRecipe)
// console.log(model.loadRecipe());
