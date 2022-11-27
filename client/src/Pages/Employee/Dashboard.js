import React from 'react';
import Navbar from '../../Components/Navbar';
import ProfileCard from '../../Components/ProfileCard';
import Welcome from '../../Components/Welcome';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Box, Button, Grid} from '@mui/material'
import feedback from '../../Assets/feedback.png'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.h4,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10,
  }));

function EmployeeDashboard() {
    return (
        <><Navbar />
        <Container maxWidth="lg">
        <Grid container spacing={5} mt={0} sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Grid item xs={4} sx={{display: { xs: 'none', md: 'flex' }}}>
                <ProfileCard/>
            </Grid>
            <Grid item xs>
                <Welcome/>
                <Item variant='outlined'>
                    <Box component="img" sx={{height: 200}} src={feedback}/>
                    <Box variant="outlined" height={50}><Button variant="contained" href='feedback'>Feedback survey</Button></Box>
                </Item>
            </Grid>
        </Grid>

        <Grid mt={0} container spacing={5} direction="column" alignItems="center" justify="center" sx={{display: { xs: 'flex', md: 'none' }}}>
            <Grid item>
                <ProfileCard/>
            </Grid>
            <Grid item>
                <Welcome/>
            </Grid>
        </Grid>
        </Container></>
    )
    }

export default EmployeeDashboard