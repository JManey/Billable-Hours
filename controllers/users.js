const User = require('../models/user');


module.exports = {
  index,
  new: newUser,
  create,
  show,
  isLoggedIn,
  isAdmin,
  edit,
  update,
  delete: deleteUser
}

function index(req, res) {
  User.find({}, function(err, users) {
    if(err) res.send()
    res.render('users/index', {title: 'Billable Hours', req, users,user: req.user})
  })
}

function newUser(req, res) {
  res.render('users/new', {
    title: "Add New User",
    user: req.user,
    name: req.query.name,
    req
  })
}

function create(req, res) {
  // for (let key in req.body) {
  //   if (req.body[key] === '') delete req.body[key];
  // }
  // console.log(req.body)
  let user = new User({
    name: req.body.name,
    isAdmin: req.body.isAdmin,
    phone: req.body.phone,
    email: req.body.email,
    payRate: req.body.payRate,
    title: req.body.title
  });
  // console.log(user)
  user.save(
    err => {
    if(err) return res.redirect('users/new')
    res.redirect('/users');
  })
}

function show(req, res) {
  User.findById(req.params.id).exec((err, user) => {
    // console.log(user)
    res.render('users/show', { title: 'Details', user});
  })
};

function edit(req, res) {
  User.findById(req.params.id).exec((err, user) => {
        // console.log(user)
    res.render('users/edit', { title: 'Details', user});
  })
};

function update(req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true})
    .then(function(err, user) {
    res.redirect('/users')
  })
};

function deleteUser(req, res) {
  User.findByIdAndDelete(
    req.params.id)
    .then(function(err, user) {
    res.redirect('/users')
  })
}

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next()
  // console.log('user logged in')
  //if not logged in redirect to login
  res.redirect('/auth/google')
}

function isAdmin(req, res, next) {
  // console.log('check if admin')
  if(req.isAuthenticated()) {
    User.findOne({googleId: req.user.googleId}, function(err, user) {
      if(user.isAdmin) return next();
        console.log('You are not authorized to view this data.')
      res.redirect('/')
    })
  }
}