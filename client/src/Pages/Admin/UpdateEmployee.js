import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function UpdateEmployee(){
    const{ id } = useParams();
    const [employee, setEmployee] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        contact: '',
        position: '',
        executiveRole: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            console.log(res.data);
            setEmployee(res.data);
            axios.get(`http://localhost:5000/users/${res.data.user}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then(r => {
                console.log(r.data);
                setEmployee(r.data);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [id])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setEmployee({...employee, [name]: value});
    }

    return (
        <>
        <Navbar/>
        <Container>
            <Row>
                <Col md={6}>
                    {
                        id ? 
                        <h1>Update Employee</h1> : 
                        <h1>Add Employee</h1>
                    }
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            name="username" 
                            value={employee.username} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={employee.password} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter name" 
                            name="name" 
                            value={employee.name} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            value={employee.email} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicContact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter contact" 
                            name="contact" 
                            value={employee.contact} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter position" 
                            name="position" 
                            value={employee.position} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicExecutiveRole">
                            <Form.Label>Executive Role</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter executive role" 
                            name="executiveRole" 
                            value={employee.executiveRole} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        {id ? (
                        <Button variant="primary" type="submit">
                            Update Employee
                        </Button>
                        ) : (
                        <Button variant="primary" type="submit">
                            Add New Employee
                        </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )           

}

export default UpdateEmployee;