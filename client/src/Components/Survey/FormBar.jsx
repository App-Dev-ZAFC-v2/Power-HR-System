import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function FormBar(props) {
    const [form, setForm] = useState({});
    useEffect(()=>{
        setForm(props.dataform)
    }, [props.dataform])

    return (
        <Grid sx={{ borderTop: '10px solid black', borderRadius: 2 }}>
            <Paper elevation={2} sx={{ width: '100%' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: '15px', pt: '20px', pb: '20px' }}>
                    <Typography variant="h4" sx={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>
                        {form.name}
                    </Typography>
                    <Typography variant="subtitle1">{form.description}</Typography>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default FormBar;