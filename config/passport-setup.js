const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

passport.use(
    new googleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log(profile);

    }

    )
)