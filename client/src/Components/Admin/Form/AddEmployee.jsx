import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';
import { Button } from '@mui/material';

function AddEmployee(){
    const [employee, setEmployee] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        contact: '',
        position: '',
        executiveRole: false
    });
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onChangeInput = e => {
        const { name, value } = e.target;
        setEmployee({...employee, [name]: value});
    }

    const onChangeSwitch = e => {
        const { name, checked } = e.target;
        setEmployee({...employee, [name]: checked});
    }

    const handleSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setInvalid(true);
        }
        setValidated(true);
        if(form.checkValidity() === true){
            e.preventDefault();
            setInvalid(false);
            axios.post('https://powerhr-server.azurewebsites.net/employees/register/', employee, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then(res => {
                setSuccess(true);
                setError(false);
            }
            )
            .catch(err => {
                console.log(err);
                setSuccess(false);
                setError(true);
                setErrorMessage(err.response.data.message ? err.response.data.message : 'Something went wrong!');
                if(err.response.data.message === 'Username already exists'){
                    setEmployee({...employee, username: ''});
                }
                else if(err.response.data.message === 'Email already exists'){
                    setEmployee({...employee, email: ''});
                }
            }
            )
        }
    }

    return(
        <>
        {
            success && !error && <Alert variant="success">Employee added successfully!</Alert>
        }
        {
            error && !success && 
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>{errorMessage}</p>
            </Alert>
        }
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                required
                type="text" 
                placeholder="Enter username" 
                name="username" 
                value={employee.username} 
                onChange={onChangeInput} />                
                <Form.Control.Feedback type="invalid">
                    {
                        errorMessage === 'Username already exists' ? 'Please choose a new username' : 'Please enter a username'
                    }
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                required
                type="password" 
                placeholder="Enter password" 
                name="password" 
                value={employee.password} 
                onChange={onChangeInput} />              
                <Form.Control.Feedback type="invalid">
                    Please provide a password.
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                required
                type="text" 
                placeholder="Enter name" 
                name="name" 
                value={employee?.name} 
                onChange={onChangeInput} />
                <Form.Control.Feedback type="invalid">
                    Please provide employee's full name.
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                    Looks good!
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                    {
                        errorMessage === 'Email already exists' ? 'Please provide a different email' : 'Please provide a valid email.'
                    }
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control 
                required
                type="number" 
                placeholder="Enter contact" 
                name="contact" 
                value={employee?.contact} 
                onChange={onChangeInput} />
                <Form.Control.Feedback type="invalid">
                    Please provide employee's contact number.
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control 
                required
                type="text" 
                placeholder="Enter position" 
                name="position" 
                value={employee?.position} 
                onChange={onChangeInput} />
                <Form.Control.Feedback type="invalid">
                    Please provide employee's position.
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                    Looks good!
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicExecutiveRole">
                <Form.Label>Executive Role</Form.Label>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label={employee?.executiveRole ? "Executive" : "Non-Executive"}
                    name="executiveRole"
                    isValid={employee?.executiveRole}
                    onChange={onChangeSwitch}
                />
            </Form.Group>

            
            <Button variant="contained" color="success">
                Add New Employee
            </Button>
            {
                invalid && <Alert variant="danger">Please fill all the fields</Alert>
            }
        </Form>
        </>
    )
}

export default AddEmployee;