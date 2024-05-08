const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 30},
  storage_tip: {type: String, required: true, maxlength: 400},
  exp_date: {type: Date, required: true},
  user: {type: String, ref: 'User', required: true},
  dateTime: {type: Date, default: Date.now},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
