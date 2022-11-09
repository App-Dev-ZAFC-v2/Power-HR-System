import React from 'react';
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
    return(
        <Item variant='outlined'>
            <Box component="img" sx={{height: 200}} src={welcomeimg}/>
            <Typography variant='h4' mt={3}>Hi, Muhammad Aniq Aqil</Typography>
        </Item>
    )
}