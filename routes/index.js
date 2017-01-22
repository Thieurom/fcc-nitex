'use strict'


module.exports = (app) => {
  // Expose authenticated user to every routes if exists
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });


  // Register routes to app
  app.use('/', require('./home'));
  app.use('/explore', require('./explore'));
  app.use('/venue', require('./venue'));
  app.use('/auth', require('./auth'));


  // Catch 404 error
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  // Error handlers
  app.use((err, req, res, next) => {
    console.log(err);
    next(err);
  });

  app.use((err, req, res, next) => {
    if (req.xhr) {
      res.status(500).end();
    } else {
      next(err);
    }
  });

  app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.render('error', { error: err.message });
    } else {
      res.render('error', { error: 'Internal Server Error' });
    }
  });
}