'use strict'

// Depedencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const db = require('./db');

const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

// App instance
const app = express();

// Setup middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/home'));
app.use('/explore', require('./routes/explore'));
app.use('/venue', require('./routes/venue'));

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


// Connect to database
db.connect(DATABASE, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})