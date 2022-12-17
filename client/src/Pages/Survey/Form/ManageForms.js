import React, {useEffect, useState} from 'react';
import FormAPI from '../../../API/form';
import { CircularProgress, Container, Box, Grid, Typography } from '@mui/material';
import Navbar from '../../../Components/Navbar';
import FormCard from '../../../Components/Survey/FormCard.jsx';
import FormCardCreate from '../../../Components/Survey/FormCardCreate';

function ManageForms() {

    const [form, setForm] = useState([]);
    const [loadingForm, setLoading] = useState(true);

    useEffect(() => {
        FormAPI.getForms()
        .then((data) => {
            setForm(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    })
    
    return (
        <>
            {loadingForm ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>
            ):(<>
                <Navbar />
                <Container maxWidth="lg" sx={{mt: 4}}>
                    <Typography variant='h2'>Manage Forms</Typography>
                    <Grid container spacing={6} sx={{mt: 0}}>
                    {form.map(f => (
                        <FormCard dataform={f} />
                    ))}
                    <FormCardCreate/>
                    </Grid>
                </Container></>
            )}
        </>
    )
}

export default ManageForms;