import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import photo from "../../Assets/BackgroundProfile/Cloudy.png";
import formAPI from "../../API/form";


function FormCard(props) {
    const [form, setForm] = useState({});

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteForm = () => {
        try {
            formAPI.deleteForm(props.dataform._id);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(()=>{
        setForm(props.dataform)
    }, [props.dataform])

    return (
              <Grid item  xs={12} sm={6} md={3}>
                    <Card>
                    <CardActionArea onClick={() => window.location = '/form/edit-form/' + form._id}>
                        <CardMedia
                        component="img"
                        height="140"
                        image={photo}
                        alt={form.name}
                        />
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
                        <Button size="small" color="primary" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
                            Delete
                        </Button>
                        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                            <DialogTitle id="responsive-dialog-title">
                            Delete {form.name}?
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Do you really want to delete these form? This process cannot be undone
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={deleteForm} autoFocus>
                                Delete
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
                    </Card>
                </Grid>            
        
    )
}

export default FormCard;