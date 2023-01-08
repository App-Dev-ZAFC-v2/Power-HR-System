import {Box, Button, Card, CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme, Container, TextField, LinearProgress, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import photo from "../../../Assets/BackgroundProfile/Cloudy.png";
import icon from "../../../Assets/addIcon.png";
import Navbar from "../../../Components/Navbar";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm, createForm, getFormsByUser, getFormsByCollaborator } from "../../../Redux/slices/form";
import { getAdmins } from "../../../Redux/slices/admin";
import { DashboardLayout } from "../../../Components/Admin/Dashboard/dashboard-layout";

const ManageForms = () => {
    //Media Query
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //Initial Form State
    const initalFormState = {
        createdBy: "",
        name: "",
        description: "",
        questions: [{
            questionText: "Untitled Question 1",
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}],
        }],
        once: false,
    };

    //useState
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [cform, setForm] = useState(initalFormState);
    const [indexDelete, setIndexDelete] = useState(0);

    //Get Admin ID
    const token = localStorage.getItem("authToken");
    const adminId = JSON.parse(atob(token.split(".")[1])).detailId;

    //Redux
    const forms = useSelector(state => state.forms.form);
    const formsCollab = useSelector(state => state.forms.formsCollab);
    const loading = useSelector(state => state.forms.loading);
    const admins = useSelector((state) => state.admins);
    const dispatch = useDispatch();
    

    const retrieveUserForms = useCallback(() => {
        dispatch(getFormsByUser(adminId));
    }, [dispatch, adminId]);

    useEffect(() => {
        retrieveUserForms();
    }, [retrieveUserForms]);

    const retrieveFormsCollab = useCallback(() => {
        dispatch(getFormsByCollaborator(adminId));
    }, [dispatch, adminId]);

    useEffect(() => {
        retrieveFormsCollab();
    }, [retrieveFormsCollab]);

    const retrieveAdmins = useCallback(() => {
        dispatch(getAdmins());
      }, [dispatch]);
    
      useEffect(() => {
        retrieveAdmins();
      }, [retrieveAdmins]);

    const deleteSingleForm = (formid) => {
        dispatch(deleteForm(formid))
        .unwrap()
        .then(() => {
            handleClose("delete");
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        setForm(cform => ({...cform, createdBy: adminId}));
    }, [adminId]);
    

    const newForm = () => {
        const { createdBy, name, description, questions, once } = cform;
        if(name !==""){
            dispatch(createForm({ createdBy, name, description, questions, once }))
            .unwrap()
            .then(data => {
                window.open('/form/edit-form/' + data._id);
            })
            .catch(err => {
                console.log(err);
            });
            handleClose("create");
        }
    };

    //Function
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...cform, [name]: value });
    };

    const handleClickOpen = (value, index) => {
        if(value === "delete"){
            setIndexDelete(index);
            setOpenDelete(true);
        }
        else
            setOpenCreate(true);
    };

    const handleClose = (value) => {
        if(value === "delete")
            setOpenDelete(false);
        else{
            setOpenCreate(false);
            setForm({...initalFormState, createdBy: adminId});
        }
    };

    

    return (
        <><DashboardLayout tab="Manage Form">
            {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
            <Container maxWidth="lg">
            <Grid container spacing={6} sx={{ mt: 0 }}>
                <Grid item  xs={12} sm={6} md={3} >
                    {/* <Card sx={{ height: 308.34}}>
                        <CardActionArea sx={{p:0, m:0, height: 308.34}} onClick={() => handleClickOpen("create")}>
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
                                <Box component="img" src={icon} height={64}/>
                            </Box>
                        </CardActionArea>
                    </Card> */}
                    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}} onClick={() => handleClickOpen("create")}>
                        <Paper elevation={12} sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Box component="img" src={icon} height={64}/>
                        </Paper>
                    </Box>
                    <Dialog fullScreen={fullScreen} open={openCreate} onClose={() => handleClose("create")} aria-labelledby="responsive-dialog-title" fullWidth>
                            <DialogTitle id="responsive-dialog-title">
                                Create new form
                            </DialogTitle>
                            <DialogContent>
                                <div>
                                    <TextField id="name" name="name" label="name" variant="outlined" margin="normal" fullWidth required
                                    value={cform.name || ""} onChange={handleInputChange}/>
                                </div>
                                <div>
                                    <TextField id="description" name="description" label="description" variant="outlined" margin="normal" fullWidth
                                    value={cform.description || ""} onChange={handleInputChange}/>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => handleClose("create")}>
                                    Cancel
                                </Button>
                                <Button onClick={newForm} autoFocus>
                                    Create
                                </Button>
                            </DialogActions>
                    </Dialog>
                </Grid>
                {forms?.map((form, index) => (
                    <><Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={12} sx={{height: "100%"}}>
                            <CardActionArea key={index} onClick={() => window.location = '/form/edit-form/' + form._id}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={photo}
                                    alt={form.name} />
                                <CardContent>
                                    <Typography sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                    }} gutterBottom variant="body1" component="div">
                                        {form.name}
                                    </Typography>
                                    <Typography sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                    }} variant="body2" color="text.secondary" height={60}>
                                        {form.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" startIcon={<DeleteIcon />} onClick={() => handleClickOpen("delete", index)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    </>
                ))}

                {formsCollab?.map((form, index) => (
                    <><Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardActionArea onClick={() => window.location = '/form/edit-form/' + form._id}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={photo}
                                    alt={form.name} />
                                <CardContent>
                                    <Typography sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                    }} gutterBottom variant="body1" component="div">
                                        {form.name}
                                    </Typography>
                                    <Typography sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                    }} variant="body2" color="text.secondary" height={60}>
                                        {form.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Box sx={{p:"5px"}}>
                                    <Typography variant="body2" color="text.secondary">
                                        Collaboration with {admins.admin.find(admin => admin._id === form.createdBy)?.name}
                                    </Typography>
                                </Box>
                            </CardActions>
                        </Card>

                    </Grid>
                    </>
                ))}
            </Grid>
            <Dialog fullScreen={fullScreen} open={openDelete} onClose={() => handleClose("delete")} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Delete {forms[indexDelete]?.name}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete these form? This process cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClose("delete")}>
                        Cancel
                    </Button>
                    <Button onClick={() => deleteSingleForm(forms[indexDelete]?._id)} autoFocus>
                        Delete {forms[indexDelete]?.name}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container></DashboardLayout></>
    )

}

export default ManageForms;