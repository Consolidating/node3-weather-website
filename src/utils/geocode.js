const request = require('request')

const geocode = (address, callback)=>{
    const geoCodeToken = "access_token=pk.eyJ1Ijoicm9iZXJ0eGlhbndhbmciLCJhIjoiY2tleGlwanQyMDVxdjJyczJ0eW41cmw0ZyJ9.-ynTjglkiG2MUXQNqEp2Xw"
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?`

    request({url:geocodeURL + geoCodeToken, json: true}, (error,{body})=>{
        if (error){
            callback('Unable to connect to location services!', undefined)

        } else if (body.features.length === 0){
            callback("Unable to find location. Try another search", undefined)

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