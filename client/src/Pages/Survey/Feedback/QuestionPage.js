import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getFormByID } from "../../../Redux/slices/form";
import { getResponse } from "../../../Redux/slices/response";

//question type
import { MultipleChoice } from "../../../Components/Survey/Question/QuestionType/MultipleChoice";
import ShortAnswer from "../../../Components/Survey/Question/QuestionType/ShortAnswer";
import Paragraph from "../../../Components/Survey/Question/QuestionType/Paragraph";
import { CheckBox } from "../../../Components/Survey/Question/QuestionType/Checkboxes";
import { DropDown } from "../../../Components/Survey/Question/QuestionType/DropDown";
import { LinearScale } from "../../../Components/Survey/Question/QuestionType/LinearScale";

import { Typography, Container, Grid, Button } from "@mui/material";

function QuestionPage(props) {
  const [feedback, setFeedback] = useState({
    formID: "",
    employeeID: "",
    response: [],
    draft: true,
  });

  const [clear, setClear] = useState(false);

  //redux
  const form = useSelector((state) => state.forms.form);
  const response = useSelector((state) => state.responses.feedback);
  const questions = useSelector((state) => state.forms.form.questions);
  const dispatch = useDispatch();

  const { id } = useParams();

  const token = localStorage.getItem("authToken");
  const employeeID = JSON.parse(atob(token.split(".")[1])).detailId;

  useEffect(() => {
    dispatch(getFormByID(id));
    var formID = id;
    dispatch(getResponse({ formID, employeeID }));
  }, []);

  useEffect(() => {
    if (form?.questions?.length > 0) {
      var temp = feedback;
      for (var i = 0; i < form?.questions?.length; i++) {
        temp.response.push({
          questionID: form.questions[i]._id,
          answer: [],
        });
      }
      setFeedback(temp);
    }
  }, [form]);

  useEffect(() => {
    var temp = feedback;
    for (var i = 0; i < response?.length; i++) {
      for (var j = 0; j < temp.response.length; j++) {
        if (temp.response[j].questionID === response[i].questionID) {
          temp.response[j].answer = response[i].answer;
          break;
        }
      }
    }
    setFeedback(temp);
  }, [response]);

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Grid
          m={2}
          p={2}
          sx={{ borderTop: "10px solid black", borderRadius: 2, boxShadow: 2 }}
        >
          <Typography variant="h4">{form?.name}</Typography>
          <Typography variant="body" gutterBottom>
            {form?.description}
          </Typography>
        </Grid>
        {/* map the questions here */}
        {questions?.map((q, i) => {
          return (
            <Grid
              m={2}
              p={2}
              sx={{
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: "12px",
                  }}
                ></div>
                {q.questionType === "Multiple Choice" ? (
                  <MultipleChoice index={i} />
                ) : (
                  ""
                )}
                {q.questionType === "Short Answer" ? (
                  <ShortAnswer index={i} />
                ) : (
                  ""
                )}
                {q.questionType === "Paragraph" ? <Paragraph index={i} /> : ""}
                {q.questionType === "Checkboxes" ? <CheckBox index={i} /> : ""}
                {q.questionType === "Drop-down" ? <DropDown index={i} /> : ""}
                {q.questionType === "Linear Scale" ? (
                  <LinearScale index={i} />
                ) : (
                  ""
                )}
              </>
            </Grid>
          );
        })}
        <Grid m={2} p={2}>
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Submit
          </Button>
          <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
            Save as Draft
          </Button>
          <Button variant="contained" color="error" sx={{ mt: 2, ml: 2 }}>
            Clear
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default QuestionPage;
