import { WEATHERAPIKEY } from "../settings"

export const buildWeatherURL = ( location, APIkey = WEATHERAPIKEY,) => {

    // console.log(location)
    if (location.latitude && location.longitude) {
        return `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${location.latitude},${location.longitude}&aqi=no`
    } else {
        return `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${location}&aqi=no`
    }
    
    
}