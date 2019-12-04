const Client = require('../models/client');
const User = require('../models/user');
const Task = require('../models/task');


module.exports = {
  index,
  update,
  new: newTask,
  create,
  show,
  isLoggedIn,
  isAdmin,
  edit,
  
}

function index(req, res) {
  Task.find({}, function(err, tasks) {
    // res.send(tasks)
    if(err) res.send()
    res.render('tasks/index', {title: 'Billable Hours', req, tasks, task: req.task, user: req.user})
  })
}

function create(req, res) {
  let task = new Task({
    heading: req.body.heading,
    details: req.body.details,
    dateDue: req.body.dateDue,
    assignedTo: req.body.assignedTo,
    matterRef: req.body.matterRef,
    
  });
  console.log(task)
  task.save().then(
    err => {
    if(err) {
      return res.redirect('/tasks/new')
    } else process.exit()
  })
  res.redirect('/tasks');
}


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

// show function
function show(req, res) {
  Task.findById(req.params.id).populate('assignedTo').exec((err, task) => {
    let matterID =task.matterRef[0];
    Client.findOne({"matters._id": matterID}, function(err, client) {
      let matter = client.matters.id(matterID);
console.log(matter.title);
        // return matter;
        res.render('tasks/show', {matter, task,user: req.user, title: "View Task"})
      })
    })
  }

function edit(req, res) {
  console.log('hello', req.params.id)
  console.log(`**************************************
  **************************`)
  Task.findById(req.params.id).populate('assignedTo').exec((err, task) => {
    let matterID =task.matterRef[0];
    Client.findOne({"matters._id": matterID}, function(err, client) {
      let matter = client.matters.id(matterID);
      User.find({}).then(users => {
        console.log(users)
        res.render('tasks/edit', {matter, users, task, user: req.user, title: "Edit Task"})        

      })
      } 
    )
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
         client.save().then(
          res.redirect('/clients')
        )
      }
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
  // console.log('user logged in')
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