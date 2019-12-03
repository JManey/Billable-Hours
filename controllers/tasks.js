const Client = require('../models/client');
const User = require('../models/user');
const Task = require('../models/task');


module.exports = {
  // subdocs,
  // index,
  // update,
  new: newTask,
  create,
  // show,
  isLoggedIn,
  isAdmin,
  // edit,
  
}

function index(req, res) {
  Task.find({}, function(err, tasks) {
    if(err) res.send()
    res.render('tasks/index', {title: 'Billable Hours', req, tasks,task: req.task})
  })
}

function create(req, res) {
  let task = new Task({
    Title: req.body.name,
    details: req.body.details,
    dateDue: req.body.dateDue,
    assignedTo: req.body.assignedTo,
    matterRef: req.body.matterRef,
    
  });
  // console.log(user)
  task.save().then(
    err => {
    if(err) return res.redirect('tasks/new')
    res.redirect('/tasks');
  })
}

// function newTask(req, res) {}
//   let matters = [];
//   // Client.find({}, ((err, client) => console.log(client.matters))) //returns clients with objects for matters
//   User.find({}, ((err, users) => {
//     // console.log(`users from query`, users);
//   Client.find({}).populate('matters')
//   .exec(function(err, clients) {
//     clients.forEach(client => {
//       console.log('client:******', client)
//       console.log('*****client:', client.phone)
//       let mArr = client.matters;
//       console.log(`mArr`,mArr)
//       mArr.forEach(matter => {
//         console.log('one matter:', matter)
//         matters.push(matter);
//       })
//     })
//     console.log(`matters from query`, clients);
//     res.render('tasks/new', {
//       title: "Create Task",
//       user: req.user,
//       name: req.query.name,
//       req,
//       matters,
//       users
//     })
//   })
// }
// ))};

function newTask (req, res) {
  let matters = [];
      return Client.find({}).then(clients => {
        clients.forEach(client => {
          let cM = client.matters;
          cM.forEach(matter => {
            matters.push(matter)
          })
          return User.find({})
          .then(users => {
            res.render('tasks/new', {
                    title: "Create Task",
                    user: req.user,
                    name: req.query.name,
                    req,
                    matters,
                    users,
            })
          })
        })
      }
      )}







// function show(req, res) {
//   let id = req.params.id;
//   Client.findOne({"matters._id": id}, function(err, client) {
//     let mattersArr = client.matters;
//     mattersArr.forEach(matter => {
//       if(matter._id == id) {
//         res.render('matters/show', { title: 'Details', matter, user: req.user});
        
//       } else return;
//     })
//   })
// };

// function edit(req, res) {
//   let id = req.params.id;
//   console.log(req.params.id)
//   Client.findOne({"matters._id": id}, function(err, client) {
//     let mattersArr = client.matters;
//     mattersArr.forEach(matter => {
//       if(matter._id == id) {
//         console.log(matter)
//         res.render('matters/edit', { title: 'Edit', matter, user: req.user});
        
//       } else return;
//     })
//   })
// };

// function update(req, res) {
//   let id = req.params.id;
//   Client.findOne({"matters._id": id}, function(err, client) {
//     let mattersArr = client.matters;
//     mattersArr.forEach((matter, idx) => {
//       if(matter._id == id) {
//         req.body._id = id;
      
//         client.matters[idx]._id = id,
//         client.matters[idx].title = req.body.title,
//         client.matters[idx].dateInit = req.body.dateInit,
//         client.matters[idx].caseNo = req.body.caseNo,
//         client.matters[idx].details = req.body.details,
//         client.matters[idx].dateClosed = req.body.dateClosed,
//          client.save().then(
//           res.redirect('/clients')
//         )
//       }
//     })
//   })
// }



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