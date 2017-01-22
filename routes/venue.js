'use strict'

const express = require('express');
const Venue = require('../model/venue');
const requireLogin = require('../config/requireLogin');


const router = express.Router();

router.put('/:venueId', requireLogin, (req, res, next) => {
  if (req.xhr) {
    const venueId = req.params.venueId;
    const userId = req.user._id.toString();

    if (req.body.attend) {
      Venue.addAttendee(venueId, userId, (err, result) => {
        if (err) {
          return next(err);
        }

        res.status(204).end();
      });

    } else {
      Venue.removeAttendee(venueId, userId, (err, result) => {
        if (err) {
          return next(err);
        }

        res.status(204).end();
      });
    }

  } else {
    res.end();
  }
});


module.exports = router;