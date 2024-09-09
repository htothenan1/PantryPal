const mongoose = require('mongoose');

const foodBoxSchema = new mongoose.Schema({
  code: {type: String, required: true, unique: true},
  items: {type: [String], required: true},
  dateCreated: {type: Date, default: Date.now},
});

const FoodBox = mongoose.model('FoodBox', foodBoxSchema);

module.exports = FoodBox;
