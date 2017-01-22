'use strict'

const db = require('../db');


// Add user to specific venue
exports.addAttendee = (venueId, userId, done) => {
  const collection = db.get().collection('nitex-venues');

  collection.updateOne({ venueId: venueId, attendees: { $nin: [userId] } },
    { $push: { attendees: userId } },
    { upsert: true }, (err, result) => {
      done(err, result);
    });
}


// Remove usr from specific venue
exports.removeAttendee = (venueId, userId, done) => {
  const collection = db.get().collection('nitex-venues');

  collection.updateOne({ venueId: venueId },
    { $pop: { attendees: 1 } }, (err, result) => {
      done(err, result);
    });
}