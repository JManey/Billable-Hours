const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


/* GET users listing. */
router.get('/', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.index);
router.post('/', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.create);
router.get('/new', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.new);
router.get('/:id', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.show);
router.get('/:id/edit', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.edit);
router.put('/:id', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.update);
router.delete('/:id', usersCtrl.isLoggedIn, usersCtrl.isAdmin, usersCtrl.delete);


module.exports = router;
