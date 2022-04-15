// Imports
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const initRoutes = require('./routes/web');

const app = express();
const PORT = 5000;

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Set Templating Engine
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/login');

// Navigation or routing
initRoutes(app);

// Listen on local host port
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
