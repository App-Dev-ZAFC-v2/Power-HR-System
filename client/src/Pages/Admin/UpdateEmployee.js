import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import EditEmployee from '../../Components/Admin/Form/EditEmployee';
import AddEmployee from '../../Components/Admin/Form/AddEmployee';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../../Components/Admin/Dashboard/dashboard-layout';
import { Paper } from '@mui/material';

function UpdateEmployee(){
    const{ id } = useParams();
    // const { username, password, name, email, contact, position, executiveRole } = employee;

    // const handleAdd = async e => {
    //     // const form = e.currentTarget;
    //     // if (form.checkValidity() === false) {
    //     //     e.preventDefault();
    //     //     e.stopPropagation();
    //     // }
    //     // setValidated(true);
    //     try {
    //         console.log(employee);
    //         axios.post('http://localhost:5000/employees/register/', employee, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('authToken')}`
    //             }
    //         })
    //         .then(res => {
    //             console.log(res);
    //             setIsSuccess(true);
    //         }
    //         )
    //         .catch(err => {
    //             console.log(err);
    //         }
    //         )

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
        <DashboardLayout tab={id? "Update Employee" : "Add Employee"}>
        <Container style={{marginTop: "24px"}} >
            <Row>
                <Col className='m-auto' md={6}>
                    <Paper elevation={12} style={{padding: "24px"}}>
                    {
                        id ? 
                        <>
                        <EditEmployee id={id}/>
                        </> : 
                        <>
                        <AddEmployee />
                        </>
                    }
                    </Paper>
                </Col>
            </Row>
        </Container>
        </DashboardLayout>
        </>
    )           

}

export default UpdateEmployee;