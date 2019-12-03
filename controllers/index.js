const User = require('../models/user');
const title = 'Welcome to '

module.exports = {
  index,
}

function index(req, res, next) {
  console.log(req.user)
  res.render('index', { 
    title: 'Dashboard',
    user: req.user,
    name: req.query.name,
    req,
   });
}


