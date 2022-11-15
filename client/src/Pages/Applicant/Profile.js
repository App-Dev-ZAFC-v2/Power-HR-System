import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Modal,
} from "@mui/material";
import ProfileCard from "../../Components/ProfileCard";
import UpdateForm from "./components/updateform";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
};

function profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("authToken");

  // FIND BETTER WAY TO DO THIS
  const userType = JSON.parse(atob(token.split(".")[1])).userType;
  // const userId = JSON.parse(atob(token.split('.')[1])).UserId;
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (userType === 0
      ? axios.get(`http://localhost:5000/applicants/${detailId}/`)
      : axios.get(`http://localhost:5000/employees/${detailId}/`)
    )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12} md={12} mx={10}>
        <Box>
          <ProfileCard />
        </Box>
      </Grid>
      <Grid item xs={12} md={12} mx={10}>
        <Card sx={{ minWidth: 275 }} boxShadow={8}>
          <CardContent>
            <Typography variant="h5" component="div" mt={3}>
              User Profile
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={5}>
              <Typography variant="body">
                Name: {user?.name}
                <br />
                Username: {user?.username}
                <br />
                Email:{user?.email}
                <br />
                Phone Number: {user?.contact}
                <br />
                {user?.position ? `Position: ${user?.position}` : ""}
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Update Profile
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <UpdateForm />
              </Box>
            </Modal>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default profile;
