const mongoose = require('mongoose');

const consumedItemSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 30},
  user: {type: String, ref: 'User', required: true},
  frequency: {type: Number, default: 1},
});

const ConsumedItem = mongoose.model('ConsumedItem', consumedItemSchema);

module.exports = ConsumedItem;
