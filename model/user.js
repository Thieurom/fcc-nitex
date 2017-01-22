'use strict'

const db = require('../db');
const ObjectID = require('mongodb').ObjectID;


// Get user by userid
exports.getById = (id, done) => {
  const collection = db.get().collection('nitex-users');

  collection.findOne({ _id: new ObjectID(id) }, (err, user) => {
    done(err, user);
  });
}


// Get user by twitterId, create new one if not exists
exports.getByTwitter = (profile, done) => {
  const collection = db.get().collection('nitex-users');

  collection.findOneAndUpdate({ twitterId: profile.id },
    { $setOnInsert: { twitterId: profile.id, twitterAvatar: profile.photos[0].value } },
    { upsert: true, returnOriginal: false }, (err, result) => {
      done(err, result.value);
    });
}