const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {type: String, required: true, unique: true}, // Firebase UID
  email: {type: String, required: true, maxlength: 30},
  firstName: {type: String, required: true, maxLength: 30},
  itemsCreated: {type: Number, default: 0},
  iconName: {type: String, default: ''},
  itemsDeleted: {
    total: {type: Number, default: 0},
    byUndo: {type: Number, default: 0},
    byConsume: {type: Number, default: 0},
    byWaste: {type: Number, default: 0},
  },
  xp: {type: Number, default: 0},
  level: {type: Number, default: 1},
  maxScore: {type: Number, default: 0}, // New field for max score
  achievements: [
    {
      achievementId: {type: mongoose.Schema.Types.ObjectId, ref: 'Achievement'},
      dateEarned: {type: Date, default: Date.now},
    },
  ],
  omitMeats: {type: Boolean, default: false},
  omitSeafoods: {type: Boolean, default: false},
  omitDairy: {type: Boolean, default: false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
