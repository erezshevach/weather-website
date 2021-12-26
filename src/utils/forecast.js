const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5cc133494be5bbbb016f0333fb8b84e&query=' + lat + ',' + lng
    request({url, json: true, rejectUnauthorized: false}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service. error: ' + error)
        }
        else if (body.error) {
            callback('error: ' + body.error.info)
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                forecast: body.current.weather_descriptions + ". it is currently " + body.current.temperature + " degrees out, feels like " + body.current.feelslike + ". the humidity is " + body.current.humidity + "%"
            })
        }
    })
}

module.exports = forecast