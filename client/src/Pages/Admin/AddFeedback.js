import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Form from 'react-bootstrap/Form';


function AddFeedback(){
    const [feedback, setFeedback] = useState({
        feedbackTitle: '',
        feedbackMessage: '',
        createdByName: '',
        createdBy: '',
        createdOn: '',
    })

    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e) => {
        setFeedback({...feedback, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(feedback);
        axios.post('http://localhost:5000/feedbacks/add', feedback)
        .then(res => {
            console.log(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        <Navbar/>
        <div>Add Feedback</div>
        <Button variant="primary" onClick={() => window.location = '/admin/dashboard'}>Back to Dashboard</Button>
        <Button variant="primary" onClick={() => window.location = '/admin/manage-feedback'}>Manage Feedback</Button>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Feedback Title</Form.Label>
        <Form.Control name = "FeedbackTitle" type="text" placeholder="Insert Title" onChange={handleChange } />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Feedback Message</Form.Label>
        <Form.Control name = "FeedbackMessage" as="textarea" rows={3} onChange={handleChange } />
      </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
    </Form>
        </>
    )
}

export default AddFeedback;