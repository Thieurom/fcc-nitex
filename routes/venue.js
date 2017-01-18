'use strict'

const express = require('express');
const db = require('../db');


const router = express.Router();

router.put('/:venueId', (req, res, next) => {
  if (req.xhr) {
    const venueId = req.params.venueId;
    const collection = db.get().collection('nitex-venues');
    const userId = 'abc123456789';

    if (req.body.attend) {
      collection.updateOne({ venueId: venueId },
        { $push: { attendees: userId } },
        { upsert: true }, (err, result) => {
          if (err) {
            return next(err);
          }

          res.status(204).end();
        });

    } else {
      collection.updateOne({ venueId: venueId },
        { $pop: { attendees: 1 } }, (err, result) => {
          if (err) {
            return next(err);
          }

          res.status(204).end();
        })
    }

  } else {
    res.end();
  }
});


module.exports = router;