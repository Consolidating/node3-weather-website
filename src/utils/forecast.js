const request = require('request')


const forecast = (latitude, longitude, callback)=>{
    const weatherStackUrl = 'http://api.weatherstack.com/current'
    const weatherStackApiKey = "304f0ce68269cccbdca0a0be5ebe6e6d"

    
    request( {url:weatherStackUrl, qs:{access_key:weatherStackApiKey, query: `${latitude}, ${longitude}`, units: 'm'}, json:true}, (error, {body})=>{
             if (error){
                 callback("Unable to connect to weather service!", undefined)
             } else if(body.error){
                 callback("Unable to find location", undefined)
             }else {
                 
                 callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. There is ${body.current.precip}% chance of rain.`)
            
             }
         })
}

module.exports = forecast