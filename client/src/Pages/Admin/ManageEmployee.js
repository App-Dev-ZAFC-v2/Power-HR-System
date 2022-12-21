import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import EmployeesTable from '../../Components/Admin/EmployeesTable';
import { Button, Table } from 'react-bootstrap';

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
            console.log(res.data);
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
        <Navbar/>
        <div className="container">
            <h1>Manage Employees</h1>
            <Button variant="primary" href="/admin/update-employee">Add Employee</Button>
            <br/>
            {
                isLoading && !isError ? <h1>Loading...</h1> :
                <EmployeesTable {...employees} />
            }
            {
                isError && <h1>{error}</h1>
            }
            <Button variant="outline-primary" onClick={() => setIsViewInactive(!isViewInactive)}>{isViewInactive ? "Hide Inactive Employees" : "View Inactive Employees"}</Button>
            
        </div>

        
        
        </>
    )
    }

export default ManageEmployee