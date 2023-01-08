import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

//Dialog form survey
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//   </Box>
// );

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function BasicCard() {
  const [card, setCard] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nama, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [position, setPosition] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleClickOpen = (name) => {
    setOpen(true);
    setName(name);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data && Array.isArray(res.data)) {
          setCard(res.data);
        }
        // setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <TextField
        label="Filter by employee name"
        value={filter}
        onChange={handleFilterChange}
        style={{ margin: "10px" }}
      />
      {/* <Select
        labelId="position-filter-label"
        id="position-filter"
        value={position}
        onChange={handlePositionChange}
        style={{ margin: "10px" }}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {[...new Set(card.map((item) => item.position))].map((item) => (
          <MenuItem key={item?._id} value={item?.position}>Hello</MenuItem>
        ))}
      </Select> */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {card
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item, index) => {
            
            return (
              <Card
                sx={{
                  maxWidth: 275,
                  minWidth: 275,
                  border: 3,
                  borderColor: "green",
                  backgroundColor: "#D7E9B9",
                  color: "black",
                }}
                style={{ margin: "20px" }}
                hover={{ backgroundColor: "yellow" }}
              >
                <CardContent>
                  {/* <div key={item?.id}>Employee ID: {item?._id}</div> */}
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="h5" component="div" align="center">
                    {item?.name}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    align="center"
                  >
                    {item?.email}
                  </Typography>
                  <Typography variant="body2">
                    <b>Position:</b> {item?.position}
                    <br />
                    <b>Contact:</b> {item?.contact}
                  </Typography>
                </CardContent>
                <CardActions align="center">
                  <Button
                    size="small"
                    onClick={() => handleClickOpen(item?.name)}
                  >
                    Survey Answer
                  </Button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <BootstrapDialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    >
                      Survey answered by {nama}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      <BootstrapDialogTitle
                        id="customized-dialog-title"
                        align="center"
                      >
                        Survey 1
                      </BootstrapDialogTitle>
                      <Typography gutterBottom>
                        <b>Question 1:</b> What is your day?
                      </Typography>
                      <Typography gutterBottom>
                        <b>Answer:</b> Yes, but i dont want to but i feel like
                        it's interesting
                      </Typography>
                    </DialogContent>
                  </BootstrapDialog>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </>
  );
}
