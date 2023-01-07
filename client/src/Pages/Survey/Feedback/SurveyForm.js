import React, { useEffect, useCallback } from "react";
import Navbar from "../../../Components/Navbar";
import ViewFormCard from "../../../Components/Survey/ViewFormCard";
//import API from "../../../API/form";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getForms, getFormsByPublished } from "../../../Redux/slices/form";

export default function SurveyForm() {
  //redux
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms.form);

  const retrieveForms = useCallback(() => {
    dispatch(getFormsByPublished());
  }, [dispatch]);

  useEffect(() => {
    retrieveForms();
  }, [retrieveForms]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Typography variant="h4" component="h1">
          Survey Form
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2, mb: 5, boxShadow: 8 }}>
          <ViewFormCard dataform={forms} />
        </Grid>
      </Container>
    </>
  );
}
