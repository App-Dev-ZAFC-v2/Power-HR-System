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
            <EmployeesTable rows={employees} />
            {/* <Table bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <tr><td>Loading...</td></tr> : employees.map(employee => (
                        <tr key={employee._id} style={employee.executiveRole === true ? blue : white}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>{employee.contact}</td>
                            <td>
                                <Button variant="primary">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
        </div>

        
        
        </>
    )
    }

export default ManageEmployee