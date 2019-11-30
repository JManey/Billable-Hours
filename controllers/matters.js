const Client = require('../models/client');


module.exports = {
  
  new: newMatter,
  create,
  show,
  isLoggedIn,
  isAdmin,
  
}

function create(req, res) {
  Client.findById(req.params.id, function(err, client) {
    client.matters.push(req.body);
    client.save(function(err) {
      res.redirect(`/clients/${client._id}`)
    })
  })
}

function newMatter(req, res) {
  Client.findById(req.params.id, function(err, client) {
    res.render('matters/new', {
      title: "Add New Client",
      user: req.user,
      client,
      name: req.query.name,
      req
    })
  })
}

function show(req, res) {
  let id = req.params.id;
  Client.findOne({"matters._id": id}, function(err, client) {
    // console.log(client.matters)
    let mattersArr = client.matters;
    mattersArr.forEach(matter => {
      console.log(matter._id);
      console.log(id);


      if(matter._id == id) {
        res.render('matters/show', { title: 'Details', matter, user: req.user});
        
      } else return;
    })
  })
};

// function edit(req, res) {
//   Client.findById(req.params.id).exec((err, client) => {
//         console.log(client)
//     res.render('clients/edit', { title: 'Details', client, user: req.user});
//   })
// };

// function update(req, res) {
//   Client.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {new: true})
//     .then(function(err, client) {
//     res.redirect('/clients')
//   })
// };

// function deleteClient(req, res) {
//   Client.findByIdAndDelete(
//     req.params.id)
//     .then(function(err, client) {
//     res.redirect('/clients')
//   })
// }

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next()
  console.log('user logged in')
  //if not logged in redirect to login
  res.redirect('/auth/google')
}

function isAdmin(req, res, next) {
  console.log('check if admin')
  if(req.isAuthenticated()) {
    User.findOne({googleId: req.user.googleId}, function(err, user) {
      if(user.isAdmin) return next();
        console.log('You are not authorized to view this data.')
      res.redirect('/')
    })
  }
}