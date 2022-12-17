import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function FormBar(props) {
    const [form, setForm] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        setForm(props.dataform)
        setOpen(props.opened)
    }, [])

    return (
        <Grid sx={{ borderTop: '10px solid black', borderRadius: 2 }}>
            <Accordion expanded={open || false}>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{width:'100%'}}>
                    { !open? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px' }}>
                            <Typography variant="h4" sx={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>{form.name}</Typography>
                            <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{form.description}</Typography>
                        </div>) : "" 
                    }
                </AccordionSummary>

                <AccordionDetails>
                    <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                        <TextField  fullWidth={true} placeholder="Form Text" rowsmax={3} multiline={true} value={form.name} variant="standard" sx={{m: 1}} inputProps={{style: {fontSize: 40, padding: "12px 0px 0px 0px", fontFamily: 'sans-serif Roboto'}}} margin="normal"/>
                    </div>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}

export default FormBar;