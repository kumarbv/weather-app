const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia3VtYXJidiIsImEiOiJjangwY2ttbngxb2s4NGFsZjV0Z2xrZmxjIn0.YDUIJjiznQQAyQugftYtpA&limit=1'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services. Internet may be down. Try again', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another location', undefined)
        } else {
            // response.body.features[0].place_name, response.body.features[0].center[1], response.body.features[0].center[0]
            // console.log('Running geocode...')
            // console.log('URL...'+url)
            callback('undefined', {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode