// models/signUp.js
const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
  email: {type: String, required: true},
  dateCreated: {type: Date, default: Date.now},
});

const SignUp = mongoose.model('SignUp', signUpSchema);

module.exports = SignUp;
