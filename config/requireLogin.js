'use strict'

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  if (req.xhr) {
    return res.end();
  }
  
  res.redirect('/');
}