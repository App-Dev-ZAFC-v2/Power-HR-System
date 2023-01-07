import { TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateResponse } from "../../../../Redux/slices/response";

function ShortAnswer(props) {
  // const { index, disable } = props;
  // const question = useSelector((state) => state.forms.form.questions[index]);
  // const [answer, setAnswer] = useState("");

  const [answer, setAnswer] = useState({ text: "", optionID: "" });
  const { index, disable } = props;
  const question = useSelector((state) => state.forms.form.questions[index]);
  const option = useSelector(
    (state) => state.forms.form.questions[index].options
  );

  const reduxResponse = useSelector(
    (state) => state.responses.feedback?.response
  );
  const reduxFeedback = useSelector((state) => state.responses.feedback);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxResponse !== undefined) {
      setAnswer({
        text: reduxResponse[index].answer[0]?.text,
        optionID: reduxResponse[index].answer[0]?.optionID,
      });
    }
  }, [reduxResponse]);

  //handle answer
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    var temp = {
      text: e.target.value,
      optionID: "",
    };
    dispatch(
      updateResponse({
        ...reduxFeedback,
        response: {
          ...reduxFeedback.response,
          [index]: {
            ...reduxFeedback.response[index],
            answer: [temp],
          },
        },
      })
    );
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
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
      <div style={{ marginTop: 6, maxWidth: "50%", width: "100%" }}>
        <TextField
          variant="standard"
          value={disable ? "Short answer text" : "Your answer"}
          fullWidth
          disabled={disable}
          onChange
        />
      </div>
    </div>
  );
}

export default ShortAnswer;
