import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../../Components/Navbar";
import { Container, Typography, Card, CardContent } from "@mui/material";

function ViewApplication() {
  const applicantId = JSON.parse(
    atob(localStorage.getItem("authToken").split(".")[1])
  ).detailId;
  const [Applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/applications/byapplicant/${applicantId}`)
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          View Applications
        </Typography>
        {Applications.map((application) => (
          <Card key={application?._id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {application?.job?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {application?.applicationStatus}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default ViewApplication;
