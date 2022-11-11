import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import photo from "../Assets/default.png";
import { Grid } from '@mui/material';
import bg from '../Assets/BackgroundProfile/Cloudy.png'

export default function ProfileCard() {

    const [user, setUser] = useState([]);
    const token = localStorage.getItem('authToken');
    const userType = JSON.parse(atob(token.split('.')[1])).userType;
    const userId = JSON.parse(atob(token.split('.')[1])).UserId;

    useEffect(() => {
        userType === 0 ? axios.get(`http://localhost:5000/applicants/${userId}`, {headers: {Authorization: `Bearer ${token}`}}) :
        userType === 1 ? axios.get(`http://localhost:5000/admins/${userId}`, {headers: {Authorization: `Bearer ${token}`}}) :
        axios.get(`http://localhost:5000/employees/${userId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setUser(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


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