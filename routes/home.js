module.exports = function (app) {

    //Get Homepage
    app.get('/', function (req, res) {
        res.render('login', {user: req.user});
    });

    app.get('/error', function (req, res) {
        res.render('error', {user: req.user});
    });

};