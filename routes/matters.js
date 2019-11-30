const express = require('express');
const router = express.Router();
const mattersCtrl = require('../controllers/matters');


/* GET users listing. */
// router.get('/', mattersCtrl.isLoggedIn, mattersCtrl.index);
router.post('/:id/matters', mattersCtrl.isLoggedIn, mattersCtrl.create);
router.get('/:id/matters/new', mattersCtrl.isLoggedIn, mattersCtrl.new);
// router.get('/:id', clientsCtrl.isLoggedIn, clientsCtrl.show);
// router.get('/:id/edit', clientsCtrl.isLoggedIn, clientsCtrl.edit);
// router.put('/:id', clientsCtrl.isLoggedIn, clientsCtrl.update);
// router.delete('/:id', clientsCtrl.isLoggedIn, clientsCtrl.delete);


module.exports = router;
