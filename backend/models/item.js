const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 30},
  storage_tip: {type: String, required: true, maxlength: 500},
  whyEat: {type: String, required: true, maxlength: 500},
  exp_date: {type: Date, required: true},
  user: {type: String, ref: 'User', required: true},
  dateTime: {type: Date, default: Date.now},
  isFoodBoxItem: {type: Boolean, default: false},
  foodBoxId: {type: String, default: null},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
