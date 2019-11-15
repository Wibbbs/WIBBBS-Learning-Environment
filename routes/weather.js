const request = require('request');
const authRoutes = require('./auth-routes');

module.exports = function (app) {

    app.get('/weather', authRoutes.authCheck, function (req, res) {
        var cities = [];
        var city;

        request.get({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            qs: {
                q: 'Markham',
                appId: '1acd1744b5a0e9870d127f2c34ac095e',
                units: 'metric'
            }
        },
            function (err, response, body) {
                if (err) {
                    console.log(err);
                    console.log(response);
                    res.render('error');
                }
                city = JSON.parse(body);
                cities.push(city);
                console.log(city);
                request.get({
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    qs: {
                        q: 'Orlando',
                        appId: '1acd1744b5a0e9870d127f2c34ac095e',
                        units: 'metric'
                    }
                },
                    function (err, response, body) {
                        if (err) {
                            console.log(err);
                            console.log(response);
                            res.render('error');
                        }
                        city = JSON.parse(body);
                        cities.push(city);
                        console.log(city);
                        res.render('weather', { cities:cities, user:req.user });
                    }
                );
            })
    });
};