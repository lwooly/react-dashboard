import { WEATHERAPIKEY } from "../settings"

export const buildWeatherURL = ( {latitude, longitude}, APIkey = WEATHERAPIKEY,) => {
    return `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${latitude},${longitude}&aqi=no`
    
}