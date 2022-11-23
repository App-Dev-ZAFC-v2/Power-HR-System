import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import {
  Grid,
  Typography,
  // Box,
  // Card,
  // CardActions,
  // CardContent,
  // Button,
  // TextField,
  // FormHelperText,
} from "@mui/material";

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
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Profile Username Change
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default ProfileUsername;
