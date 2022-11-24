import React from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';

function DeleteJob(props) {
    const deleteJob = () => {
        console.log("in deleteJob");
        axios.delete(`http://localhost:5000/jobs/${props.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res);
                // reload the page
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Button variant="danger" onClick={deleteJob}>Delete</Button>
    )
}

export default DeleteJob