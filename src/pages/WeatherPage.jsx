import { useEffect, useState } from "react"
import { buildWeatherURL } from "../weatherAPIFns/buildWeatherURL";
import BasicCard from "../components/WeatherCard";


// const defaultWeather = {
//     location: {
//       name: "",
//       country: ""
//     },
//     current: {
//       condition: {
//         text: "",
//         icon: ""
//       },
//       wind_kph: "",
//       humidity: "",
//       wind_dir: "",
//       temp_c: ""
//     }
//   }

function WeatherPage () {

    //STATE
    const [weatherData, setWeatherData] = useState();
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error , setError] = useState(null);

  
    // call weather API
   const fetchWeatherData = async () => {
        const weatherAPIurl = 'http://api.weatherapi.com/v1/current.json?key=c4682eb9d8b740cdb56170046231209&q=50.4109846,-5.0997977&aqi=no' //buildWeatherURL(keyAPI)
        console.log(`loading;`, loading, `loaded: `, loaded, `error:` , error )
        
        if (loading || loaded || error) {
            return;
        }

        //set loading state
        setLoading(true)
    
        try {
            const response = await fetch(weatherAPIurl)
            if (!response.ok) {
                throw new Error('Invalid weather API response')
            }
            const data = await response.json()
            setWeatherData(data)
            setLoaded(true)

        } catch (error) {
            console.log(error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect( () => {
        fetchWeatherData()
    },[])

    console.log(weatherData)

    return (
    <div>
        {weatherData && <BasicCard weatherData={weatherData}/>}
    </div>
    )
    
}

export default WeatherPage