import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function EditEmployee(props){
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        contact: '',
        position: '',
        executiveRole: false
    });
    const [isLoading, setIsLoading] = useState(true);

    const onChangeInput = e => {
        const { name, value } = e.target;
        setEmployee({...employee, [name]: value});
    }

    const onChangeSwitch = e => {
        const { name, checked } = e.target;
        setEmployee({...employee, [name]: checked});
    }

    useEffect(() => {
        console.log(props.id);
        axios.get(`http://localhost:5000/employees/${props.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            console.log(res.data);
            setEmployee(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [props])

    return(
        <>
        {
            isLoading ? <h3>Loading...</h3> : (
        <Form>

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
            Update Employee
        </Button>
    </Form>
    )}
    </>
    )


}

export default EditEmployee;
