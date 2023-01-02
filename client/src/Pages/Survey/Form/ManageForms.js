import {Box, Button, Card, CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme, Container, TextField, LinearProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import photo from "../../../Assets/BackgroundProfile/Cloudy.png";
import icon from "../../../Assets/addIcon.png";
import Navbar from "../../../Components/Navbar";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForms, deleteForm, createForm } from "../../../Redux/slices/form";

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
            questionText: "Untitled Question",
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}],
            openView: false,
        }],
        once: false,
    };

    //useState
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [cform, setForm] = useState(initalFormState);

    //Get Admin ID
    const token = localStorage.getItem("authToken");
    const adminId = JSON.parse(atob(token.split(".")[1])).detailId;

    //Redux
    const forms = useSelector(state => state.forms.form);
    const loading = useSelector(state => state.forms.loading);
    const dispatch = useDispatch();

    const retrieveForms = useCallback(() => {
        dispatch(getForms());
    }, []);

    useEffect(() => {
        retrieveForms();
    }, [retrieveForms]);

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

    const newForm = () => {
        const { createdBy, name, description, questions, once } = cform;
        if(name !==""){
            dispatch(createForm({ adminId, name, description, questions, once }))
            .unwrap()
            .then(data => {
                window.open('/form/edit-form/' + data._id);
            })
            .catch(err => {
                console.log(err);
            });
            setForm(initalFormState);
            handleClose("create");
        }
    };

    //Function
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...cform, [name]: value });
    };

    const handleClickOpen = (value) => {
        if(value === "delete")
            setOpenDelete(true);
        else
            setOpenCreate(true);
    };

    const handleClose = (value) => {
        if(value === "delete")
            setOpenDelete(false);
        else{
            setOpenCreate(false);
            setForm(initalFormState);
        }
    };

    

    return (
        <><Navbar />
            {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h2">Manage Forms</Typography>
            <Grid container spacing={6} sx={{ mt: 0 }}>
                {forms.map((form, index) => (
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
                                <Button size="small" color="primary" startIcon={<DeleteIcon />} onClick={() => handleClickOpen("delete")}>
                                    Delete
                                </Button>
                                <Dialog fullScreen={fullScreen} open={openDelete} onClose={() => handleClose("delete")} aria-labelledby="responsive-dialog-title">
                                    <DialogTitle id="responsive-dialog-title">
                                        Delete {form.name}?
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
                                        <Button onClick={() => deleteSingleForm(form._id)} autoFocus>
                                            Delete {form.name}
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </CardActions>
                        </Card>

                    </Grid>
                    </>
                ))}
                <Grid item  xs={12} sm={6} md={3} >
                        <Card sx={{ height: 308.34}}>
                            <CardActionArea sx={{p:0, m:0, height: 308.34}} onClick={() => handleClickOpen("create")}>
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
                                    <Box component="img" src={icon} height={64}/>
                                </Box>
                            </CardActionArea>
                        </Card>
                        <Dialog fullScreen={fullScreen} open={openCreate} onClose={() => handleClose("create")} aria-labelledby="responsive-dialog-title" fullWidth>
                                <DialogTitle id="responsive-dialog-title">
                                    Create new form
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <TextField id="name" name="name" label="name" variant="outlined" margin="normal" fullWidth required
                                        value={cform.name || ""} onChange={handleInputChange}/>
                                    </DialogContentText>
                                    <DialogContentText>
                                        <TextField id="description" name="description" label="description" variant="outlined" margin="normal" fullWidth
                                        value={cform.description || ""} onChange={handleInputChange}/>
                                    </DialogContentText>
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
            </Grid>
        </Container></>
    )

}

export default ManageForms;