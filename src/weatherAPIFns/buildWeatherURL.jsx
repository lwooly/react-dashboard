export const buildWeatherURL = (keyAPI) => {

    return `https://api.weatherapi.com/v1/current.json?key=${keyAPI}&q=Bristol&aqi=no`
}