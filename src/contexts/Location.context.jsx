import React, { createContext, useState, useCallback } from "react";

export const LocationContext = createContext({
    fetchLocation: () => {},
     loading: false,
     loaded: false,
     error: null,
     location: "",
})

export const LocationProvider = () => {
    const [location, setLocation] = useState()
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)

    const fetchLocation = useCallback(() => {
        if (loading || loaded || error) {
            return;
        }

        setLoading(true)

        try {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.location)
            });

            }
        }
        

        
    })
}

