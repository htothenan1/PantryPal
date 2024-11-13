const mongoose = require('mongoose');

const foodBoxSchema = new mongoose.Schema({
  dateCreated: {type: Date, default: Date.now},
  code: {type: String, required: true, unique: true},
  items: [String], // Store food box items
  logs: [
    {
      user: {type: String, ref: 'User', required: true},
      date: {type: Date, default: Date.now},
      item: {type: String}, // Store item name being deleted
      action: {type: String, required: true}, // 'thumbs up' or 'thumbs down'
    },
  ],
});

const FoodBox = mongoose.model('FoodBox', foodBoxSchema);

module.exports = FoodBox;
