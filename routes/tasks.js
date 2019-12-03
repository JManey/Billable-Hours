const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks');


/* GET users listing. */
// router.get('/', tasksCtrl.isLoggedIn, tasksCtrl.index);
router.post('/', tasksCtrl.isLoggedIn, tasksCtrl.create);
router.get('/new', tasksCtrl.isLoggedIn, tasksCtrl.new);
// router.get('/tasks/:id', tasksCtrl.isLoggedIn, tasksCtrl.show);
// router.get('/tasks/:id/edit', tasksCtrl.isLoggedIn, tasksCtrl.edit);
// router.put('/tasks/:id', tasksCtrl.isLoggedIn, tasksCtrl.update);
// // router.delete('/:id', tasksCtrl.isLoggedIn, tasksCtrl.delete);


module.exports = router;