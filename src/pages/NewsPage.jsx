import React, {useState, useEffect, useCallback, useContext} from "react";
import { LocationContext } from "../contexts/Location.context";
import ImgMediaCard from "../components/ImgMediaCard";
import { buildNewsURL } from "../utilityFns/buildNewsURL";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { Box } from "@mui/system";
import ResponsiveGrid from "../components/ResponsiveGrid";


const NewsPage = () => {

    //state
const [news, setNews] = useState()
const [loaded, setLoaded] = useState(false)
const [loading, setLoading ] = useState(false)
const [error, setError ] = useState(false) 

    const {location, fetchLocation} = useContext(LocationContext)
    const fetchNews = async (location) => {

        if ( loaded || loading || error) {
            return;
        }

        try {
            setLoading(true)
            const response = await fetch(buildNewsURL())
            if (!response.ok) {
                throw response
            }
            const dataNews = await response.json()

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

        console.log(news)

    return (
        <Box>
            {!news && <CircularIndeterminate/>}
            {news && <ResponsiveGrid news={news}/>}
        </Box>
    );
};

export default NewsPage;