'use strict'

// Depedencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');

const passport = require('./config/passport');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;
const COOKIE_SECRET = process.env.COOKIE_SECRET;


// App instance
const app = express();

// Setup middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(session({
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 4 * 7 * 24 * 60 * 60 * 1000,  // 4 weeks
    store: new MongoStore({ url: DATABASE })
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Routes
// require('./routes')(app);
app.use('/search', require('./routes/search'));
app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, './src/index.html'));
});

// Log errors and forward to error handler
app.use((req, res, next) => {
    console.log(err.stack);
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: 'ERROR',
        message: err.message
    });
});


// Connect to database, establish server
db.connect(DATABASE, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})
