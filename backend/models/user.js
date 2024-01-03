const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, maxlength: 30},
  firstName: {type: String, required: true, maxLength: 30},
  itemsCreated: {type: Number, default: 0},
  itemsDeleted: {
    total: {type: Number, default: 0},
    byUndo: {type: Number, default: 0},
    byConsume: {type: Number, default: 0},
    byWaste: {type: Number, default: 0},
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
