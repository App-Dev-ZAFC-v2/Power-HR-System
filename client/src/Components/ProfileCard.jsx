import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { positions } from '@mui/system';
import photo from "../Assets/default.png";
import { Grid } from '@mui/material';
import { width } from '@mui/system';
import bg from '../Assets/BackgroundProfile/Cloudy.png'

export default function ProfileCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="150"
        image={bg}
      />
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center">
        <Grid>
        <CardMedia
            component="img"
            image={photo}
            sx={{borderRadius: '50%', width:120 , height:120, border:5, borderColor: "white", mt:-8} }
            />
        </Grid></Grid>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Muhammad Aniq Aqil
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Number: 
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Address: 
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Code: 
        </Typography>
      </CardContent>
    </Card>
  )}