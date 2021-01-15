const request = require('request')

const forecast = ({latitude, longitude, location},callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=c60f0228d33c3e4fbda99b7e7ac251a9&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('No internet')
        } else if (body.error) {
            callback('Please enter correct location')
        } else {
        const {temperature, feelslike, humidity} = body.current
        callback(undefined, `Currently the temprature in ${location} is ${temperature} degrees but it feels like ${feelslike} degrees. The humidity is ${humidity}`)
        }
    })

}

module.exports = forecast