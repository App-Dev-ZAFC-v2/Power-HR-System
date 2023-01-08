import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import JobTable from '../../Components/Admin/JobTable';
import {  Button, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { DashboardLayout } from '../../Components/Admin/Dashboard/dashboard-layout';

function ManageJob() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/jobs/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            setJobs(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [setIsLoading])

    return (
        <>
        <DashboardLayout tab="Manage Job">
        <Container style={{marginTop: "24px", padding: "0px"}}>
            <Button variant="contained" color='primary' href="/admin/update-job" sx={{mb: "12px"}}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Add Job
                </Typography>
            </Button>
            <JobTable {...jobs}/>
        </Container>
        </DashboardLayout>
        </>
    )

}

export default ManageJob