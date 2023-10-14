import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularIndeterminate from './CircularIndeterminate';
import WeatherCardContent from './WeatherCardContent';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function WeatherCard({ weatherData, loadingWeather, apiError}) {

    return (
        <Card sx={{ minWidth: 275, minHeight: 275, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!weatherData || loadingWeather ? (
            <CircularIndeterminate />
            ) : (  !apiError  ? ( <WeatherCardContent weatherData = { weatherData }/>):
                    (<CardContent>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {apiError}
                </Typography>
                    </CardContent>))}
        </Card>
    );

}
