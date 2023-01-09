// import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Old Components/Navbar";
import { Container, Grid, Typography } from "@mui/material";
import FormFeedback from "../../Components/Executive/FormFeedback";
import { DashboardLayout } from "../../Components/Executive/Dashboard/dashboard-layout";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getFormsByPublished } from "../../Redux/slices/form";

function ReviewEmployee() {

  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms.form);

  const retrieveForms = useCallback(() => {
    dispatch(getFormsByPublished());
  }, [dispatch]);

  useEffect(() => {
    retrieveForms();
  }, [retrieveForms]);

  return (
      <DashboardLayout tab="Survey Response" >
        <Container maxWidth="lg">
            <Grid container spacing={6} sx={{ mt: 0 }}>
          <FormFeedback />
            </Grid>
        </Container>
      </DashboardLayout>
  );
}

export default ReviewEmployee;
