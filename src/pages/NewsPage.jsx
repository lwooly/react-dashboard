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
            // await new Promise(resolve => setTimeout(resolve, 1000)); // 1 seconds delay
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


    return (
        <>
            {news && 
            <Box sx={{m:3, marginTop: 10, }}>
                <ResponsiveGrid news={news} sx={{ m: 4 }} />
            </Box>}
            
            {!news &&
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    {loading && <CircularIndeterminate />}
                    {error &&
                    <Box sx={{ width: '25%' }} >
                         <Typography>
                            API Error: {error.errors[0]}
                        </Typography>
                        </Box>}
                </Box>
            }
        </>
    );
};

export default NewsPage;