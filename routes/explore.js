'use strict'

const express = require('express');
const service = require('../service');


const router = express.Router();

router.get('/', (req, res) => {
  var location = req.query.location;

  service(location, (err, result) => {
    if (err) {
      return next(err);
    }

    if (req.xhr || req.accepts('html', 'json') === 'json') {
      return res.status(200).json(result);
    } else {
      return res.render('explore', { location: location, venues: result });
    }
  });
});


module.exports = router;