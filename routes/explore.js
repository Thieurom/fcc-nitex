'use strict'

const express = require('express');
const service = require('../service');


const router = express.Router();

router.get('/', (req, res, next) => {
  const location = req.query.location;
  let userId;

  if (typeof location !== 'undefined') {
    if (req.isAuthenticated()) {
      userId = req.user._id.toString();
    }

    service(userId, location, (err, result) => {
      if (err) {
        return next(err);
      }

      res.set({ 'Cache-Control': 'no-cache' });

      // Save the current url to session
      req.session.lastQuery = '/explore?location=' + location.replace(/\s+/g, '+');

      if (req.xhr) {
        return res.status(200).json(result);
      } else {
        if (result.length == 0) {
          return res.render('error', { error: 'Sorry! We couldn\'t find any venue near \'' + location + '\'.', location: location });
        }
        return res.render('explore', { location: location, venues: result });
      }
    });
  } else {
    res.redirect('/');
  }

});


module.exports = router;