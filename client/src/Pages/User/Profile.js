import React, { useState, useEffect } from "react";
// import Navbar from "../../Components/Navbar";
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
  CardMedia,
} from "@mui/material";
import { DashboardLayout } from "../../Components/Applicant/Dashboard/dashboard-layout";
import photo from "../../Assets/default.png";
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
      ? axios.get(`https://powerhr-server.azurewebsites.net/applicants/${detailId}/`)
      : axios.get(`https://powerhr-server.azurewebsites.net/employees/${detailId}/`)
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
      .put(`https://powerhr-server.azurewebsites.net/applicants/${detailId}/`, user, {
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
    <>
      <DashboardLayout tab="Profile">
        <Grid container>
          {/* <Grid item xs={12}></Grid> */}
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <Grid
                container
                mt={5}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      minWidth: 800,
                      boxShadow: 8,
                      borderRadius: 3,
                      padding: 4,
                    }}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            User profile
                          </Typography>
                          <Box
                            mt={3}
                            ml={6}
                            display="flex"
                            alignItems="center"
                            justify="center"
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                              }}
                              image={photo}
                              alt="green iguana"
                            />
                          </Box>
                        </CardContent>
                      </Grid>
                      <Grid item xs={6}>
                        <CardContent>
                          <Typography
                            sx={{ mb: 1.5 }}
                            color="text.secondary"
                            mt={3}
                          >
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
                                fullWidth
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
                                fullWidth
                              />
                            </Box>
                            <Box>
                              <TextField
                                id="outlined-flexible-read-only-input"
                                label="Resume link"
                                margin="normal"
                                defaultValue={"https://resume.com/"}
                                InputProps={{
                                  readOnly: isRead,
                                }}
                                onChange={(e) => {
                                  setUser({ ...user, resume: e.target.value });
                                }}
                                fullWidth
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
                      </Grid>
                    </Grid>
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
                      {/* <Link href="/profile/update-username">
                      <Button variant="contained" color="primary">
                        Update Username
                      </Button>
                    </Link> */}
                    </Box>
                  </Grid>
                  {/* <Grid item xs={6}>
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
                </Grid> */}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default Profile;
