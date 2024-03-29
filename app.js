// Use Environment variables
require('dotenv').config();

// Imports
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionStore = require('./configs/session-config.js');
const connectDB = require('./models/connectDB.js');
const initRoutes = require('./routes/main-router.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Configure body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Configure Templating Engine
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/login-page');

// Session middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000*60*60*24
  },
  resave: false, // to avoid saving same session
  saveUninitialized: false, // don't save empty input to sessions
  store: sessionStore // Where to store sessions
}));

// Navigation or routing
initRoutes(app);

// Listen on local host port
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
  console.log(`Open keepr app locally: http://localhost:${PORT}/`);
});
