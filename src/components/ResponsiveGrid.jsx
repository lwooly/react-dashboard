import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ImgMediaCard from './ImgMediaCard';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid({ news }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                {news.articles.map((article, i) => {
                    return (
                    <Grid xs={4} sm={3} md={3} key={i}>
                        <ImgMediaCard values={article} />
                    </Grid> )})}
            </Grid>
        </Box>
    );
}