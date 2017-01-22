'use strict'

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;


const User = require('../model/user');

// Config Strategy
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/login/twitter/return'
},
  (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
      User.getByTwitter(profile, (err, result) => {
        done(err, result);
      });
    });
  }));


// Serialize user
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});


// Deserialize user
passport.deserializeUser((id, done) => {
  User.getById(id, (err, user) => {
    done(err, user);
  });
});


module.exports = passport;