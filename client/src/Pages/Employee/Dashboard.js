import React from 'react';
import Navbar from '../../Components/Navbar';
import ProfileCard from '../../Components/ProfileCard';
import Container from '@mui/material/Container';
import {Grid} from '@mui/material'

function EmployeeDashboard() {
    return (
        <><Navbar />
        <Container maxWidth="xl">
        <Grid container spacing={2} sx={{
                display: { xs: 'none', md: 'flex' }
            }}>
            <Grid item xs={4} mt={3}  sx={{
                display: { xs: 'none', md: 'flex' }
            }}>
                <ProfileCard/>
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>

        <Grid container spacing={2} direction="column" alignItems="center" justify="center" sx={{display: { xs: 'flex', md: 'none' }}}>
            <Grid item mt={3}  sx={{display: { xs: 'flex', md: 'none' }}}>
                <ProfileCard/>
            </Grid>
        </Grid>
        </Container></>
    )
    }

export default EmployeeDashboard