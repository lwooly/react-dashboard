import React, {useState, useEffect, useCallback, useContext} from "react";
import { LocationContext } from "../contexts/Location.context";

//state
const [news, setNews] = useState()
const [loaded, setLoaded] = useState(false)
const [loading, setLoading ] = useState(false)
const [error, setError ] = useState(false) 


const {location, fetchLocation} = useContext(LocationContext)

const NewsPage = () => {

    const fetchNews = async (location) => {

        if ( loaded || loading || error) {
            return;
        }

        try {
            setLoading(true)
            response = await fetch('url')
            if (!response.ok) {
                throw response
            }
            dataNews = await response.json()

            setNews(dataNews)
            setLoaded(true)
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [])

    useEffect(() => {
        if (location) {
            fetchNews(location)
        }
    }, [location])



    return (
        <div>
            
        </div>
    );
};

export default NewsPage; } from "react";