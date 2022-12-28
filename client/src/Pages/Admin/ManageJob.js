import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import JobTable from '../../Components/Admin/JobTable';
import {Button} from 'react-bootstrap';
import { Typography } from '@mui/material';

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
            console.log(res.data);
            setJobs(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [setIsLoading])

    return (
        <>
        <Navbar/>
        <div className="container"><br></br>
            <Typography align='center'><h1>Manage Job</h1></Typography>
            <Typography align='center' ><h6>Here you can add,update and delete jobs for the applicant.</h6></Typography>
            <br></br>
            <Button variant="primary" href="/admin/update-job">Add Job</Button>
            <br></br><br></br>
            <JobTable {...jobs}/>
        </div>
        </>
    )

}

export default ManageJob