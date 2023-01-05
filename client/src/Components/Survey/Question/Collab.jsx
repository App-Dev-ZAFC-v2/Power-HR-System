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
import { getAdmins } from '../../../Redux/slices/admin';
import { updateForm } from '../../../Redux/slices/form';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Collab() {
  const [open, setOpen] = React.useState(false);
  const [collabIndex, setCollabIndex] = React.useState([]);
  const [collabFromAdmin, setCollabAdmin] = React.useState([]);
  const [collabToAdmin, setCollabToAdmin] = React.useState([]);
  const dispatch = useDispatch();

  const collabAdmin = useSelector((state) => state.forms.form.collaborator);
  const admins = useSelector((state) => state.admins);
  const form = useSelector((state) => state.forms.form);

  const retrieveAdmins = React.useCallback(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  React.useEffect(() => {
    retrieveAdmins();
  }, [retrieveAdmins]);

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

  React.useEffect(() => {
    if(admins.admin.length === 0){
      return;
    }

    var tempCollabIndex = [];
    var tempCollabAdmin = [];
    for (let i = 0; i < admins?.admin.length; i++) {
      if(collabAdmin.includes(admins.admin[i]._id)){
        tempCollabIndex.push(i);
        tempCollabAdmin.push(admins.admin[i]);
      }
    }
    setCollabIndex(tempCollabIndex);
    setCollabAdmin(tempCollabAdmin);
  }, [admins, collabAdmin]);

  useEffect(() => {
    if(admins.admin.length === 0){
      return;
    }
    var tempCollabToAdmin = [];
    for (let i = 0; i < admins.admin.length; i++) {
      if(admins.admin[i]._id !== form.createdBy){
        tempCollabToAdmin.push(admins.admin[i]);
      }
    }
    setCollabToAdmin(tempCollabToAdmin);
  }, [admins, form.createdBy]);

  React.useEffect(() => {
    if(admins.admin.length === 0){
      return;
    }

    if(collabIndex.length === collabAdmin.length){
      return;
    }


    var tempForm = form;
    tempForm = {
      ...tempForm,
      collaborator: collabFromAdmin.map((admin) => admin._id),
    };
    console.log(tempForm);
    dispatch(updateForm(tempForm));
  }, [collabFromAdmin]);
    
  const handleSelect = (value) => {
    var tempCollabIndex = [];
    var tempCollabAdmin = [];
    for (let i = 0; i < value.length; i++) {
      tempCollabIndex.push(admins.admin.indexOf(value[i]));
      tempCollabAdmin.push(value[i]);
    }
    
    setCollabIndex(tempCollabIndex);
    setCollabAdmin(tempCollabAdmin);
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
            options={collabToAdmin}
            getOptionLabel={(option) => option?.name}
            value={collabFromAdmin}
            getOptionSelected={(option, value) => option._id === value._id}
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

