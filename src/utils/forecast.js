const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2f1f373d7ef031fb77fecca67c514206/'+latitude+','+longitude
    console.log(url)
    request({url: url, json: true}, (error, response) => {
        if (error) {
            // console.log(error)
            callback('Unable to connect to location services. Internet may be down. Try again', undefined)
        } else if (response.body.error) {
            callback('Unable to find the location. Try another location', undefined)
            // console.log('Please provide correct coordinates.')
        } else {
            // console.log(response.body.currently.summary)
            const summary = response.body.currently.summary
            const temperature = response.body.currently.temperature
            const rain = response.body.currently.precipProbability
            callback(undefined, 'The weather summary is '+summary+'. The temperature is '+temperature+'F ,and there is a '+rain+'% probability of rain.')
        }
    })
}

module.exports = forecast
// const url = 'https://api.darksky.net/forecast/2f1f373d7ef031fb77fecca67c514206/37.8267,-112'
// request({url: url, json:true}, (error, response) => {
//     if (error) {
//         console.log(error)
//     } else if (response.body.error) {
//         console.log('Error code: '+response.body.code)
//         console.log('Please provide correct coordinates.')
//     } else {
//         console.log(response.body.currently.summary)
//     }
// })
