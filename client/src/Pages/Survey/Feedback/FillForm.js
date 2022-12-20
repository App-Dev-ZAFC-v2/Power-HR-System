import React, { useEffect, useState } from "react";
import API from "../../../API/form";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
} from "@mui/material";
import Navbar from "../../../Components/Navbar";
import QuestionCard from "../../../Components/Survey/QuestionCard.js";

function FillForm() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loadingForm, setLoading] = useState(true);
  const [form, setForm] = useState([]);
  const [values, setValues] = useState({});

  useEffect(() => {
    API.getFormByID(id)
      .then((data) => {
        setQuestions(data.questions);

        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit the form data
  };

  const handleClear = (event) => {
    event.preventDefault();
    setValues({});
  };

  return (
    <>
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
          <Navbar />
          <Container maxWidth="md" sx={{ my: 4 }}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Card sx={{ boxShadow: 5, p: 2 }}>
                  <Typography variant="h4">{form.name}</Typography>
                  <Typography variant="textSecondary">
                    {form.description}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                {questions.map((q, index) => (
                  <QuestionCard key={q._id} dataquestion={q} index={index} />
                ))}
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button type="reset" variant="contained" onClick={handleClear}>
                  Clear
                </Button>
              </form>
            </Grid>

            {/* <Grid spacing={4} sx={{ mt: 0 }}>
              {questions.map((q, index) => (
                <QuestionCard key={q._id} dataquestion={q} index={index} />
              ))}
            </Grid> */}
          </Container>
        </>
      )}
    </>
  );
}

export default FillForm;
