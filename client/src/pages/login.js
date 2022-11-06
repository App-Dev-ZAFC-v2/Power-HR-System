import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button, Container} from 'react-bootstrap';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(['applicants', 'employees', 'admins']);
    const [user, setUser] = useState(2);
    const [error, setError] = useState('');
    const [tries, setTries] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            username,
            password
        }
        axios.post(`http://localhost:5000/${userType[user]}/login`, loginData)
        .then(res => {
            console.log(res);
            localStorage.setItem('authToken', res.data.token);
            user===0 ? window.location = '/applicant/dashboard' : 
            user===1 ? window.location = '/employee/dashboard' : 
            window.location = '/admin/dashboard';
        
        }
        )
        .catch(err => {
            setError(err.response.data.error);
            setTries(tries + 1);
        }
        )
    }

    return (
        <>
        <Container>
        <div className='uni-form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group p-3">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} required onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-group p-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        </div>
    </Container>
        </>
    )
}

export default Login