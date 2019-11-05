const request = require('request');

module.exports = function (app) {

    app.get('/weather', function (req, res) {
        var json;

        request.get({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            qs: {
                q: 'Markham',
                appId: '1acd1744b5a0e9870d127f2c34ac095e',
                units: 'metric'
            }
        },
            function (err, response, body) {
                if(err){
                    console.log(err);
                    console.log(response);
                    res.render('error');
                }
                json = JSON.parse(body); 
                console.log(json)
                res.render('weather', {weather: json});
            }
        );
    })
};