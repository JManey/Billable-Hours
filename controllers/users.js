const User = require('../models/user');


module.exports = {
//   index,
  new: newUser,
  create,
//   show,
//   edit,
//   update,
//   delete: deleteUser
}

// function index(req, res) {
//   User.find({}, function(err, users) {
//     if(err) res.send()
//   })
// }

function newUser(req, res) {
  res.render('users/new', {title: "Add New User"})
}

function create(req, res) {
  User.create(req.body, function(err, user) {
    res.redirect('/users/new');
  })
}