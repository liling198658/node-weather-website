const request = require('request')

const geocode = (address, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGl6YmFsbCIsImEiOiJja2pwZ24wYzYxOHlnMzBseXBqYzAzemtqIn0.hhn539rc849nrTRnBiut2Q&limit=1'
    request({url: mapUrl, json: true}, (error, {body}) => {
        if (error) {
            callback('No internet')
        } else if (body.features.length === 0) {
            callback('Please enter correct location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
