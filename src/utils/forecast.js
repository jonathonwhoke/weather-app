const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a02b671ea79d4d86c221738b985f0757/' + lat +',' + long

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const temp = body.currently.temperature
            const windSpeed = body.currently.windSpeed
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees outside. With winds speeds of ' + windSpeed + 'mph.')
        }
    })
}

module.exports = forecast