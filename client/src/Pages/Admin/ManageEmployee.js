import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import EmployeesTable from '../../Components/Admin/EmployeesTable';
import { Table } from 'react-bootstrap';
import { DashboardLayout } from '../../Components/Admin/Dashboard/dashboard-layout';
import { Button, Container } from '@mui/material';

function ManageEmployee() {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isViewInactive, setIsViewInactive] = useState(false);

    const blue = {
        backgroundColor: 'lightblue',
        // color: 'white',
    }

    const white = {
        backgroundColor: 'white',
        // color: 'white',
    }

    useEffect(() => {
        axios.get('http://localhost:5000/employees', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            setEmployees(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsError(true);
            setError(err.response.data);
        })
    }, [])


    return (
        <>
        <DashboardLayout tab="Manage Employee">
        <Container>
            
            <br/>
            {
                isLoading && !isError ? <h1>Loading...</h1> :
                <EmployeesTable {...employees} />
            }
            {
                isError && <h1>{error}</h1>
            }
            <Button variant="contained" color="primary" onClick={() => setIsViewInactive(!isViewInactive)}>{isViewInactive ? "Hide Inactive Employees" : "View Inactive Employees"}</Button>
            
        </Container>
        </DashboardLayout>
        
        
        </>
    )
    }

export default ManageEmployee