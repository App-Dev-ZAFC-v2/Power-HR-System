import {useEffect, useState} from "react";
import ProfileCard from "../../Components/Dashboard/ProfileCard";
import Welcome from "../../Components/Dashboard/Welcome";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { DashboardLayout } from '../../Components/Admin/Dashboard/dashboard-layout.js';

function AdminDashboard() {
    const [hour, setHour] = useState(0);

    useEffect(() => {
        const date = new Date();
        setHour(date.getHours());
    }, []);
    return (
        <DashboardLayout tab="Dashboard">
        <Container maxWidth="lg">
          <Grid container spacing={2} mt={3} mb={3}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                {hour < 12 && "Good Morning"}
                {hour >= 12 && hour < 17 && "Good Afternoon"}
                {hour >= 17 && "Good Evening"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Welcome />
            </Grid>
            <Grid item md={4} sm={5} xs={12}>
              <ProfileCard />
            </Grid>
          </Grid>
        </Container>
      </DashboardLayout>
    )
    }

export default AdminDashboard;