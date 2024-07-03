const mongoose = require('mongoose');

const pantryItemSchema = new mongoose.Schema({
  itemName: {type: String, required: true},
  user: {type: String, ref: 'User', required: true},
});

const PantryItem = mongoose.model('PantryItem', pantryItemSchema);

module.exports = PantryItem;
