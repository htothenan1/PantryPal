const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {type: String, required: true},
  level: {type: Number, required: true},
  criteria: {
    itemName: {type: String, required: true},
    consumeCount: {type: Number, required: true},
  },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
