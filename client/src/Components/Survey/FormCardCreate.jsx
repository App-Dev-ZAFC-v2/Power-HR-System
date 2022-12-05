import { useState } from 'react'
import Card from '@mui/material/Card';
import { Grid, Box, CardActionArea, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField} from '@mui/material';
import formAPI from "../../API/form";
import icon from "../../Assets/addIcon.png";


function FormCardCreate() {
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const token = localStorage.getItem("authToken");
    const adminId = JSON.parse(atob(token.split(".")[1])).detailId;

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormTitle("");
        setFormDescription("");
    };

    const createForm = () =>{
        var form = {
            createdBy: adminId,
            name : formTitle,
            description: ((formDescription === "")? "No description" : formDescription)
        }
        
        if(form.name !==""){
            formAPI.createForm(form).then((newForm) => {
                window.open('/admin/edit-form/' + newForm._id);
            })
            handleClose();
        }
      }

    return (
              <Grid item  xs={12} sm={6} md={3} >
                    <Card sx={{ height: 308.34}}>
                        <CardActionArea sx={{p:0, m:0, height: 308.34}} onClick={handleClickOpen}>
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
                                <Box component="img" src={icon} height={64}/>
                            </Box>
                        </CardActionArea>
                    </Card>
                    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" fullWidth>
                            <DialogTitle id="responsive-dialog-title">
                                Create new form
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <TextField id="Name" label="Name" variant="outlined" margin="normal" fullWidth required
                                    value={formTitle} onChange={(e)=>{setFormTitle(e.target.value)}}/>
                                </DialogContentText>
                                <DialogContentText>
                                    <TextField id="Description" label="Description" variant="outlined" margin="normal" fullWidth
                                    value={formDescription} onChange={(e)=>{setFormDescription(e.target.value)}}/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button onClick={createForm} autoFocus>
                                    Create
                                </Button>
                            </DialogActions>
                    </Dialog>
                </Grid>            
        
    )
}

export default FormCardCreate;