'use strict'

const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  var location = req.query.location;

  res.render('explore', { location: location });
});


module.exports = router;