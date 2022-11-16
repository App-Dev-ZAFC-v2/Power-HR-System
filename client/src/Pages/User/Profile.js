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
  FormHelperText,
} from "@mui/material";

import axios from "axios";

function Profile() {
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
      .put(`http://localhost:5000/applicants/${detailId}/`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsRead(true);
        return setSuccess({
          ...success,
          fetchSuccess: true,
          fetchSuccessMsg: "Profile updated successfully",
        });
      })
      .catch((err) => {
        return setError({
          ...error,
          fetchError: true,
          fetchErrorMsg: err.response.data.message,
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
                  User Profile
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={3}>
                  <Box>
                    <TextField
                      id="outlined-read-only-input"
                      label="Name"
                      defaultValue={user?.name}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="outlined-flexible-read-only-input"
                      label="Email"
                      defaultValue={user?.email}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
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
                      defaultValue={user?.contact}
                      margin="normal"
                      InputProps={{
                        readOnly: isRead,
                      }}
                      onChange={(e) => {
                        setUser({ ...user, contact: e.target.value });
                      }}
                    />
                  </Box>
                  {user.position && (
                    <Box>
                      <TextField
                        id="outlined-read-only-input"
                        label="Position"
                        defaultValue={user?.position}
                        margin="normal"
                        InputProps={{
                          readOnly: isRead,
                        }}
                      />
                    </Box>
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                {userType === 0 && (
                isRead ? (
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: "blue",
                    }}
                    onClick={() => setIsRead(false)}
                  >
                    Update Profile
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
                )
                )}
                {success.fetchSuccess && (
                  <FormHelperText error contained variant="filled">
                    {success.fetchSuccessMsg}
                  </FormHelperText>
                )}
                {error.fetchError && (
                  <FormHelperText error contained variant="filled">
                    {error.fetchErrorMsg}
                  </FormHelperText>
                )}
              </CardActions>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Profile;
