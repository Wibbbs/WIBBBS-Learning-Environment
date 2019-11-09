const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.send('logout here');
});

router.get('/google', passport.authenticate('google', {
    scope: ['email','profile']
}
));

router.get('/google/callback', (req,res) =>{
    res.send('You are authed');
})

module.exports = router;

