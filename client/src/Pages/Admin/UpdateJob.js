import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Old Components/Navbar';
import EditJob from '../../Components/Admin/Form/EditJob';
import AddJob from '../../Components/Admin/Form/AddJob';
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
    //         axios.post('https://powerhr-server.azurewebsites.net/employees/register/', employee, {
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
        <DashboardLayout tab={id? "Update Job" : "Add Job"}>
        <Container >
            <Row>
                <Col className='m-auto' md={8}>
                    <Paper elevation={12} sx={{mt: "24px", pt: "24px", pb: "24px", mb: "48px"}}>
                    {
                        id ? 
                        <>
                        <EditJob id={id}/>
                        </> : 
                        <>
                        <AddJob />
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