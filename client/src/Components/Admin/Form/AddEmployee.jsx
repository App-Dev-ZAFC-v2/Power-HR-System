import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

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

    const onChangeInput = e => {
        const { name, value } = e.target;
        setEmployee({...employee, [name]: value});
    }

    const onChangeSwitch = e => {
        const { name, checked } = e.target;
        setEmployee({...employee, [name]: checked});
    }

    const onSubmit = async e => {
        
    }

    return(
        <>
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                required
                type="text" 
                placeholder="Enter username" 
                name="username" 
                value={employee?.username} 
                onChange={onChangeInput} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                required
                type="password" 
                placeholder="Enter password" 
                name="password" 
                value={employee?.password} 
                onChange={onChangeInput} />
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
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                required
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={employee?.email} 
                onChange={onChangeInput} />
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

            
            <Button variant="primary" type="submit">
                Add New Employee
            </Button>
        </Form>
        </>
    )
}

export default AddEmployee;