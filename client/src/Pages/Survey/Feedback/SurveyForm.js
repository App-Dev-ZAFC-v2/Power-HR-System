import React, { useEffect, useCallback } from "react";
// import Navbar from "../../../Components/Navbar";
import ViewFormCard from "../../../Components/Survey/ViewFormCard";
//import API from "../../../API/form";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFormsByPublished } from "../../../Redux/slices/form";
import { DashboardLayout } from "../../../Components/Employee/Dashboard/dashboard-layout";

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
      <DashboardLayout tab="Feedback Survey">
        {/* <Navbar /> */}
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Grid container spacing={4} sx={{ ml: 1, mt: 2 }}>
            <ViewFormCard dataform={forms} />
          </Grid>
        </Container>
      </DashboardLayout>
    </>
  );
}
