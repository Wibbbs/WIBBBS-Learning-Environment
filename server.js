var express = require('express');
var home = require('./routes/home');
var weather = require('./routes/weather');
const request = require('request');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose');
const keys = require('./config/keys')

app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use('/auth', authRoutes);

//connect to mongo database
mongoose.connect(keys.mongoDB.URI, () =>{
    console.log('connected to monogdb');
});

app.listen('3000');
console.log('listening on 3000')

home(app);
weather(app);