import {Box, Container, Grid, Paper, TextField, Typography, Button, Stack} from '@mui/material';
import axios from 'axios';
import {React, useState, useEffect} from 'react';
import Navbar from '../../Components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function Feedback(){
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('authToken');
    const detailId = JSON.parse(atob(token.split('.')[1])).detailId;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (axios.get(`http://localhost:5000/employees/${detailId}/`))
        .then(res => {
            setUser(res.data);
            setFeedback({createdByName: user.name});
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }, [])

    const [feedback, setFeedback] = useState({
        feedbackTitle: '',
        feedbackMessage: '',
        createdByName: user.name,
        createdBy: detailId,
        createdOn: '',
    })

    const handleChange = (e) => {
        setFeedback({...feedback, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(feedback);
        axios.post('http://localhost:5000/feedbacks/add', feedback)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <>
            <Navbar />
            <Container maxWidth="lg">
                {isLoading ? (
                    "Loading..."
                ) : (
                <Paper sx={{p:12, mt:6, borderRadius: 3}} elevation={3}>
                <Box component="form" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <Typography variant='h2'>Feedback</Typography>
                    <Grid container spacing={3} mt={1}>
                        <Grid item xs={12}>
                            <TextField value={feedback.feedbackTitle} name="feedbackTitle" fullWidth label="Title" variant="outlined" required onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={feedback.feedbackMessage} name="feedbackMessage" fullWidth label="Message" variant="outlined" multiline rows={10} required onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" mt={3}>
                    <Stack spacing={2} direction="row">
                        <Button type="submit" variant="contained" sx={{ pr:12, pl:12}} endIcon={<SendIcon />} onClick={(e) => handleSubmit(e)}>
                            Send
                        </Button>
                        <Button variant="contained" endIcon={<DeleteIcon />} onClick={() => {setFeedback({feedbackMessage: '', feedbackTitle: ''});}}>
                            Delete
                        </Button>
                    </Stack></Grid></Box></Paper>)}
            </Container>
        </>
    )
}

export default Feedback;