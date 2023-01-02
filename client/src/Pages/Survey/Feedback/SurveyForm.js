import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import ViewForm from "../../../Components/Survey/ViewForm";
import API from "../../../API/form";
import {
  CircularProgress,
  Container,
  Box,
  Grid,
  Typography,
} from "@mui/material";

function SurveyForm() {
  const [form, setForm] = useState([]);
  const [loadingForm, setLoading] = useState(true);

  useEffect(() => {
    API.getForms()

      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h2">Survey Form</Typography>
        <Grid container spacing={4} sx={{ mt: 0 }}>
          {loadingForm ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {form.map((f) => (
                // <FormCard dataform={f} />
                <ViewForm dataform={f} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default SurveyForm;
