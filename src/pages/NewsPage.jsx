import React, { useState, useEffect, useCallback, useContext } from "react";
import { LocationContext } from "../contexts/Location.context";
import ImgMediaCard from "../components/ImgMediaCard";
import { buildNewsURL } from "../utilityFns/buildNewsURL";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { Box, Stack } from "@mui/system";
import ResponsiveGrid from "../components/ResponsiveGrid";
import Typography from '@mui/material/Typography';


const NewsPage = () => {

    //state
    const [news, setNews] = useState()
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const { location, fetchLocation } = useContext(LocationContext)
    const fetchNews = async (location) => {

        if (loaded || loading || error) {
            return;
        }

        try {
            setLoading(true)
            const response = await fetch(buildNewsURL())
            if (!response.ok) {
                throw response
            }
            const dataNews = await response.json()
            setError(null)
            setNews(dataNews)
            setLoaded(true)
        } catch (err) {
            console.log(err)
            const errData = await err.json()
            console.log(errData)
            setError(errData)
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
        <Box sx={{ mx: 3, marginTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Box sx={{ width: '25%' }} >
                {error && <Typography>
                    API Error: {error.errors[0]}
                </Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt:2 }}>
                    {!news && <CircularIndeterminate />}
                </Box>
            </Box>
            {news && <ResponsiveGrid news={news} />}
        </Box>
    );
};

export default NewsPage;