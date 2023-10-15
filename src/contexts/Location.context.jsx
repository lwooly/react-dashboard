import React, { createContext, useState, useCallback } from "react";

export const LocationContext = createContext({
    fetchLocation: () => { },
    setLocation: () => { },
    loading: false,
    loaded: false,
    error: null,
    location: "",
})

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState()
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)


    const fetchLocation = useCallback(async () => {

        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        if (loading || loaded || error) {
            return;
        }

        try {
            setLoading(true)
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
            setLocation(position.coords)
            setLoaded(true)

        } catch (error) {
            console.log(error)
            setError(error)

        } finally {
            setLoading(false)
        }
    }, []);


    return (
        <LocationContext.Provider
            value={{
                fetchLocation,
                setLocation,
                loading,
                loaded,
                error,
                location,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}

