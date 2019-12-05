const Client = require('../models/client');


module.exports = {
  index,
  new: newClient,
  create,
  show,
  edit,
  update,
  delete: deleteClient,
  isAdmin,
  isLoggedIn,
  // viewMatters,
}

function index(req, res) {
  Client.find({}, function(err, clients) {
    if(err) res.send()
    res.render('clients/index', {title: 'Billable Hours', req, clients, user: req.user})
  })
}

function newClient(req, res) {
  res.render('clients/new', {
    title: "Add New Client",
    user: req.user,
    name: req.query.name,
    req
  })
}

function create(req, res) {
  let client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  client.save(
    err => {
    if(err) return res.redirect('clients/new')
    res.redirect('/clients');
  })
}

function show(req, res) {
  Client.findById(req.params.id).exec((err, client) => {
    res.render('clients/show', { title: 'Details', client, user: req.user});
  })
};

function edit(req, res) {
  Client.findById(req.params.id).exec((err, client) => {
    res.render('clients/edit', { title: 'Details', client, user: req.user});
  })
};

function update(req, res) {
  Client.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true})
    .then(function(err, client) {
    res.redirect('/clients')
  })
};

function deleteClient(req, res) {
  console.log(req.params.id)
  Client.findByIdAndDelete(
    req.params.id, function(err, client) {
      console.log(client)
    res.redirect('/clients')
  })
}

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next()
  //if not logged in redirect to login
  res.redirect('/auth/google')
}

function isAdmin(req, res, next) {
  if(req.isAuthenticated()) {
    User.findOne({googleId: req.user.googleId}, function(err, user) {
      if(user.isAdmin) return next();
        console.log('You are not authorized to view this data.')
      res.redirect('/')
    })
  }
}

