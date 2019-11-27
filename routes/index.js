const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexCtrl = require('../controllers/index')

/* GET home page. */
router.get('/', indexCtrl.index);
// Google OAuth login route
router.get('/auth/google', indexCtrl.auth);
// Google OAuth callback route
router.get('/oauth2callback', indexCtrl.authCB);
// Google OAuth logout route
router.get('/logout', indexCtrl.logOut); 

module.exports = router;
