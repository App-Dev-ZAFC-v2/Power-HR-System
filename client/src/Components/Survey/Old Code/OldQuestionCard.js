import React, { useState } from "react";
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
  Select,
  MenuItem,
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
  );
}

function CheckBoxFunction(option) {
  const [checkedState, setCheckedState] = useState(
    new Array(option.question).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    let total = 0;
    updatedCheckedState.forEach((item, index) => {
      if (item) {
        total += option[index].optionScale;
      }
    });
    setTotal(total);

    return (
      <div>
        <ul className="list-group">
          {option.map((op, j) => (
            <li key={j} className="list-group-item">
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ marginRight: "3px" }}
                      checked={checkedState[j]}
                      onChange={() => handleOnChange(j)}
                    />
                  }
                  label={
                    <Typography style={{ color: "#555555" }}>
                      {op.optionText}
                    </Typography>
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

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
                {/* checkbox  */}
                {CheckBoxFunction(question.options)}
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      {question.questionType === "Drop-down" ? (
        <Card sx={{ boxShadow: 5, p: 2 }}>
          <CardHeader title={question.questionText} />
          <Divider />
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={handleChange}
                >
                  {question.options.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.optionText}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      {question.questionType === "Paragraph" ? (
        <Card sx={{ boxShadow: 5, p: 2 }}>
          <CardHeader title={question.questionText} />
          <Divider />
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <div style={{ marginTop: 6, maxWidth: "50%", width: "100%" }}>
                <TextField
                  variant="standard"
                  placeholder="Paragraph"
                  fullWidth
                  multiline
                  rows={4}
                />
              </div>
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
