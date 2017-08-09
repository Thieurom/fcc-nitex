'use strict'


module.exports = (app) => {
  // Expose authenticated user to every routes if exists
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });


// Register routes
  app.use('/', require('./home'));
  app.use('/explore', require('./explore'));
  app.use('/venue', require('./venue'));
  app.use('/auth', require('./auth'));

    // this route is temporarily used for client-side rendering by React
    app.use('/development', require('./development'));



  // Catch 404 error
  app.use((req, res, next) => {
    let err = new Error();
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
      res.render('error', { error: 'Not Found' });
    } else {
      res.render('error', { error: 'Internal Server Error' });
    }
  });
}
