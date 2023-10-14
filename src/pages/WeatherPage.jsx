import { useEffect, useState, useContext } from "react"
import { buildWeatherURL } from "../utilityFns/buildWeatherURL";
import WeatherCard from "../components/WeatherCard";
import { LocationContext } from "../contexts/Location.context";
import InputWithIcon from "../components/InputWithIcon";
import LocationForm from "../components/Form/LocationForm";


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

function WeatherPage() {

    //STATE
    const [weatherData, setWeatherData] = useState();
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [loaded, setWeatherLoaded] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [apiError, setApiError] = useState(null);

    //context
    const { fetchLocation, location } = useContext(LocationContext)
    // console.log(`Location:`, location)


    // call weather API
    const fetchWeatherData = async () => {
        const weatherAPIurl = buildWeatherURL(location)
        console.log(`loading;`, loadingWeather, `loaded: `, loaded, `error:`, apiError)

        if (loaded) {
            console.log(`Loaded already: ${loaded}`)
            return;
        }

        //set loading state
        setLoadingWeather(true)

        try {
            const response = await fetch(weatherAPIurl)

            // Simulate a longer loading time with a timeout
            await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 seconds delay
            if (!response.ok) {
                throw response
            }
            const data = await response.json()
            setWeatherData(data)
            //set error codes to null
            setApiError(null);
            setLocationError(null)
            setWeatherLoaded(true)

        } catch (error) {
            console.log(error, `error`)
            //handle error codes
            if (error.status === 400) {
                const errorData = await error.json()
                console.log(errorData)
                if (errorData.error.code === 1006) {
                    setLocationError(errorData.error.message)
                    console.log(`location error set`)
                } else {
                    setApiError(`API Error: ${errorData.error.message}`)
                }
            } else if (error.status === 401) {
                setApiError("API key not provided or invalid.");
            } else {
                setApiError("An unexpected error occurred.");
            }
            console.log(error)
        } finally {
            setLoadingWeather(false)
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [])

    useEffect(() => {
        if (location) {
            fetchWeatherData()
        }
    }, [location])

    // console.log(weatherData)

    return (
        <div>
            <WeatherCard weatherData={weatherData} loadingWeather={loadingWeather} apiError={apiError}/>
            <LocationForm setWeatherLoaded={setWeatherLoaded} setLoadingWeather={setLoadingWeather} locationError={locationError} />
        </div>
    )
}

export default WeatherPage