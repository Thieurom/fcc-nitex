'use strict'

const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    // Load the last visited route of authenticated user
    var redirectTo = req.session.lastQuery;

    if (redirectTo) {
      return res.redirect(redirectTo);
    }
  }

  res.render('index');
});


module.exports = router;