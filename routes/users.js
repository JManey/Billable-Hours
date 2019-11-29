const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


/* GET users listing. */
// router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create);
router.get('/new', usersCtrl.new);
// router.get('/:id', usersCtrl.show);
// router.get('/:id/edit', usersCtrl.edit);
// router.put('/:id', usersCtrl.update);
// router.put('/:id', usersCtrl.delete);


module.exports = router;
