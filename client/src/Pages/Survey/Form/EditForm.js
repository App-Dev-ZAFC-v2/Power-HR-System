import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addQuestion, getFormByID, setSaving, updateForm } from '../../../Redux/slices/form';
import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { Box, Container, Grid, Accordion, AccordionSummary, AccordionDetails, TextField, Tabs, Tab, Paper, Fab, Typography, Switch, Icon, IconButton, AvatarGroup, Avatar, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import QuestionList from '../../../Components/Survey/Question/QuestionList';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import ErrorIcon from '@mui/icons-material/Error';
import Collab from '../../../Components/Survey/Question/Collab';
import Response from '../../../Components/Survey/Response/Response';
import { getAdmins } from '../../../Redux/slices/admin';


function EditForm(){
    const { id } = useParams();
    const token = localStorage.getItem("authToken");
    const adminId = JSON.parse(atob(token.split(".")[1])).detailId;
    //Redux
    const rform = useSelector(state => state.forms.form);
    // const loading = useSelector(state => state.forms.loading);
    const saved = useSelector(state => state.forms.saved);

    const dispatch = useDispatch();

    const retrieveForm = useCallback(() => {
        dispatch(getFormByID(id));
    }, [dispatch]);

    useEffect(() => {
        retrieveForm();
    }, [retrieveForm]);

    const retrieveAdmins = useCallback(() => {
        dispatch(getAdmins());
      }, [dispatch]);
    
    useEffect(() => {
        retrieveAdmins();
    }, [retrieveAdmins]);
    
    const [tab, setTab] = useState(0);
    const [form, setForm] = useState([]);
    const [user, setUser] = useState([]);
    const [permission, setPermission] = useState(false);
    const [localSave, setLocalSave] = useState(true);

    


    useEffect(() => {
        if(form !== "" && form !== rform)
            setForm(rform);
    }, [rform]);

    // useEffect(() => {
    //     if(saved !== "" && saved !== rsaved)
    //         setSaved(rsaved);
    // }, [rsaved]);

    //set permission if user is owner or collaborator
    useEffect(() => {
        if(rform.length !== 0){
            if(rform.createdBy === adminId){
                setPermission(true);
            }
            else{
                rform?.collaborator.forEach(collab => {
                    if(collab === adminId){
                        setPermission(true);
                    }
                });
            }
        }
    }, [rform]);

    const handleTab = (event, newValue) => {
        // window.history.replaceState(null, null, `/form/edit-form/${id}/${newValue}`);
        setTab(newValue);
    };

    const handleName = (value) => {
        if(saved === "SAVED"){
            dispatch(setSaving());
        }

        setForm({...form, name: value});
        setLocalSave(false);
    }

    const handleDescription = (value) => {
        if(saved === "SAVED"){
            dispatch(setSaving());
        }
        setForm({...form, description: value});
        setLocalSave(false);
    }

    useEffect(() => {
        if((form !== "" && form !== rform) || (saved === "SAVING" && localSave === false || saved === "FAILED" && localSave === false)){
            const getData = setTimeout(() => {
            dispatch(updateForm(form));
            if(saved !== "FAILED")
                setLocalSave(true);
            }, 2000)
            return () => clearTimeout(getData)
        }
      }, [form, dispatch, rform, saved]);

    const handleAddQuestion = () => {
        if(saved === "SAVED"){
            dispatch(setSaving());
        }

        // var tempQuestions = JSON.parse(JSON.stringify(form.questions));
        // tempQuestions.push({
        //     questionText: "Untitled Question " + (tempQuestions.length + 1),
        //     questionType: "Multiple Choice",
        //     questionImage: "",
        //     required: false,
        //     options: [{optionText: "Option 1", optionImage: ""}],
        //     openView: true,
        // })

        // setForm({...form, questions: tempQuestions});
        
        var length = form.questions.length;
        var required = form.requiredAll;
        dispatch(addQuestion({length, required}));
        setLocalSave(false);
    }

    const handleLimit = () => {
        if(saved === "SAVED"){
            dispatch(setSaving());
        }
        setForm({...form, once: !form.once});
        setLocalSave(false);
    }

    const handleAllRequired = () => {
        if(saved === "SAVED"){
            dispatch(setSaving());
            
        }
        
        if(!form.requiredAll === true){
            var formTemp = JSON.parse(JSON.stringify(form));
            formTemp.requiredAll = !form.requiredAll;
            //set all question required to true
            formTemp.questions.forEach(question => {
                question.required = true;
            });
            setForm(formTemp);
        }
        else{
            setForm({...form, requiredAll: !form.requiredAll});
        }
        setLocalSave(false);
    }

    const handlePublished = () => {
        if(saved === "SAVED"){
            dispatch(setSaving());
            
        }
        if(!form.published === false){
            var date = {
                active: false,
                date: "",
            }
            setForm({...form, published: !form.published, dueDate: date});
        }
        else
            setForm({...form, published: !form.published});

        setLocalSave(false);
    }

    const handleDueDateActive = () => {
        if(saved === "SAVED"){
            dispatch(setSaving());
        }
        var date ={
            active: !form.dueDate.active,
            date: dayjs(),
        }
        setForm({...form, dueDate: date});

        setLocalSave(false);
    }

    const handleDueDate = (e) => {
        if(saved === "SAVED"){
            setLocalSave(false);
        }
        setForm({...form, dueDate: e});
        setLocalSave(false);
    }

    function HandleAvatar(){
        return user.map((u) => (
            <Tooltip title={u.name}>
                <Avatar key={u.name} alt={u.name} src={u.avatar} />
            </Tooltip>
        ));
    }   

    // const handleSave = () => {
    //     if(saved === "SAVED"){
    //         dispatch(setSaving());
    //         setLocalSave(false);
    //     }
    //     dispatch(updateForm(rform));
    // }


    return(
        <>
        <Navbar />
        {(permission === false && rform.length !== 0) ?
        (<>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', pt: 2}} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box style={{display: 'flex', marginRight: "24px", marginLeft: "24px"}}>
                <ErrorIcon sx={{mr: 1}} />
                <Typography variant="subtitle1">You don't have permission to edit this form</Typography>
            </Box>
        </Box>
        </>) : ""}



        {(permission === true)?
        (<>
        <div style={{position: "-webkit-sticky", position: "sticky", top: 0, zIndex: 1}}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', pt: 2}} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box style={{display: 'flex', marginRight: "24px", marginLeft: "24px"}}>
                {(saved === "SAVING")? 
                (<Box style={{ display: 'flex', alignItems: "center"}}><BackupRoundedIcon sx={{mr: 1}} /><Typography variant="subtitle1">Saving...</Typography></Box>) : ""}
                {(saved === "SAVED")?
                (<Box style={{ display: 'flex', alignItems: "center"}}><CloudDoneRoundedIcon sx={{mr: 1}} /><Typography variant="subtitle1">Saved</Typography></Box>) : ""}
                {(saved === "FAILED")?
                (<Box style={{ display: 'flex', alignItems: "center"}}><ErrorIcon sx={{mr: 1}} /><Typography variant="subtitle1">Save unsuccessfully</Typography></Box>) : ""}
            </Box>
            <Box>
                <AvatarGroup max={4} sx={{'& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 }}}>
                    <HandleAvatar/>
                </AvatarGroup>
            </Box>
        </Box>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 0px 0px rgb(0 0 0 / 12%)" }}>
            <Tabs value={tab} onChange={handleTab} centered>
                <Tab label="Questions" />
                <Tab label="Preview" />
                <Tab label="Settings" />
                <Tab label="Responses"/>
            </Tabs>
        </Box>
        </div>
        {/* {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>} */}
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
                        {/* {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>} */}
                        <Box sx={{ '& > :not(style)': { m: 1 }}} display="flex" justifyContent="center" alignItems="center">
                            <Fab variant="extended" onClick={() => {handleAddQuestion()}}>
                                <AddIcon sx={{ mr: 1 }} />
                                Add Question
                            </Fab>
                            {/* <Fab variant="extended" onClick={() => {handleSave()}} disabled={saved && true}>
                                <SaveIcon sx={{ mr: 1 }} />
                                {(!saved)? "Saving..." : (saved? "Saved" : "Save")}
                            </Fab> */}
                        </Box>
                    </Paper>
                </Grid>
            ): ""}
            {tab === 1? "": ""}
            {tab === 2?(
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
                                        <Collab/>
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
                                                    onChange={(e) => {handleDueDate(e.target.value)}}
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
            {tab === 3?(
                <Response/>
            ): ""}
        </Container>
        
        </>) : ""}
        </>
    )
}

export default EditForm;