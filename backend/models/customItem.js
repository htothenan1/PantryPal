aconst mongoose = require('mongoose');

const customItemSchema = new mongoose.Schema({
  itemName: {type: String, required: true},
  storageTip: {type: String, required: true, maxlength: 400},
  dateTime: {type: Date, default: Date.now},
  userEmail: {type: String, required: true},
});

const CustomItem = mongoose.model('CustomItem', customItemSchema);

module.exports = CustomItem;
