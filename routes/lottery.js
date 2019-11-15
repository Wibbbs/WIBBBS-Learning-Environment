const lotteryModel = require('../models/lottery-entry-model')
const router = require('express').Router();
const authRoutes = require('./auth-routes');

router.get('/', authRoutes.authCheck, (req, res) => {
    lotteryModel.findOne({ email: req.user.email }).then((currententry) => {
        if (currententry) {
            console.log(currententry);
            res.render('lottery', {entry: currententry, user: req.user});
        } else {
            res.render('lottery', {user: req.user});
        }
    })
});

router.get('/enter', authRoutes.authCheck, (req, res) => {
    lotteryModel.findOne({ email: req.user.email }).then((currententry) => {
        if (currententry) {
            console.log('you are already entered');
            res.redirect('/lottery', {user: req.user});
        } else {
            new lotteryModel({
                email: req.user.email
            }).save().then((lotteryEntry) => {
                console.log(lotteryEntry);
            });
            res.redirect('/lottery');
        }
    });
});

router.get('/withdraw', authRoutes.authCheck, (req, res) => {
    lotteryModel.findOneAndDelete({ email: req.user.email }).then((currententry) => {
        if(currententry){
            console.log ('entry removed');
            res.redirect('/lottery');
        }else{
            console.log('Entry Not Found');
            res.redirect('/lottery');
        }
    });
});

module.exports = router;