import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import photo from "../../Assets/default.png";
import { Box, Grid, Paper } from '@mui/material';
import bg from '../../Assets/BackgroundProfile/backgroundProfile.jpg'
import { useSelector } from 'react-redux';

export default function ProfileCard() {
    const [user, setUser] = useState();
    const employee = useSelector((state) => state.employees.employee);
    const applicant = useSelector((state) => state.applicants.applicant);
    const admin = useSelector((state) => state.admins.currentAdmin);

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
    <Card sx={{borderRadius: 3, boxShadow: 12}}>
      <Paper elevation={0} sx={{pt:"24px", pl:"24px", pr:"24px"}}>
        <CardMedia
            sx={{backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "200px", borderRadius: "12px"}}
            style={{backgroundImage: `url(${bg})`}}>
              <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CardMedia
                    component="img"
                    image={photo}
                    sx={{borderRadius: '50%', width:150 , height:150} }
                    />
              </Box>
        </CardMedia>
      </Paper>
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{textAlign: "center", textAlignLast: "center"}}>
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: "center", textAlignLast: "center"}}>
          {user?.contact}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: "center", textAlignLast: "center"}}>
            {user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: "center", textAlignLast: "center"}}>
            {user?.position}
        </Typography>
      </CardContent>
    </Card>

  
  )}