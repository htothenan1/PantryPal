const mongoose = require('mongoose');

const favoritedRecipeSchema = new mongoose.Schema({
  recipeId: {type: String, required: true},
  recipeName: {type: String, required: true}, // Add this line
  user: {type: String, ref: 'User', required: true},
});

const FavoritedRecipe = mongoose.model(
  'FavoritedRecipe',
  favoritedRecipeSchema,
);

module.exports = FavoritedRecipe;
