import React, {useState, useEffect} from 'react';
import Navbar from '../../Components/Old Components/Navbar';
import { Button } from 'react-bootstrap';
import { DashboardLayout } from '../../Components/Admin/Dashboard/dashboard-layout';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    // const [tok, setTok] = useState(localStorage.getItem('authToken'));

    // take the token from local storage
    const token = localStorage.getItem('authToken');
    // get the username from the token
    const username = JSON.parse(atob(token.split('.')[1])).username;

    return (
        <>
        {/* <Navbar/> */}
        <DashboardLayout tab="Dashboard">
            {/* <div>admin dashboard</div>
            <div>username: {username}</div>
            <Button variant="primary" onClick={() => window.location = '/admin/manage-employee'}>Manage Employee</Button>
            <br></br>
            <Button variant="primary" onClick={() => window.location = '/admin/manage-job'}>Manage Job</Button>
            <Button variant="primary" onClick={() => window.location = '/admin/manage-feedback'}>Manage Feedback</Button>
            <Button variant="primary" onClick={() => window.location = '/admin/manage-forms'}>Manage Survey</Button> */}
        </DashboardLayout>
        </>
    )
    }

export default AdminDashboard