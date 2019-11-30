const mongoose = require('mongoose');

const matterSchema = new mongoose.Schema({
  title: String,
  caseNo: String,
  dateInit: Date,
  dateClosed: Date,
  details: String,
  // documents: ?,
  // meeting: ?,
});

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  dob: Date,
  matters: [matterSchema],
}, {
  timestamps: true
})


module.exports = mongoose.model('Client', clientSchema);