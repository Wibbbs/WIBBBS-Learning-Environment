var express = require('express');
var home = require('./routes/home');
var weather = require('./routes/weather');
const request = require('request');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(cookieSession({
    maxAge: 60*1000,
    keys: [keys.session.cookiekey]
}));

app.use(passport.initialize());
app.use(passport.session());




app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);



//connect to mongo database
mongoose.connect(keys.mongoDB.URI, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err  + '\n');
    }
    else{
        console.log('success connect to mongoDB @ '+ keys.mongoDB.URI  + '\n');
    }
});


app.listen('3000');
console.log('listening on 3000'  + '\n')

home(app);
weather(app);