var express = require('express');
var home = require('./routes/home');
var weather = require('./routes/weather');
const request = require('request');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile');
const lotteryRoutes = require('./routes/lottery');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(cookieSession({
    maxAge: 60*1000,
    keys: [keys.session.cookiekey]
}));

app.use(passport.initialize());
app.use(passport.session());




//connect to mongo database
mongoose.connect(keys.mongoDB.URI, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err  + '\n');
    }
    else{
        console.log('success connect to mongoDB @ '+ keys.mongoDB.URI  + '\n');
    }
});

app.use('/auth', authRoutes.router);
app.use('/profile', profileRoutes);
app.use('/lottery', lotteryRoutes);

app.listen('3000');
console.log('listening on 3000'  + '\n')

home(app);
weather(app);