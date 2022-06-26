import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJson } from './helpers.js';
import { RESULT_PER_PAGE } from './config.js';
console.log(RESULT_PER_PAGE);
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultPerPage: RESULT_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async id => {
  try {
    // console.log(id);
    console.log(API_URL, id);
    const data = await getJson(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};
export const loadSearchResult = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);
    console.log(data.data.recipes);

    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; //0;
  const end = page * state.search.resultPerPage; //9

  return state.search.result.slice(start, end);
};
// getSearchResultPage(1);
export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // new Quantity = old quantity * newServings / oldservings
  });
  state.recipe.servings = newServings;
};
