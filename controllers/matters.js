const Client = require('../models/client');


module.exports = {
  update,
  new: newMatter,
  create,
  show,
  isLoggedIn,
  isAdmin,
  edit,
  
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
    let mattersArr = client.matters;
    mattersArr.forEach(matter => {
      if(matter._id == id) {
        res.render('matters/show', { title: 'Details', matter, user: req.user});
        
      } else return;
    })
  })
};

function edit(req, res) {
  let id = req.params.id;
  console.log(req.params.id)
  Client.findOne({"matters._id": id}, function(err, client) {
    let mattersArr = client.matters;
    mattersArr.forEach(matter => {
      if(matter._id == id) {
        console.log(matter)
        res.render('matters/edit', { title: 'Edit', matter, user: req.user});
        
      } else return;
    })
  })
};

function update(req, res) {
  let id = req.params.id;
  Client.findOne({"matters._id": id}, function(err, client) {
    let mattersArr = client.matters;
    mattersArr.forEach((matter, idx) => {
      if(matter._id == id) {
        req.body._id = id;
      
        client.matters[idx]._id = id,
        client.matters[idx].title = req.body.title,
        client.matters[idx].dateInit = req.body.dateInit,
        client.matters[idx].caseNo = req.body.caseNo,
        client.matters[idx].details = req.body.details,
        client.matters[idx].dateClosed = req.body.dateClosed,
        
        console.log(client);
         client.save(err => {
          if(err) {console.log(err);}
          else res.redirect('/clients')
        })
      } else res.send("error");
    })
  })
}



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