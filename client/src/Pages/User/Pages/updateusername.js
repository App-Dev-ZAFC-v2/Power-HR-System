import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Old Components/Navbar";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import Link from "@mui/material/Link";

import axios from "axios";

function ProfileUsername() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);
  const [isRead, setIsRead] = useState(true);

  const [error, setError] = useState({
    fetchError: false,
    fetchErrorMsg: "",
  });

  const [success, setSuccess] = useState({
    fetchSuccess: false,
    fetchSuccessMsg: "",
  });

  // FIND BETTER WAY TO DO THIS
  const userType = JSON.parse(atob(token.split(".")[1])).userType;
  const userId = JSON.parse(atob(token.split(".")[1])).UserId;
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;
  // eslint-disable-next-line react-hooks/rules-of-hooks

  useEffect(() => {
    axios
      .get(`https://powerhr-server.azurewebsites.net/users/username/${userId}/`)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://powerhr-server.azurewebsites.net/users/updateusername/${userId}/`, user)
      .then((res) => {
        setSuccess({
          fetchSuccess: true,
          fetchSuccessMsg: "Username Updated Successfully",
        });
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
        setError({
          fetchError: true,
          fetchErrorMsg: "Username Update Failed",
        });
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Grid
            container
            mt={5}
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Card
              sx={{ minWidth: 300, boxShadow: 8, borderRadius: 3, padding: 4 }}
            >
              <CardContent>
                <Typography variant="h5" component="div" mt={3}>
                  Update Username
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={3}>
                  <Box>
                    <TextField
                      id="outlined-read-only-input"
                      label="Username"
                      defaultValue={user?.username}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                      onChange={(e) => {
                        setUser({ ...user, username: e.target.value }); // this is the line that is causing the error
                      }}
                    />
                  </Box>
                </Typography>
              </CardContent>
              <CardActions>
                {userType === 0 &&
                  (isRead ? (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "blue",
                      }}
                      onClick={() => setIsRead(false)}
                    >
                      Update Username
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => refreshPage()}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                      >
                        Submit Update
                      </Button>
                    </>
                  ))}
                <Grid>
                  {success.fetchSuccess && (
                    <FormHelperText
                      severity="success"
                      contained
                      variant="filled"
                    >
                      {success.fetchSuccessMsg}
                    </FormHelperText>
                  )}
                  {error.fetchError && (
                    <FormHelperText error contained variant="filled">
                      {error.fetchErrorMsg}
                    </FormHelperText>
                  )}
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid container mt={2} rowSpacing={1} direction="row">
            <Grid item xs={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                ml={55}
              >
                <Link href="/profile">
                  <Button variant="contained" color="primary">
                    Update Profile
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={55}
              >
                <Link href="/profile/update-password">
                  <Button variant="contained" color="primary">
                    Update Password
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default ProfileUsername;
