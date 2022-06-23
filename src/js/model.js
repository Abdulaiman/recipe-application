import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};
export const loadRecipe = async id => {
  try {
    // console.log(id);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    console.log(res);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);
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
    alert(error);
  }
};
