import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import EmployeesTable from '../../Components/Admin/EmployeesTable';
import { Button, Table } from 'react-bootstrap';

function ManageEmployee() {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            console.log(res.data);
            setEmployees(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <>
        <Navbar/>
        <div className="container">
            <h1>Manage Employees</h1>
            <EmployeesTable {...employees} />
            <Button variant="primary" href="/admin/update-employee">Add Employee</Button>
        </div>

        
        
        </>
    )
    }

export default ManageEmployee