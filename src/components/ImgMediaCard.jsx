import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ImgMediaCard({values:{content, description, image, publishedAt, source, title, url}}) {

  return (
    <Card sx={{ maxWidth: 345, mb: 3, height:'100%'}}
    component={Link}
    to={'https://www.google.com/search?q=website+theme+colors&oq=&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQo4NjA0MDJqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8'}>
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
        {/* <Typography variant="body2" color="text.secondary">
          {content}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
