const mongoose = require('mongoose');

const consumedItemSchema = new mongoose.Schema({
  dateCreated: {type: Date, default: Date.now},
  name: {type: String, required: true, maxlength: 30},
  user: {type: String, ref: 'User', required: true},
  foodBoxId: {type: String, default: null}, // Add foodBoxId field
  reason: {type: String, default: null},
});

const ConsumedItem = mongoose.model('ConsumedItem', consumedItemSchema);

module.exports = ConsumedItem;
