import React from 'react';
import { Button } from 'react-bootstrap';

function ManageEmployee() {
    return (
        <>
        <div>manage employee</div>
        <Button variant="primary" onClick={() => window.location = '/admin/dashboard'}>Back to Dashboard</Button>
        <Button> ADD EMPLOYEE</Button>
        <Button> DELETE EMPLOYEE</Button>
        
        </>
    )
    }

export default ManageEmployee