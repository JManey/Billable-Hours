const mongoose = require('mongoose');


const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
}, {
  timestamps: true
})


module.exports = mongoose.model('Client', clientSchema);