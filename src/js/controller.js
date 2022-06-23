import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
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
    alert(err);
  }
};
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
// console.log(model.loadRecipe());
