import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function UpdateEmployee(){
    const{ id } = useParams();
    const [validated, setValidated] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [employee, setEmployee] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        contact: '',
        position: '',
        executiveRole: false
    });
    // const { username, password, name, email, contact, position, executiveRole } = employee;


    useEffect(() => {
        axios.get(`http://localhost:5000/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            console.log(res.data.employeeObject);
            setEmployee(res.data.employeeObject);
        })
        .catch(err => {
            console.log(err);
        })
    }, [id])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setEmployee({...employee, [name]: value});
    }

    const onChangeSwitch = e => {
        const { name, checked } = e.target;
        setEmployee({...employee, [name]: checked});
    }

    const handleAdd = async e => {
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // setValidated(true);
        try {
            console.log(employee);
            axios.post('http://localhost:5000/employees/register/', employee, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then(res => {
                console.log(res);
                setIsSuccess(true);
            }
            )
            .catch(err => {
                console.log(err);
            }
            )

        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async e => {
        e.preventDefault();
        try {
            console.log(employee);
        } catch (error) {
            console.log(error);
        }
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
                    <Form noValidate validated={validated} >
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            required
                            type="text" 
                            placeholder="Enter username" 
                            name="username" 
                            value={employee.username} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={employee.password} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            required
                            type="text" 
                            placeholder="Enter name" 
                            name="name" 
                            value={employee.name} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            required
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            value={employee.email} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicContact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control 
                            required
                            type="number" 
                            placeholder="Enter contact" 
                            name="contact" 
                            value={employee.contact} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control 
                            required
                            type="text" 
                            placeholder="Enter position" 
                            name="position" 
                            value={employee.position} 
                            onChange={onChangeInput} />
                        </Form.Group>

                        <Form.Group controlId="formBasicExecutiveRole">
                            <Form.Label>Executive Role</Form.Label>
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label={employee.executiveRole ? "Executive" : "Non-Executive"}
                                name="executiveRole"
                                isValid={employee.executiveRole}
                                onChange={onChangeSwitch}
                            />
                        </Form.Group>

                        {id ? (
                        <Button variant="primary" type="submit">
                            Update Employee
                        </Button>
                        ) : (
                        <Button variant="primary" type="submit" onClick={handleAdd}>
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