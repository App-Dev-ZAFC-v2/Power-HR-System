import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import photo from "../Assets/default.png";
import { Grid } from '@mui/material';
import bg from '../Assets/BackgroundProfile/Cloudy.png'

export default function ProfileCard() {
  return (
    <Card variant="outlined" sx={{borderRadius: 3, maxHeight:400}}>
      <CardMedia
        component="img"
        height="200"
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
            sx={{borderRadius: '50%', width:150 , height:150, border:5, borderColor: "white", mt:-10} }
            />
        </Grid></Grid>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="center">
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