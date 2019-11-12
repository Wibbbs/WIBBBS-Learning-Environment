const router = require('express').Router();
const passport = require('passport');

const authCheck = (req,res,next) => {
    if (req.user){
        next()
    } else {
        res.redirect('/auth/login');
    }
}

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    //res.send('logout here');
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['email','profile']
}
));

router.get('/google/callback', passport.authenticate('google'), (req,res) =>{
    //res.send(req.user.username);
    res.redirect('/profile');
});


module.exports = router;

