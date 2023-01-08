import React from "react";
// import Navbar from "../../Components/Navbar";
import ProfileCard from "../../Components/ProfileCard";
import Welcome from "../../Components/Welcome";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Button, Grid } from "@mui/material";
import feedback from "../../Assets/feedback.png";
import { DashboardLayout } from "../../Components/Employee/Dashboard/dashboard-layout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "white",
  ...theme.typography.h4,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

function EmployeeDashboard() {
  return (
    <>
      <DashboardLayout tab="Dashboard">
        <Container maxWidth="lg">
          <Grid
            container
            spacing={5}
            mt={0}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Grid item xs={4} sx={{ display: { xs: "none", md: "flex" } }}>
              <ProfileCard />
            </Grid>
            <Grid item xs>
              <Welcome />
            </Grid>
          </Grid>
        </Container>
      </DashboardLayout>
    </>
  );
}

export default EmployeeDashboard;
