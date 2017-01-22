'use strict'

const express = require('express');
const passport = require('../config/passport');
const requireLogin = require('../config/requireLogin');


const router = express.Router();

router.get('/login/twitter', passport.authenticate('twitter'));


router.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);


router.get('/logout', requireLogin, (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;