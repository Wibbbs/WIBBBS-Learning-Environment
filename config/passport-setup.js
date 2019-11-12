const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const UserModel = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById().then((document) => {
        done(null,document);
    });
});

passport.use(
    new googleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
        (accessToken, refreshToken, profile, done) => {
            //passport callback function
            console.log(profile.id + ' ' + profile.displayName + ' ' + profile.emails[0].value + '\n');
            UserModel.findOne({ googleid: profile.id }).then((currentUser) => {
                if (currentUser) {
                    console.log('Found User' + currentUser + '\n');
                    done(null, currentUser);
                } else {
                    new UserModel({
                        username: profile.displayName,
                        googleid: profile.id,
                        email: profile.emails[0].value
                    }).save().then((newUser) => {
                        console.log('New User Created: ' + newUser + '\n');
                        done(null, newUser);
                    });
                }
            });
        }
    )
)
