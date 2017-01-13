'use strict'

// Depedencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// App instance
const app = express();
const PORT = process.env.PORT || 3000;

// Setup middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/home'));
app.use('/explore', require('./routes/explore'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});