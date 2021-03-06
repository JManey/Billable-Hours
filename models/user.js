const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  avatar: String,
  googleId: String,
  title: String,
  payRate: Number,
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})


module.exports = mongoose.model('User', userSchema);