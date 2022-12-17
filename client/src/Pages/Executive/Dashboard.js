import React from 'react';
import Navbar from '../../Components/Navbar';
import ProfileCard from '../../Components/ProfileCard';
import Container from '@mui/material/Container';
import Welcome from '../../Components/Welcome';
import { Button } from 'react-bootstrap';

import {Grid} from '@mui/material'

function ExecutiveDashboard() {
    return (
        <><Navbar />
        <Container maxWidth="lg">
        <Grid container spacing={2} mt={3} sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Grid item xs={4} sx={{display: { xs: 'none', md: 'flex' }}}>
                <ProfileCard/>
            </Grid>
            <Grid item xs>
                <Welcome/>
            </Grid>
        </Grid>

        <Grid mt={3} container spacing={2} direction="column" alignItems="center" justify="center" sx={{display: { xs: 'flex', md: 'none' }}}>
            <Grid item sx={{display: { xs: 'flex', md: 'none' }}}>
                <ProfileCard/>
            </Grid>
        </Grid>
        <br></br>
        <Button variant="primary" onClick={() => window.location = '/executive/manage-applicant'}>Manage Applicant</Button>
        </Container></>
    )
    }

export default ExecutiveDashboard