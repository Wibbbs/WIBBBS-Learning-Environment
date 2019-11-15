const router = require('express').Router();
const authRoutes = require('./auth-routes');

router.get('/', authRoutes.authCheck, (req, res) => {
    res.render('profile', { user : req.user });
});

module.exports = router;
