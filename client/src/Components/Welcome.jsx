import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {Box, Paper, Typography} from '@mui/material'
import welcomeimg from '../Assets/welcome.png'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.h4,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10,
  }));


export default function Welcome(){
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('authToken');
    
    // FIND BETTER WAY TO DO THIS
    const userType = JSON.parse(atob(token.split('.')[1])).userType;
    // const userId = JSON.parse(atob(token.split('.')[1])).UserId;
    const detailId = JSON.parse(atob(token.split('.')[1])).detailId;

    useEffect(() => {
      (userType === 0 ? axios.get(`http://localhost:5000/applicants/${detailId}`) :
        axios.get(`http://localhost:5000/employees/f/${detailId}`))
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    })
    return(
        <Item variant='outlined'>
            <Box component="img" sx={{height: 200}} src={welcomeimg}/>
            <Typography variant='h4' mt={3}>Hi, {user?.name}</Typography>
        </Item>
    )
}