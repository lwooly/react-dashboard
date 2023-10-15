import React, { useState, createContext, useEffect } from 'react';
import {buildUnsplashApiUrl} from '../utilityFns/buildUnsplashApiURL'

export const WeatherImageContext = createContext({
    setImageLoaded: () => {},
    weatherImageUrl: "",
    fetchWeatherImage: () => {},
    setImageSearchText: () => {}
})

export const WeatherImageProvider = ({children}) => {

    const [weatherImageUrl, setWeatherImageUrl] = useState()
    const [imageSearchText, setImageSearchText] = useState()
    const [loading, setLoading] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const fetchWeatherImage = async () => {
        if (imageLoaded || loading || !imageSearchText){
            return;
        }
        
        setLoading(true)
        try {
            const response = await fetch(buildUnsplashApiUrl(imageSearchText))
            
            if (!response.ok) {
                throw response
            }
            const data = await response.json()
            //get random photo from returned array of 10
            const image = data.results[Math.floor(Math.random() * 10)]
            setWeatherImageUrl(image.urls.full)
            setLoaded(true)
            
        } catch (err) {
            console.log('no image returned')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeatherImage()
    }, [imageSearchText])

    return  (
        <WeatherImageContext.Provider 
        value={{
            setImageLoaded,
            weatherImageUrl,
            fetchWeatherImage,
            setImageSearchText
        }}
        >
            {children}
        </WeatherImageContext.Provider>
    )

}
  