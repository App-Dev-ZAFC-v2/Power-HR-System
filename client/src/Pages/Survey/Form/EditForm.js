import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addQuestion, editDescription, editName, getFormByID, setOnceForm, setPublished, setRequiredAll, updateForm } from '../../../Redux/slices/form';
import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { Box, Container, LinearProgress, Grid, Accordion, AccordionSummary, AccordionDetails, TextField, Tabs, Tab, Paper, Fab, Typography, Switch} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import QuestionList from '../../../Components/Survey/Question/QuestionList';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



function EditForm(){
    const { id } = useParams();
    const [tab, setTab] = useState(0);

    //Redux
    const form = useSelector(state => state.forms.form);
    const loading = useSelector(state => state.forms.loading);
    const saved = useSelector(state => state.forms.saved);

    const dispatch = useDispatch();

    const retrieveForm = useCallback(() => {
        dispatch(getFormByID(id));
    }, []);

    useEffect(() => {
        retrieveForm();
    }, [retrieveForm]);

    const handleTab = (event, newValue) => {
        setTab(newValue);
    };

    const handleName = (value) => {
        dispatch(editName(value));
    }

    const handleDescription = (value) => {
        dispatch(editDescription(value));
    }

    const handleSave = () => {
        dispatch(updateForm(form));
    }

    const handleAddQuestion = () => {
        var length = form.questions.length;
        var required = form.requiredAll;
        dispatch(addQuestion({length, required}));
    }

    const handleLimit = () => {
        dispatch(setOnceForm(!form.once));
    }

    const handleAllRequired = () => {
        dispatch(setRequiredAll(!form.requiredAll));
    }

    const handlePublished = () => {
        dispatch(setPublished(!form.published));
    }

    const handleDueDateActive = () => {
    }

    const handleDueDate = (e) => {
    }


    return(
        <><Navbar />
        <Box sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: 2 }}>
            <Tabs value={tab} onChange={handleTab} centered>
                <Tab label="Questions" />
                <Tab label="Settings" />
                <Tab label="Responses" disabled />
            </Tabs>
        </Box>
        {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
        <Container>
            {tab === 0?(
                <Grid container direction="column" justify="center" alignItems="center" sx={{ mt: 5, mb:'128px' }}>
                    <Grid item xs={12} sm={5} sx={{ width: '75%' }}>
                        <Grid sx={{ borderTop: '10px solid black', borderRadius: 2 }}>
                            <Accordion expanded={true}>
                                <AccordionSummary aria-controls="panel1a-content" id="formBar" elevation={1} style={{width:'100%'}}>
                                </AccordionSummary>

                                <AccordionDetails sx={{mt:"-48px"}}>
                                    <div style={{display:'flex', width: '100%', flexWrap: "wrap"}}>
                                        <TextField onChange={(e)=>{handleName(e.target.value)}} fullWidth={true} placeholder="Form Text" rowsmax={3} multiline={true} defaultValue={form.name} variant="standard" sx={{m: 1}} inputProps={{style: {fontSize: 40, fontFamily: 'sans-serif Roboto', lineHeight:"50px"}}} margin="normal"/>
                                        <TextField onChange={(e)=>{handleDescription(e.target.value)}} fullWidth={true} placeholder="Form Description" rowsmax={3} multiline={true} defaultValue={form.description} variant="standard" sx={{m: 1}} inputProps={{style: {fontFamily: 'sans-serif Roboto'}}} margin="normal"/>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <QuestionList/>
                    </Grid>
                    <Paper elevation={2} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} >
                        {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
                        <Box sx={{ '& > :not(style)': { m: 1 }}} display="flex" justifyContent="center" alignItems="center">
                            <Fab variant="extended" onClick={() => {handleAddQuestion()}}>
                                <AddIcon sx={{ mr: 1 }} />
                                Add Question
                            </Fab>
                            <Fab variant="extended" onClick={() => {handleSave()}} disabled={saved && true}>
                                <SaveIcon sx={{ mr: 1 }} />
                                {(loading && !saved)? "Saving..." : (saved? "Saved" : "Save")}
                            </Fab>
                        </Box>
                    </Paper>
                </Grid>
            ): ""}
            {tab === 1?(
                <Grid container direction="column" justify="center" alignItems="center" sx={{ mt: 5, mb:'64px' }}>
                    <Grid item xs={12} sm={5} sx={{ width: '75%' }}>
                        <Paper sx={{p:4}}>
                            <Box sx={{pb:4, borderBottom: 1 }}>
                                <Typography variant='h3'>Settings</Typography>
                            </Box>

                            <Box sx={{pl: 4, pt: 4, pb:4, borderBottom: 1 }}>
                                <Typography variant='h6'>Form</Typography>
                                <Typography variant='h7'>Manage form setting</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                                    <Box>
                                        <Typography variant='h6'>Collaborators</Typography>
                                        <Typography variant='h7'>Add others people to edit this form</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                                    <Box>
                                        <Typography variant='h6'>Publish</Typography>
                                        <Typography variant='h7'>Make sure the form are ready to published</Typography>
                                    </Box>
                                    <Box>
                                        <Switch checked={form.published} onChange={() => {handlePublished()}}/>
                                    </Box>
                                </Box>
                            </Box>
                            
                            <Box sx={{pl: 4, pt: 4, pb:4, borderBottom: 1 }}>
                                <Typography variant='h6'>Responses</Typography>
                                <Typography variant='h7'>Manage how responses are collected</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                                    <Box>
                                        <Typography variant='h6'>Limit to 1 response</Typography>
                                    </Box>
                                    <Box>
                                        <Switch checked={form.once} onChange={() => {handleLimit()}}/>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                                    <Box>
                                        <Typography variant='h6'>Accepting responses</Typography>
                                        <Typography variant='h7'>This will turn {!form.published? "on": "off"} publish</Typography>
                                    </Box>
                                    <Box>
                                        <Switch checked={form.published} onChange={() => {handlePublished()}}/>
                                    </Box>
                                </Box>
                                {(form.published)? (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                                    <Box>
                                        <Typography variant='h6'>Accepting responses until</Typography>
                                        {(form.dueDate.active)? (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    value={form.dueDate.date}
                                                    onChange={(e) => {handleDueDate(e)}}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    />
                                            </LocalizationProvider>
                                        ) : ""}
                                        
                                    </Box>
                                    <Box>
                                        <Switch checked={form.dueDate.active} onChange={() => {handleDueDateActive()}}/>
                                    </Box>
                                </Box>
                                ): ""}
                            </Box>

                            <Box sx={{pl: 4, pt: 4}}>
                                <Typography variant='h6'>Question defaults</Typography>
                                <Typography variant='h7'>Settings applied to all new questions</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                                    <Box>
                                        <Typography variant='h6'>Make questions required by default</Typography>
                                    </Box>
                                    <Box>
                                        <Switch checked={form.requiredAll} onChange={() => {handleAllRequired()}}/>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            ): ""}
        </Container></>
    )
}

export default EditForm;