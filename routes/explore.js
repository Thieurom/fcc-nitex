'use strict'

const express = require('express');
const service = require('../service');


const router = express.Router();

router.get('/', (req, res, next) => {
  const location = req.query.location;
  const userId = 'abc123456789';

  if (typeof location !== 'undefined') {
    service(userId, location, (err, result) => {
      if (err) {
        return next(err);
      }

      // Set the max-age for resources at 12 hours
      res.set({ 'Cache-Control': 'no-cache' });

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