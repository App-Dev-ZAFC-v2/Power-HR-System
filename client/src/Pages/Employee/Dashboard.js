import React from 'react';
import Navbar from '../../Components/Navbar';
import ProfileCard from '../../Components/ProfileCard';
import Welcome from '../../Components/Welcome';
import Container from '@mui/material/Container';

import {Grid} from '@mui/material'

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