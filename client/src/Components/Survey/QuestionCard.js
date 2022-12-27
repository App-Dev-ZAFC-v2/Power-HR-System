import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
  Checkbox,
} from "@mui/material";
import { useEffect } from "react";
//import LinearScale from "@mui/icons-material/LinearScale";

function LinearScaleFunction(option) {
  const list = [];

  for (let i = option[0].optionScale; i <= option[1].optionScale; i++) {
    list.push(
      <FormControlLabel
        value={i}
        control={<Radio />}
        label={i}
        labelPlacement="top"
        style={{ margin: 0 }}
        sx={{
          "& .MuiFormControlLabel-label.Mui-disabled": {
            color: "#000000",
          },
        }}
      />
    );
  }
  return (
    <Grid
      wrap="nowrap"
      container
      style={{ marginTop: "12px", justifyContent: "center" }}
    >
      <Grid item xs sx={{ mt: "34px" }}>
        <Paper elevation={0}>
          <Typography align="right">{option[0].optionText}</Typography>
        </Paper>
      </Grid>
      <Grid item xs="auto">
        {list}
      </Grid>
      <Grid item xs sx={{ mt: "34px" }}>
        <Paper elevation={0}>
          <Typography>{option[1].optionText}</Typography>
        </Paper>
      </Grid>
    </Grid>
    // <Typography>Linear Scale</Typography>
  );
}

function CheckBoxFunction(option) {
  return option.map((op, j) => (
    <div key={j}>
      <div style={{ display: "flex" }}>
        <FormControlLabel
          control={<Checkbox style={{ marginRight: "3px" }} />}
          label={
            <Typography style={{ color: "#555555" }}>
              {op.optionText}
            </Typography>
          }
        />
      </div>

      <div>
        {op.optionImage !== "" ? (
          <img src={op.optionImage} width="160px" height="auto" />
        ) : (
          ""
        )}
      </div>
    </div>
  ));
}

function QuestionCard({ dataquestion, index }) {
  const [question, setQuestion] = React.useState(dataquestion);
  const [value, setValue] = React.useState(" ");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setQuestion(dataquestion);
  }, [dataquestion]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Typography variant="body" component="div" mt={2}>
        Question {index + 1}
      </Typography>
      {question.questionType === "Multiple Choice" ? (
        <Card sx={{ boxShadow: 5, p: 2 }}>
          <CardHeader title={question.questionText} />
          <Divider />
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <FormControl fullWidth>
                <RadioGroup
                  aria-label="question"
                  name="radio-buttons-group"
                  onChange={handleChange}
                  value={value}
                >
                  {question.options.map((option, index) => (
                    <Grid container key={index}>
                      <Grid>
                        <FormControlLabel
                          value={option._id}
                          control={<Radio />}
                          label={option.optionText}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      {question.questionType === "Linear Scale" ? (
        <Card sx={{ boxShadow: 5, p: 2 }}>
          <CardHeader title={question.questionText} />
          <Divider />
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <FormControl fullWidth>
                <RadioGroup
                  aria-label="question"
                  name="radio-buttons-group"
                  onChange={handleChange}
                  value={value}
                >
                  {LinearScaleFunction(question.options)}
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      {question.questionType === "Short Answer" ? (
        <Card sx={{ boxShadow: 5, p: 2 }}>
          <CardHeader title={question.questionText} />
          <Divider />
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <div style={{ marginTop: 6, maxWidth: "50%", width: "100%" }}>
                <TextField
                  variant="standard"
                  placeholder="Short Answer"
                  fullWidth
                />
              </div>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      {question.questionType === "Checkboxes" ? (
        <Card sx={{ boxShadow: 5, p: 2 }}>
          <CardHeader title={question.questionText} />
          <Divider />
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <FormControl fullWidth>
                <RadioGroup
                  aria-label="question"
                  name="radio-buttons-group"
                  onChange={handleChange}
                  value={value}
                >
                  {CheckBoxFunction(question.options)}
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </Grid>
  );
}

export default QuestionCard;
