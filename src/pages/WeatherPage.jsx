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
    const [error, setError] = useState(null);
    const [input, setInput] = useState("London")

    //context
    const { fetchLocation, location } = useContext(LocationContext)
    // console.log(`Location:`, location)


    // call weather API
    const fetchWeatherData = async () => {
        const weatherAPIurl = buildWeatherURL(location)
        // console.log(`loading;`, loading, `loaded: `, loaded, `error:` , error )

        if (loadingWeather || loaded || error) {

            console.log(`The weather has already been loaded once`)
            return;
        }

        //set loading state
        setLoadingWeather(true)

        try {
            const response = await fetch(weatherAPIurl)

            // Simulate a longer loading time with a timeout
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay
            if (!response.ok) {
                throw new Error(`Invalid location`)
            }
            const data = await response.json()
            setWeatherData(data)
            setError(null);
            setWeatherLoaded(true)

        } catch (error) {
            console.log(error.message)
            setError(error.message)
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
            <WeatherCard weatherData={weatherData} loadingWeather={loadingWeather} />
            <LocationForm setWeatherLoaded={setWeatherLoaded} weatherAPIerror={error}/>
        </div>
    )
}

export default WeatherPage