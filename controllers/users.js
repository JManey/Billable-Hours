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
  res.render('users/new', {
    title: "Add New User",
    user: req.user,
    name: req.query.name,
  })
}

function create(req, res) {
  User.create(req.body, function(err, user) {
    res.redirect('/users/new');
  })
}