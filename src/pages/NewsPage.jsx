import React, {useState, useEffect, useCallback, useContext} from "react";
import { LocationContext } from "../contexts/Location.context";
import ImgMediaCard from "../components/ImgMediaCard";
import { buildNewsURL } from "../utilityFns/buildNewsURL";
import CircularIndeterminate from "../components/CircularIndeterminate";


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
        <div>
            {!news && <CircularIndeterminate/>}
            {news && news.articles.map((article, i) => <ImgMediaCard key={i} values={article}/>)}
        </div>
    );
};

export default NewsPage;