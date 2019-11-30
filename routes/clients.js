const express = require('express');
const router = express.Router();
const clientsCtrl = require('../controllers/clients');


/* GET users listing. */
router.get('/', clientsCtrl.isLoggedIn, clientsCtrl.index);
router.post('/', clientsCtrl.isLoggedIn, clientsCtrl.create);
router.get('/new', clientsCtrl.isLoggedIn, clientsCtrl.new);
router.get('/:id', clientsCtrl.isLoggedIn, clientsCtrl.show);
router.get('/:id/edit', clientsCtrl.isLoggedIn, clientsCtrl.edit);
router.put('/:id', clientsCtrl.isLoggedIn, clientsCtrl.update);
router.delete('/:id', clientsCtrl.isLoggedIn, clientsCtrl.delete);


module.exports = router;
