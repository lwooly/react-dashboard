import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EditLocationIcon from '@mui/icons-material/EditLocation';


export default function InputWithIcon({setInput}) {

    const input = React.useRef()

    return (
        <form >
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <EditLocationIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField ref={input} id="input-with-sx" label="Edit location" variant="standard" />
                </Box>
            </Box>
            <button onClick={(e)=> {
                e.preventDefault()
                setInput(input.current.children[1].children[0].value)}}>Submit</button>
        </form>
    );
}
