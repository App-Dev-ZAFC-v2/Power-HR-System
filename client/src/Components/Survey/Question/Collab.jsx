import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin } from '../../../Redux/slices/admin';
import { updateForm } from '../../../Redux/slices/form';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Collab() {
  const [open, setOpen] = React.useState(false);
  const [collabFromAdmin, setCollabAdmin] = React.useState([]);
  const [listAdmin, setlistAdmin] = React.useState([]);
  const [localSave, setLocalSave] = React.useState(true);
  const dispatch = useDispatch();

  const collabAdmin = useSelector((state) => state.forms.form.collaborator);
  const admins = useSelector((state) => state.admins);
  const form = useSelector((state) => state.forms.form);

  

  // React.useEffect(() => {
  //   var tempForm = {...form, collaborator: []};
  //   dispatch(updateForm(tempForm));
  // }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(admins.admin.length === undefined){
      return;
    }

    if(admins.admin.length < 2){
      return;
    }

    var templistAdmin = [];
    for (let i = 0; i < admins.admin.length; i++) {
      if(admins.admin[i]._id !== form.createdBy){
        templistAdmin.push(admins.admin[i]);
      }
    }
    setlistAdmin(templistAdmin);
  }, [admins, form]);

  useEffect(() => {
    if(listAdmin.length === 0){
      return;
    }

    var tempCollabAdmin = [];
    for (let i = 0; i < listAdmin?.length; i++) {
      if(collabAdmin.includes(listAdmin[i]._id)){
        tempCollabAdmin.push(listAdmin[i]);
      }
    }
    setCollabAdmin(tempCollabAdmin);
  }, [listAdmin]);

  

  useEffect(() => {
    if(localSave){
      return;
    }

    var tempForm = form;
    tempForm = {
      ...tempForm,
      collaborator: collabFromAdmin.map((admin) => admin._id),
    };
    dispatch(updateForm(tempForm));
    setLocalSave(true);
  }, [localSave]);

   async function sendNotification(newCollab, message, subject, link){
    var adminNotification = JSON.parse(JSON.stringify(newCollab.notification));
    adminNotification.push({
      message: message,
      subject: subject,
      link: link,
      read: false,
    });
    
    var tempAdmin = {...newCollab, notification: adminNotification};
    dispatch(updateAdmin(tempAdmin))
  }
    
  const handleSelect = async (value) => {
    var tempCollabAdmin = [];
    for (let i = 0; i < value.length; i++) {
      tempCollabAdmin.push(value[i]);
    }

    //If tempCollabAdmin is not in collab admin, then send notification to them to inform them that they have been added as a collaborator
    //If collab admin is not in tempCollabAdmin, then send notification to them to inform them that they have been removed as a collaborator
    for(let i = 0; i < tempCollabAdmin.length; i++){
      if(!collabAdmin.includes(tempCollabAdmin[i]._id)){
        await sendNotification(tempCollabAdmin[i],
          "You have been added as a collaborator to form " + form.name + "",
          "New Collaborator",
          "/form/edit-form/" + form._id);
      }
    }

    for(let i = 0; i < collabAdmin.length; i++){
      if(!tempCollabAdmin.map((admin) => admin._id).includes(collabAdmin[i])){
        var newCollab = admins.admin.find((admin) => admin._id === collabAdmin[i]);
        await sendNotification(newCollab,
          "You have been removed as a collaborator from form " + form.name  + "",
          "Removed Collaborator",
          "/form/edit-form/" + form._id);
      }
    }

    setCollabAdmin(tempCollabAdmin);
    setLocalSave(false);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {collabAdmin.length === 0 ? "Add people" : collabAdmin.length + " people"}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen={fullScreen}
        maxWidth={'xl'}
      >
        <DialogTitle>Collaboration</DialogTitle>
        <DialogContent>
        <Autocomplete
            multiple
            limitTags={4}
            id="multiple-limit-tags"
            options={listAdmin}
            getOptionLabel={(option) => option?.name}
            value={collabFromAdmin}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, value) => handleSelect(value)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search" />
            )}
            sx={{ width: '500px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

