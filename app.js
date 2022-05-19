// Imports
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const initRoutes = require('./routes/web');

const app = express();
const PORT = 5000;

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
app.set('layout', './layouts/login');

// Navigation or routing
initRoutes(app);

// Listen on local host port
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
  console.log(`Open keepr app locally: http://localhost:${PORT}/`);
});
