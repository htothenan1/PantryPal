const mongoose = require('mongoose');

const importedRecipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  totalTime: {type: String},
  ingredients: [String],
  instructions: [String],
  yield: {type: String},
  user: {type: String, ref: 'User', required: true},
});

const ImportedRecipe = mongoose.model('ImportedRecipe', importedRecipeSchema);

module.exports = ImportedRecipe;
