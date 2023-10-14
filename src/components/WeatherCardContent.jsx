import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const WeatherCardContent = ({weatherData}) => {

    // console.log(weatherData)
 const {location: { name, country }, current: { condition: { text, icon }, wind_kph, humidity, wind_dir, temp_c } } = weatherData
    
    return (
        <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {name} {country}
                </Typography>
                <Typography variant="h5" component="div">
                    {temp_c}°C
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {text}
                </Typography>
                <Typography variant="body2">
                Wind direction:{wind_dir}°,  
                </Typography>
                <Typography variant="body2"> 
                Wind speed: {wind_kph},
                </Typography>
                <Typography variant="body2">
                Humidity: {humidity}%,
                </Typography>
            </CardContent>
    );
};

export default WeatherCardContent;