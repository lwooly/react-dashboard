import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, margin } from '@mui/system';
import { Link } from 'react-router-dom';

export default function ImgMediaCard({values:{content, description, image, publishedAt, source, title, url}}) {

  return (
    <Box
    component={Link}
    to={url}
    sx={{ textDecoration: 'none' }}
    >
    <Card sx={{ maxWidth: 345, mb: 3, height:'100%'}}>
      <CardMedia
        component="img"
        alt={description}
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {source.name}
        </Typography>
      </CardContent>
    </Card>
    </Box>
  );
}
