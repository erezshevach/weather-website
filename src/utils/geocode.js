const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXJlenNoZXZhY2giLCJhIjoiY2t4NjB0eGdrMTc2MTJ1bng0Zm8wbGk3eiJ9.FJeUhD9MbtBXEmW9Blxi7Q&limit=1'
    request({url, json: true, rejectUnauthorized: false}, (error, {body}) => {
        if (error) {
            callback('unable to connect to geocoding service. error: ' + error)
        }
        else if (!body.features || body.features.length === 0) {
            callback('unable to find location. please try another search.')
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode