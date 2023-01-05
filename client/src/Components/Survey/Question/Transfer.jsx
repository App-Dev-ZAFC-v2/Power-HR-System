import React, { useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";
import { getAdmins, updateAdmin } from '../../../Redux/slices/admin';
import { getFormByID, updateForm } from '../../../Redux/slices/form';
import { useParams } from 'react-router-dom';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function Transfer() {
  const {id} = useParams();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const form = useSelector((state) => state.forms.form);
  const collabAdmin = useSelector((state) => state.forms.form.collaborator);

  const retrieveAdmins = useCallback(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  useEffect(() => {
    retrieveAdmins();
  }, [retrieveAdmins]);

  useEffect(() => {
    var tempLeft = [];
    var tempRight = [];
    if(admins.admin.length === 0){
      return;
    }
    if(collabAdmin.length === 0){
      for (let i = 0; i < admins.admin.length; i++) {
        if(admins.admin[i]._id !== form.createdBy)
          tempLeft.push(i);
      }
      setLeft(tempLeft);
      return;
    }

    for (let i = 0; i < admins.admin.length; i++) {
      if(admins.admin[i]._id !== form.createdBy){
        if(!collabAdmin.includes(admins.admin[i]._id)){
          tempLeft.push(i);
        }
        else{
          tempRight.push(i);
        }
      }
    }
    setLeft(tempLeft);
    setRight(tempRight);
    
  }, [admins, collabAdmin]);

  useEffect(() => {
    // if (right.length === 0 || right.length === collabAdmin.length) {
    //   return;
    // }
    // var tempCollab = [];
    // for (let i = 0; i < right.length; i++) {

    //   tempCollab.push(admins.admin[right[i]]._id);
    // }
    // dispatch(updateForm({...form, collaborator: tempCollab}));

    if(right.length === 0 && left.length === 0){
      return;
    }

    if(right.length === collabAdmin.length){
      return;
    }

    var tempCollab = [];
    if(right.length === 0){
      dispatch(updateForm({...form, collaborator: tempCollab}));
      return;
    }

    for (let i = 0; i < right.length; i++) {
      tempCollab.push(admins.admin[right[i]]._id);
    }
    dispatch(updateForm({...form, collaborator: tempCollab}));
    
  }, [right, left]);
  
  

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card sx={{width: "500px"}}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={admins.admin[value].name} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  );
}