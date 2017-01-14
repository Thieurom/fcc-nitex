'use strict'

const express = require('express');
const service = require('../service');


const router = express.Router();

router.get('/', (req, res, next) => {
  var location = req.query.location;

  service(location, (err, result) => {
    if (err) {
      return next(err);
    }

    // Set the max-age for resources at 12 hours
    res.set({ 'Cache-Control': 'max-age=' + 12 * 3600 });

    if (req.xhr || req.accepts('html', 'json') === 'json') {
      return res.status(200).json(result);
    } else {
      if (result.length == 0) {
        return res.render('error', { error: 'Sorry! We couldn\'t find any venue near \'' + location + '\'.', location: location });
      }
      return res.render('explore', { location: location, venues: result });
    }
  });
});


module.exports = router;