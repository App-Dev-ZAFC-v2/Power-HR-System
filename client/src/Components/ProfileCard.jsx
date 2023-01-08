import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import photo from "../Assets/default.png";
import { Grid } from '@mui/material';
import bg from '../Assets/BackgroundProfile/Cloudy.png'
import { useSelector } from 'react-redux';

export default function ProfileCard() {

    const [user, setUser] = useState();

    const employee = useSelector((state) => state.employees.employee);
    const applicant = useSelector((state) => state.applicants.applicant);
    const admin = useSelector((state) => state.admins.admin);

    useEffect(() => {
      setUser(employee);
    }, [employee]);

    useEffect(() => {
      setUser(applicant);
    }, [applicant]);

    useEffect(() => {
      setUser(admin);
    }, [admin]);



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
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {user?.contact}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
            {user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
            {user?.position}
        </Typography>
      </CardContent>
    </Card>
  )}