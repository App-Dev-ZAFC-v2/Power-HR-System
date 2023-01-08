import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Box, Paper, Typography} from '@mui/material'
import welcomeimg from '../Assets/welcome.png'
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.h4,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10,
  }));


export default function Welcome(){
    const [user, setUser] = useState();
    
    const employee = useSelector((state) => state.employees.employee);
    const applicant = useSelector((state) => state.applicants.applicant);
    const admin = useSelector((state) => state.admins.admin);

    useEffect(() => {
        setUser(employee);
    }, [employee]);

    useEffect(() => {
        setUser(applicant);
    }, [applicant]);

    useEffect(() => {
        setUser(admin);
    }, [admin]);

    return(
        <Item variant='outlined'>
            <Box component="img" sx={{height: 200}} src={welcomeimg}/>
            <Typography variant='h4' mt={3}>Hi, {user?.name}</Typography>
        </Item>
    )
}