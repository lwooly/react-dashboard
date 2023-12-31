import React, { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { LocationContext } from '../../contexts/Location.context';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { Card } from '@mui/material';


const LocationForm = ({ setWeatherLoaded, setLoadingWeather, locationError }) => {
    const { setLocation, location, fetchLocation } = useContext(LocationContext)
    const { register, handleSubmit, formState, formState: { errors }, reset, isSubmitting, isDirty, isValid } = useForm()


    const onSubmitHandler = ({ location: newLocation }) => {
        if (newLocation) {
            //set weather form loaded state to false so new weather can load on change of location.
            setWeatherLoaded(false)
            setLocation(newLocation)

        }
        reset()
    }

    const handleCurrentLocationClick = () => {
        //return user to home location
        setWeatherLoaded(false)
        setLoadingWeather(true)
        fetchLocation()
    }


    const getErrorProps = () => {
        if (locationError) {
            return {
                error: true,
                id: "outlined-error-helper-text",
                label: "Error",
                defaultValue: "",
                helperText: "Invalid location."
            }
        } else {
            return {};
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                {/* <input {...register('location', {required:true})} /> */}
                <Card sx={{ minWidth: 275, borderRadius: 7, mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', backgroundColor: `white`, p: 0.5, borderRadius: 7 }}>
                        <IconButton onClick={handleCurrentLocationClick}>
                            <EditLocationIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        </IconButton>
                        <TextField
                            id="input-with-sx"
                            label="Edit location"
                            variant="standard"
                            autoComplete='off'
                            {...register("location")}
                            {...getErrorProps()}
                        />
                        <IconButton type='submit' sx={{ mr: 1, my: 0.5 }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>

                </Card>
            </form>
        </>
    );
};

export default LocationForm;