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

function ProfilePassword() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState();
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
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const userid = JSON.parse(atob(token.split(".")[1])).UserId;

  // useEffect(() => {
  //   (userType === 0
  //     ? axios.get(`https://powerhr-server.azurewebsites.net/applicants/${detailId}/`)
  //     : axios.get(`https://powerhr-server.azurewebsites.net/employees/${detailId}/`)
  //   )
  //     .then((res) => {
  //       setUser(res.data);
  //       console.log(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function refreshPage() {
    window.location.reload();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    axios
      .post(`https://powerhr-server.azurewebsites.net/users/changepassword`, password, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
        console.log(err);
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
      {/* {isLoading ? (
        "Loading..."
      ) : ( */}
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
                Update Password
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" mt={3}>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Old Password"
                    type="password"
                    value={password?.oldpassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        oldpassword: e.target.value,
                      })
                    }
                    InputProps={{
                      readOnly: isRead,
                    }}
                    variant="outlined"
                    fullWidth
                    mt={3}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="New Password"
                    type="password"
                    value={password?.newpassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        newpassword: e.target.value,
                      })
                    }
                    InputProps={{
                      readOnly: isRead,
                    }}
                    variant="outlined"
                    fullWidth
                    mt={3}
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
                  <FormHelperText severity="success" contained variant="filled">
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
              <Link href="/profile">
                <Button variant="contained" color="primary">
                  Update Profile
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </>
      {/* )} */}
    </Grid>
  );
}

export default ProfilePassword;
