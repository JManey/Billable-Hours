const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new mongoose.Schema({
  title: String,
  details: String,
  dateDue: Date,
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'  
  }],
  matterRef: [{
    type: Schema.Types.ObjectId,
    ref: 'Client'  
  }],
}, {
  timestamps: true
})


module.exports = mongoose.model('Task', taskSchema);