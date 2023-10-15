import { useEffect, useState, useContext } from "react"
import { buildWeatherURL } from "../utilityFns/buildWeatherURL";
import WeatherCard from "../components/WeatherCard";
import { LocationContext } from "../contexts/Location.context";
import { WeatherImageContext } from "../contexts/WeatherImage.context";
import InputWithIcon from "../components/InputWithIcon";
import LocationForm from "../components/Form/LocationForm";
import { Box, Grow } from "@mui/material";

function WeatherPage() {

    //STATE
    const [weatherData, setWeatherData] = useState();
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [loaded, setWeatherLoaded] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState()

    //context
    const { fetchLocation, location } = useContext(LocationContext)
    const { weatherImageUrl, fetchWeatherImage, setImageSearchText } = useContext(WeatherImageContext)
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
            console.log(data)
            //set error codes to null
            setApiError(null);
            setLocationError(null)
            setWeatherLoaded(true)
            setImageSearchText(data.current.condition.text)

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
            fetchWeatherImage()
        }
    }, [location])

    useEffect(() => {
        if (weatherImageUrl) {
            setBackgroundImage(`url(${weatherImageUrl})`)
        }
    }, [weatherImageUrl])

    // console.log(weatherData)

    return (

        <div
            style={{
                backgroundImage: backgroundImage ? backgroundImage : "",
                backgroundSize: 'cover',
                width: '100vw',
                height: '100vh',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}
        >
            <Box sx={{ maxWidth: 300, maxHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow:1}}>
                <Box>
                <WeatherCard weatherData={weatherData} loadingWeather={loadingWeather} apiError={apiError} sx={{ maxWidth: 100, height: 100 }} />
                <LocationForm setWeatherLoaded={setWeatherLoaded} setLoadingWeather={setLoadingWeather} locationError={locationError} />
                </Box>
            </Box>

        </div >
    )
}

export default WeatherPage