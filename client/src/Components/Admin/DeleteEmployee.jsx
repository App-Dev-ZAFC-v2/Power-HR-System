import React from 'react';
import { Button} from 'react-bootstrap';
import axios from 'axios';

function DeleteEmployee(props) {
    const deleteEmployee = () => {
        axios.patch(`https://powerhr-server.azurewebsites.net/employees/remove/${props.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                // reload the page
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Button variant="danger" onClick={deleteEmployee}>Delete</Button>
    )
}

export default DeleteEmployee;