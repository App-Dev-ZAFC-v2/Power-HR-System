import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Box, Grid, Paper, Typography} from '@mui/material'
import welcomeimg from '../../Assets/welcome.png'
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.h4,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10,
  }));


export default function Welcome(){
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

    return(
        // <Item variant='outlined'>
        //     <Box component="img" sx={{height: 200}} src={welcomeimg}/>
        //     <Typography variant='h4' mt={3}>Hi, {user?.name}</Typography>
        // </Item>
        <Box sx={{backgroundColor: "#5248df", width:"100%", borderRadius:"24px", p:"12px", boxShadow: 12}}>
            <Grid container sx={{width:"100%"}}>
                <Grid item md={2} xs={12}>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Box component="img" sx={{height: 150, m: "20px"}} src={welcomeimg}/>
                    </Box>
                </Grid>
                <Grid item md={10} xs={12} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", flexDirection: 'column'}}>
                        <Typography variant='h4' color="white"  gutterBottom>Welcome to Power HR</Typography>
                        <Typography variant='h6' color="white"  gutterBottom>The cloud-based platform revolutionizing HR management and reducing employee turnover</Typography>
                    </Box>
                </Grid>
                <Grid item md={10} xs={12} sx={{ display: { xs: "flex", md: "none" } }}>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', textAlign: "center", textAlignLast: "center"}}>
                        <Typography variant='h4' color="white"  gutterBottom>Welcome to Power HR</Typography>
                        <Typography variant='h6' color="white"  gutterBottom>The cloud-based platform revolutionizing HR management and reducing employee turnover</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}