import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function EditEmployee(props){
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        contact: '',
        position: '',
        executiveRole: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
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

    useEffect(() => {
        console.log(props.id);
        axios.get(`https://powerhr-server.azurewebsites.net/employees/${props.id}`, {
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
            setIsError(true);
        })
    }, [props])

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
        axios.patch(`https://powerhr-server.azurewebsites.net/employees/${props.id}`, employee, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
            console.log(res);
            // go to manage employee page
            window.location.href = '/admin/manage-employee';
        })
        .catch(err => {
            console.log(err);
            setSuccess(false);
            setError(true);
            setErrorMessage(err.response.data.message ? err.response.data.message : 'Something went wrong!');
            if(err.response.data.message === 'Email already in use'){
                setEmployee({...employee, email: ''});
            }
        })
    }
    }


    return(
        <>
        {
            isError && 
            <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>Couldn't fetch employee's data</p>
            </Alert>
        }
        {
            error && !success && 
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>{errorMessage}</p>
            </Alert>
        }
        {
            isLoading ? <h3>Loading...</h3> : (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >

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
            value={employee?.email} 
            onChange={onChangeInput} />
            <Form.Control.Feedback type="invalid">
                {
                    errorMessage === 'Email already in use' ? 'Please provide a different email' : 'Please provide a valid email.'
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

        <Button variant="primary" type="submit">
            Update Employee
        </Button>
        {
                invalid && <Alert variant="danger">Please don't leave any field blank</Alert>
            }
    </Form>
    )}
    </>
    )


}

export default EditEmployee;
