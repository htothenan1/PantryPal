const mongoose = require('mongoose');

const wastedItemSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 30},
  user: {type: String, ref: 'User', required: true},
  frequency: {type: Number, default: 1},
});

const WastedItem = mongoose.model('WastedItem', wastedItemSchema);

module.exports = WastedItem;
