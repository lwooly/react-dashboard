import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard({ weatherData }) {

    // console.log(weatherData)

    const { location: { name, country }, current: { condition: { text, icon }, wind_kph, humidity, wind_dir, temp_c } } = weatherData

    return (
        <Card sx={{ minWidth: 275 }}>
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
        </Card>
    );

}
