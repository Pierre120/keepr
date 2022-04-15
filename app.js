// Imports
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
