import { Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";

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

export function CheckBoxResponse(prop){

}

export function DropDownResponse(prop){

}

export function LinearScaleResponse(prop){

}


