module.exports = function (app) {

    //Get Homepage
    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/error', function (req, res) {
        res.render('error');
    });

};