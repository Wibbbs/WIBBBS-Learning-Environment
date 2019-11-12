const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const UserModel = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
        done(null,user);
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
            //console.log(profile);
            //console.log(profile.id + ' ' + profile.displayName + ' ' + profile.emails[0].value + '\n');
            UserModel.findOne({ googleid: profile.id }).then((currentUser) => {
                
                if (currentUser) {
                    if (!currentUser.photo){
                        console.log('Photo Not Found')
                        UserModel.findOneAndUpdate({ googleid: profile.id }, {photo: profile.photos[0].value}, {new: true}).then(currentUser);
                        console.log('Found User and added photo' + currentUser + '\n');
                        done(null, currentUser);
                    } else{
                        console.log('Found User already containg Photo' + currentUser + '\n');
                        done(null, currentUser);
                    }     
                } else {
                    new UserModel({
                        username: profile.displayName,
                        googleid: profile.id,
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value
                    }).save().then((newUser) => {
                        console.log('New User Created: ' + newUser + '\n');
                        done(null, newUser);
                    });
                }
            });
        }
    )
)
