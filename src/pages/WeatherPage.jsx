import { useEffect, useState, useContext } from "react"
import { buildWeatherURL } from "../utilityFns/buildWeatherURL";
import BasicCard from "../components/WeatherCard";
import { LocationContext } from "../contexts/Location.context";
import InputWithIcon from "../components/InputWithIcon";


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
    const [input, setInput] = useState("London")

    //context
    const {fetchLocation, location} = useContext(LocationContext)
    console.log(`Location:`, location)

    
    // call weather API
   const fetchWeatherData = async () => {
        const weatherAPIurl = buildWeatherURL(location)
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
        fetchLocation()
    },[])

    useEffect( () => {
        if (location) {
            fetchWeatherData(location)
        }
    },[location])

    console.log(weatherData)

    return (
    <div>
        {weatherData && <BasicCard weatherData={weatherData}/>}
        <InputWithIcon setInput={setInput} />

    </div>
    )
    
}

export default WeatherPage