const express = require('express');
const router = express.Router();
const mattersCtrl = require('../controllers/matters');


/* GET users listing. */
// router.get('/', mattersCtrl.isLoggedIn, mattersCtrl.index);
router.post('/:id/matters', mattersCtrl.isLoggedIn, mattersCtrl.create);
router.get('/:id/matters/new', mattersCtrl.isLoggedIn, mattersCtrl.new);
router.get('/matters/:id', mattersCtrl.isLoggedIn, mattersCtrl.show);
// router.get('/:id/edit', mattersCtrl.isLoggedIn, mattersCtrl.edit);
// router.put('/:id', mattersCtrl.isLoggedIn, mattersCtrl.update);
// router.delete('/:id', mattersCtrl.isLoggedIn, mattersCtrl.delete);


module.exports = router;
