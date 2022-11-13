import React from "react";
import Navbar from "../../Components/Navbar";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import ProfileCard from "../../Components/ProfileCard";
// import ProfileCard from "../../Components/ProfileCard";
// import UpdateForm from "./components/updateform";

function profile() {
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
                Name: Muhammad Aniq Aqil
                <br />
                Username: aniq
                <br />
                Email:aniq@gmail.com
                <br />
                Phone Number: 0123456789
                <br />
              </Typography>
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
