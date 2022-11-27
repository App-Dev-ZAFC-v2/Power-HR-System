import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import FeedbackTable from '../../Components/FeedbackTable';


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
        <Button variant="primary" onClick={() => window.location = '/admin/add-feedback'}>Admin Add Feedback</Button>
        <FeedbackTable/>
            


        </>
    )
    }

    export default ManageFeedback;