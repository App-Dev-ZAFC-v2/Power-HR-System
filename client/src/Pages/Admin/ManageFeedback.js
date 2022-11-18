import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../Components/Navbar';


function ManageFeedback() {
    
    const [feedback, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/feedbacks/')
        .then(res => {
            setFeedback(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <>
        <Navbar/>
        <div>manage feedback</div>
        <Button variant="primary" onClick={() => window.location = '/admin/dashboard'}>Back to Dashboard</Button>
        <Button> ADMIN ADD FEEDBACK </Button>


        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Employee Name</th>
            <th>Title</th>
            <th>Message</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {feedback.map((feedback) => (
                <tr>
                    <td>{feedback.createdByName}</td>
                    <td>{feedback.feedbackTitle}</td>
                    <td>{feedback.feedbackMessage}</td>
                    <td>
                        <Button variant="primary" onClick={() => window.location = '/admin/updatefeedback'}>Update</Button>
                        <Button variant="danger">Delete</Button>
                        </td>
                    
                </tr>
            ))}
        </tbody>
        </Table>

        </>
    )
    }

    export default ManageFeedback;