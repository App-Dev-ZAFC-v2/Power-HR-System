import { TextField, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateResponse, setSaving } from "../../../../Redux/slices/response";

function ShortAnswer(props) {
  // const { index, disable } = props;
  // const question = useSelector((state) => state.forms.form.questions[index]);
  // const [answer, setAnswer] = useState("");
  const saved = useSelector((state) => state.responses.saved);
  const [localSave, setLocalSave] = useState(true);

  const [answer, setAnswer] = useState("");
  const { index, disable } = props;
  const question = useSelector((state) => state.forms.form.questions[index]);

  const reduxResponse = useSelector(
    (state) => state.responses.feedback?.response
  );
  const reduxFeedback = useSelector((state) => state.responses.feedback);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxResponse !== undefined) {
      setAnswer(reduxResponse[index]?.answer[0]?.text);
    }
  }, [reduxResponse]);

  //auto save
  useEffect(() => {
    if (
      (saved === "SAVING" && localSave === false) ||
      (saved === "FAILED" && localSave === false)
    ) {
      const getData = setTimeout(() => {
        var tempResponse = JSON.parse(JSON.stringify(reduxFeedback));
        tempResponse.response[index].answer = [
          {
            text: answer,
            option: "",
          },
        ];
        dispatch(updateResponse(tempResponse));
        if (saved !== "FAILED") setLocalSave(true);
      }, 2000);
      return () => clearTimeout(getData);
    }
  }, [answer, saved, dispatch]);

  //handle answer
  const handleChange = (e) => {
    if (saved === "SAVED") {
      dispatch(setSaving());
    }
    setAnswer(e.target.value);
    setLocalSave(false);
  };

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
      <div style={{ marginTop: 6, maxWidth: "50%", width: "100%" }}>
        <TextField
          variant="standard"
          placeholder={disable ? "Short answer text" : "Your answer"}
          // value={disable ? "Short answer text" : "Your answer"}
          fullWidth
          disabled={disable}
          value={answer}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ShortAnswer;
