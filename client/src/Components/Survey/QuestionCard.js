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
} from "@mui/material";
import { useEffect } from "react";

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
        <Typography variant="h5" component="div">
          Selain Multiple Choice belum dibuat
        </Typography>
      )}
    </Grid>
  );
}

export default QuestionCard;
