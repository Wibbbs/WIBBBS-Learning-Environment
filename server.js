var express = require('express');
var home = require('./routes/home');
var weather = require('./routes/weather');
const request = require('request');

app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.listen('3000');
console.log('listening on 3000')

home(app);
weather(app);