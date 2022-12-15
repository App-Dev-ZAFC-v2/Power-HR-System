import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../../Components/Navbar";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Grid,
} from "@mui/material";

//create a function where it calculate the number of days between the application date and today's date
//if the number of days is less than 7, then the application is still active
//if the number of days is more than 7, then the application is no longer active
function Duration(applicationDate) {
  var today = new Date();
  var date = new Date(applicationDate);
  var diff = Math.abs(today - date);
  var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
}

function ViewApplication() {
  const applicantId = JSON.parse(
    atob(localStorage.getItem("authToken").split(".")[1])
  ).detailId;
  const [Applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/applications/byapplicant/${applicantId}`)
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom my={5}>
          View Applications
        </Typography>
        <Grid container spacing={3}>
          {Applications.map((application) => (
            <Card
              key={application?._id}
              sx={{
                maxWidth: 345,
                boxShadow: 10,
                borderRadius: 3,
                padding: 1,
                margin: 1,
                width: "100%",
              }}
              my={2}
            >
              <CardActionArea>
                <CardHeader
                  title={application?.job?.name}
                  subheader="Company Name"
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {application?.job?.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {Duration(application?.applicationDate)} days ago
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Status : {application?.applicationStatus}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ViewApplication;
