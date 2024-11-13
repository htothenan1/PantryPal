const mongoose = require('mongoose');

const customFoodBoxSchema = new mongoose.Schema({
  name: {type: String, required: true}, // User-defined template name
  items: [String], // Store food box items
  dateCreated: {type: Date, default: Date.now},
});

const CustomFoodBox = mongoose.model('CustomFoodBox', customFoodBoxSchema);

module.exports = CustomFoodBox;
