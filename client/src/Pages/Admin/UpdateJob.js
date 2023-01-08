import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import EditJob from '../../Components/Admin/Form/EditJob';
import AddJob from '../../Components/Admin/Form/AddJob';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

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
        <Navbar/>
        <Container >
            <Row>
                <Col className='m-auto' md={6}>
                    {
                        id ? 
                        <>
                        <h1>Update Job</h1>
                        <EditJob id={id}/>
                        </> : 
                        <>
                        <h1>Add Job</h1>
                        <AddJob />
                        </>
                    }
                </Col>
            </Row>
        </Container>
        </>
    )           

}

export default UpdateEmployee;