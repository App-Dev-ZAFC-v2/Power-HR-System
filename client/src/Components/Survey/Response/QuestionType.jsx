import { Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Stack, Select, MenuItem, Divider, Grid, Paper, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

export function MultipleChoiceResponse(props){
    const { response, question } = props;

    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "15px",
            paddingBottom: "15px",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
            {question.questionText}
          </Typography>
          {question.questionImage !== "" ? (
            <div>
              <img src={question.questionImage} width="400px" height="auto" />
              <br></br>
              <br></br>
            </div>
          ) : (
            ""
          )}
          <FormControl sx={{ mt: "6px" }}>
            <RadioGroup defaultValue={""} value={response.answer[0]?.optionID }>
              {question.options?.map((op, i) => (
                <FormControlLabel
                  disabled
                  value={op._id}
                  control={<Radio style={{ marginRight: "3px" }} />}
                  label={
                    <Typography style={{ color: "#000000" }}>
                      {op.optionText}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      );
}

export function ShortAnswerResponse(props){
    const { response, question } = props;

    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "15px",
            paddingBottom: "15px",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
            {question?.questionText}
          </Typography>
          {question?.questionImage !== "" ? (
            <div>
              <img src={question?.questionImage} width="400px" height="auto" />
              <br></br>
              <br></br>
            </div>
          ) : (
            ""
          )}
          <div style={{ marginTop: 6, maxWidth: "50%", width: "100%" }}>
            <TextField
              variant="standard"
              placeholder={"Short answer text"}
              value={response?.answer[0]?.text}
              fullWidth
              disabled
            />
          </div>
        </div>
    );
}

export function ParagraphResponse(props){
    const { response, question } = props;

    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "15px",
            paddingBottom: "15px",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
            {question?.questionText}
          </Typography>
          {question?.questionImage !== "" ? (
            <div>
              <img src={question?.questionImage} width="400px" height="auto" />
              <br></br>
              <br></br>
            </div>
          ) : (
            ""
          )}
          <div style={{width: "100%", paddingRight: 12, marginTop: 6}}>
            <TextField
              variant="standard"
              placeholder={"Short answer text"}
              value={response?.answer[0]?.text}
              fullWidth
              disabled
            />
          </div>
        </div>
    );
}

export function CheckBoxResponse(props){
  const { response, question } = props;

  const [check, setChecked] = useState([]);

  useEffect(() => {
    var temp = [];
    if (response !== undefined) {
      for (let i = 0; i < question.options.length; i++) {
        if(response.answer !== undefined){
          var temp1 = response.answer.find(
            (ans) => ans.optionID === question.options[i]._id
          );
          if (temp1 !== undefined) {
            temp.push(true);
          } else {
            temp.push(false);
          }
        }
      }
      setChecked(temp);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "15px",
        paddingBottom: "15px",
        width: "100%",
      }}
    >
      <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
        {" "}
        <Stack direction="row">
          {question.questionText}
          {question.required ? (
            <Typography color="error" ml={1}>
              *
            </Typography>
          ) : (
            ""
          )}
        </Stack>
      </Typography>
      {question.questionImage !== "" ? (
        <div>
          <img src={question.questionImage} width="400px" height="auto" />
          <br></br>
          <br></br>
        </div>
      ) : (
        ""
      )}

      <FormControl sx={{ mt: "6px"}} >
        {question.options?.map((op, i) => (
          <FormControlLabel
            disabled
            value={op._id}
            control={<Checkbox checked={check[i] || false} style={{ marginRight: "3px" }}/>}
            label={
              <Typography style={{ color: "#000000" }}>
                {op.optionText}
              </Typography>
            }
          />
        ))}
      </FormControl>
    </div>
  );
}

export function DropDownResponse(props){
  const { response, question } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "15px",
        paddingBottom: "15px",
        width: "100%",
      }}
    >
      <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
        {" "}
        <Stack direction="row">
          {question.questionText}
          {question.required ? (
            <Typography color="error" ml={1}>
              *
            </Typography>
          ) : (
            ""
          )}
        </Stack>
      </Typography>
      {question.questionImage !== "" ? (
        <div>
          <img src={question.questionImage} width="400px" height="auto" />
          <br></br>
          <br></br>
        </div>
      ) : (
        ""
      )}
      <FormControl sx={{ mt: "6px", minWidth: 230 }}>
        <Select
          value={response.answer[0]?.optionID}
          displayEmpty
          
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={""}>
            Choose
          </MenuItem>
          <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
          {question.options?.map((op, j) => (
            <MenuItem
              sx={{ pt: "16.5px", pb: "16.5px" }}
              key={j}
              value={op._id}
            >
              {op.optionText}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

}

export function LinearScaleResponse(props){
  const { response, question } = props;

  const [list, setList] = useState([]);

  useEffect(() => {
    var temp = [];
    for (let i = question.options[0].optionScale; i <= question.options[1].optionScale; i++) {
      temp.push(
        <FormControlLabel
          value={i}
          disabled
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
    setList(temp);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "15px",
        paddingBottom: "15px",
        width: "100%",
      }}
    >
      <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
        {" "}
        <Stack direction="row">
          {question.questionText}
          {question.required ? (
            <Typography color="error" ml={1}>
              *
            </Typography>
          ) : (
            ""
          )}
        </Stack>
      </Typography>
      {question.questionImage !== "" ? (
        <div>
          <img src={question.questionImage} width="400px" height="auto" />
          <br></br>
          <br></br>
        </div>
      ) : (
        ""
      )}
      <Grid
        wrap="nowrap"
        container
        style={{ marginTop: "12px", justifyContent: "center" }}
      >
        <Grid item xs sx={{ mt: "34px" }}>
          <Paper elevation={0}>
            <Typography align="right">{question.options[0].optionText}</Typography>
          </Paper>
        </Grid>
        <Grid item xs="auto">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue={response.answer[0].optionID}
            value={response.answer[0].optionID}
          >
            {list}
          </RadioGroup>
        </Grid>
        <Grid item xs sx={{ mt: "34px" }}>
          <Paper elevation={0}>
            <Typography>{question.options.optionText}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}


