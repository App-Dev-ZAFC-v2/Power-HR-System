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
  TextField,
} from "@mui/material";
import ProfileCard from "../../Components/ProfileCard";
import UpdateForm from "./components/updateform";
import axios from "axios";

function profile() {
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <Box>
                <TextField
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue={user.name}
                  // value={user?.name}
                  margin="normal"
                  InputProps={{
                    readOnly: false,
                  }}
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-flexible-read-only-input"
                  label="Email"
                  // defaultValue={`${user.email}`}
                  // value={user?.email}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-read-only-input"
                  label="Contact Number"
                  defaultValue="Hello World"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Update Profile</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default profile;
