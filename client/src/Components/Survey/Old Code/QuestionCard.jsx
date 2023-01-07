import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import { func } from "prop-types";
import { Stack, textAlign, width } from "@mui/system";

function QuestionCard(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let temp = props.dataquestions;

    setQuestions(temp);
  }, [props.dataquestions]);

  function handleSave() {
    props.onChangeSave();
  }

  function handleExpand(i) {
    let handleOpen = [...questions];
    for (let j = 0; j < handleOpen.length; j++) {
      if (i === j) {
        handleOpen[j].openView = true;
      } else {
        handleOpen[j].openView = false;
      }
    }
    setQuestions(handleOpen);
  }

  function handleQuestionValue(qtext, i) {
    var tempQuestion = [...questions];
    tempQuestion[i].questionText = qtext;
    setQuestions(tempQuestion);
    handleSave();
  }

  function handleQuestionType(qtype, i) {
    var tempQuestion = [...questions];
    var prev = tempQuestion[i].questionType;
    tempQuestion[i].questionType = qtype;
    if (qtype === "Linear Scale") {
      tempQuestion[i].options = [
        { optionText: "", optionImage: "", optionScale: 1 },
        { optionText: "", optionImage: "", optionScale: 5 },
      ];
    } else if (
      qtype === "Multiple Choice" ||
      qtype === "Checkboxes" ||
      qtype === "Drop-down"
    ) {
      if (
        prev !== "Multiple Choice" &&
        prev !== "Checkboxes" &&
        prev !== "Drop-down"
      )
        tempQuestion[i].options = [{ optionText: "Option 1", optionImage: "" }];
    } else {
      if (prev !== "Paragraph" && prev !== "Short Answer")
        tempQuestion[i].options = [];
    }

    setQuestions(tempQuestion);
    handleSave();
  }

  function handleOptionValue(otext, i, j) {
    var tempQuestion = [...questions];
    tempQuestion[i].options[j].optionText = otext;
    setQuestions(tempQuestion);
    handleSave();
  }

  function handleOptionScale(value, i, j) {
    var tempQuestion = [...questions];
    tempQuestion[i].options[j].optionScale = value;
    setQuestions(tempQuestion);
    handleSave();
  }

  function removeOption(i, j) {
    var tempQuestion = [...questions];
    if (tempQuestion[i].options.length > 1) {
      tempQuestion[i].options.splice(j, 1);
      setQuestions(tempQuestion);
      handleSave();
    }
  }

  function addOption(i) {
    var tempQuestion = [...questions];
    tempQuestion[i].options.push({
      optionText: "Option " + (tempQuestion[i].options.length + 1),
      optionImage: "",
    });
    setQuestions(tempQuestion);
    handleSave();
  }

  function deleteQuestion(i) {
    props.delete(i);
  }

  function MultipleClose(option) {
    return option.map((op, j) => (
      <div key={j}>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            disabled
            control={<Radio style={{ marginRight: "3px" }} />}
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

  function MultipleOpen(option, i) {
    return (
      <div style={{ width: "100%" }}>
        {option.map((op, j) => (
          <div key={j}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "-12.5px",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Radio disabled />
              <TextField
                fullWidth={true}
                placeholder="Option text"
                sx={{ mr: 1 }}
                value={op.optionText}
                onChange={(e) => {
                  handleOptionValue(e.target.value, i, j);
                }}
              />
              {option.length > 1 ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeOption(i, j);
                  }}
                  sx={{ ml: "12px" }}
                >
                  <CloseIcon sx={{ m: "6px" }} />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "-12.5px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <Radio disabled />
          <Button
            size="small"
            onClick={() => {
              addOption(i);
            }}
            style={{ textTransform: "none", marginLeft: "-5px" }}
          >
            Add Option
          </Button>
        </div>
      </div>
    );
  }

  function LinearScaleClose(option) {
    const list = [];

    for (let i = option[0].optionScale; i <= option[1].optionScale; i++) {
      list.push(
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

  function LinearScaleOpen(option, i) {
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 50 }} size="small" nowrap="true">
            <Select
              value={option[0].optionScale}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              displayEmpty
              onChange={(e) => {
                handleOptionScale(e.target.value, i, 0);
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
          <Paper
            elevation={0}
            component={Stack}
            nowrap="true"
            direction="column"
            justifyContent="center"
          >
            <Typography>to</Typography>
          </Paper>
          <FormControl sx={{ m: 1, minWidth: 50 }} size="small" nowrap="true">
            <Select
              value={option[1].optionScale}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              displayEmpty
              onChange={(e) => {
                handleOptionScale(e.target.value, i, 1);
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {option.map((op, j) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Paper
                elevation={0}
                sx={{ ml: "12px", mt: "7px" }}
                component={Stack}
                nowrap="true"
                direction="column"
                justifyContent="center"
              >
                <Typography width="10px">{op.optionScale}</Typography>
              </Paper>
              <TextField
                onChange={(e) => {
                  handleOptionValue(e.target.value, i, j);
                }}
                placeholder="Label (optional)"
                defaultValue={op.optionText}
                nowrap="true"
                variant="standard"
                sx={{ ml: "24px" }}
                inputProps={{ style: { fontFamily: "sans-serif Roboto" } }}
                margin="normal"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function CheckBoxClose(option) {
    return option.map((op, j) => (
      <div key={j}>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            disabled
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

  function CheckBoxOpen(option, i) {
    return (
      <div style={{ width: "100%" }}>
        {option.map((op, j) => (
          <div key={j}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "-12.5px",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Checkbox disabled />
              <TextField
                fullWidth={true}
                sx={{ mr: 1 }}
                placeholder="Option text"
                value={op.optionText}
                onChange={(e) => {
                  handleOptionValue(e.target.value, i, j);
                }}
              />
              {option.length > 1 ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeOption(i, j);
                  }}
                  sx={{ ml: "12px" }}
                >
                  <CloseIcon sx={{ m: "6px" }} />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "-12.5px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <Checkbox disabled />
          <Button
            size="small"
            onClick={() => {
              addOption(i);
            }}
            style={{ textTransform: "none", marginLeft: "-5px" }}
          >
            Add Option
          </Button>
        </div>
      </div>
    );
  }

  function DropdownClose(option) {
    return option.map((op, j) => (
      <div key={j}>
        <div style={{ display: "flex", marginTop: 6 }}>
          <Typography style={{ color: "#555555" }}>
            {j + 1}. {op.optionText}
          </Typography>
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

  function DropdownOpen(option, i) {
    return (
      <div style={{ width: "100%" }}>
        {option.map((op, j) => (
          <div key={j}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "-12.5px",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Paper
                elevation={0}
                component={Stack}
                nowrap="true"
                direction="column"
                justifyContent="center"
              >
                <Typography sx={{ mr: 2, ml: "16px" }}>{j + 1}.</Typography>
              </Paper>
              <TextField
                fullWidth={true}
                sx={{ mr: 1 }}
                placeholder="Option text"
                value={op.optionText}
                onChange={(e) => {
                  handleOptionValue(e.target.value, i, j);
                }}
              />
              {option.length > 1 ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeOption(i, j);
                  }}
                  sx={{ ml: "12px" }}
                >
                  <CloseIcon sx={{ m: "6px" }} />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "-12.5px",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginTop: 6,
          }}
        >
          <Paper
            elevation={0}
            component={Stack}
            nowrap="true"
            direction="column"
            justifyContent="center"
          >
            <Typography sx={{ mr: 2, ml: "16px" }}>
              {option.length + 1}.
            </Typography>
          </Paper>
          <Button
            size="small"
            onClick={() => {
              addOption(i);
            }}
            style={{ textTransform: "none", marginLeft: "-5px" }}
          >
            Add Option
          </Button>
        </div>
      </div>
    );
  }

  function ShortAnswer() {
    return (
      <div style={{ marginTop: 6, maxWidth: "50%", width: "100%" }}>
        <TextField
          variant="standard"
          value="short answer text"
          fullWidth
          disabled
        />
      </div>
    );
  }

  function Paragraph() {
    return (
      <div style={{ width: "100%", paddingRight: 12, marginTop: 6 }}>
        <TextField
          variant="standard"
          value="Long answer text"
          fullWidth
          disabled
        />
      </div>
    );
  }

  return (
    <div>
      {questions.map((q, i) => (
        <Draggable key={i} draggableId={i + " id"} index={i}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div>
                <div style={{ marginTop: "15px" }}>
                  <Accordion
                    onChange={() => {
                      handleExpand(i);
                    }}
                    expanded={questions[i].openView || false}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      elevation={1}
                      style={{ width: "100%" }}
                    >
                      {!questions[i].openView ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: "12px",
                            }}
                          >
                            <DragIndicatorIcon
                              style={{ color: "#DAE0E2" }}
                              fontSize="small"
                            />
                          </div>
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
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "0px" }}
                            >
                              {q.questionText}
                            </Typography>
                            {q.questionImage !== "" ? (
                              <div>
                                <img
                                  src={q.questionImage}
                                  width="400px"
                                  height="auto"
                                />
                                <br></br>
                                <br></br>
                              </div>
                            ) : (
                              ""
                            )}

                            {q.questionType === "Multiple Choice"
                              ? MultipleClose(q.options)
                              : ""}
                            {q.questionType === "Linear Scale"
                              ? LinearScaleClose(q.options)
                              : ""}
                            {q.questionType === "Checkboxes"
                              ? CheckBoxClose(q.options)
                              : ""}
                            {q.questionType === "Short Answer"
                              ? ShortAnswer()
                              : ""}
                            {q.questionType === "Paragraph" ? Paragraph() : ""}
                            {q.questionType === "Drop-down"
                              ? DropdownClose(q.options)
                              : ""}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </AccordionSummary>

                    <AccordionDetails>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: "12px",
                          }}
                        >
                          <DragIndicatorIcon
                            style={{ color: "#DAE0E2" }}
                            fontSize="small"
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginTop: "-15px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <TextField
                              fullWidth={true}
                              placeholder="Question Text"
                              rowsmax={20}
                              multiline={true}
                              value={q.questionText}
                              variant="filled"
                              sx={{ mt: 1, mb: 1, mr: 1 }}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                            />
                            <FormControl sx={{ m: 1, minWidth: 230 }}>
                              <Select
                                value={q.questionType}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                onChange={(e) => {
                                  handleQuestionType(e.target.value, i);
                                }}
                              >
                                <MenuItem
                                  sx={{ pt: "16.5px", pb: "16.5px" }}
                                  value={"Short Answer"}
                                >
                                  {" "}
                                  <ShortTextIcon sx={{ mr: "6px" }} /> Short
                                  answer
                                </MenuItem>
                                <MenuItem
                                  sx={{ pt: "16.5px", pb: "16.5px" }}
                                  value={"Paragraph"}
                                >
                                  {" "}
                                  <SubjectIcon sx={{ mr: "6px" }} /> Paragraph
                                </MenuItem>
                                <Divider
                                  sx={{
                                    borderBottomWidth: 2,
                                    bgcolor: "black",
                                  }}
                                />
                                <MenuItem
                                  sx={{ pt: "16.5px", pb: "16.5px" }}
                                  value={"Multiple Choice"}
                                >
                                  {" "}
                                  <RadioButtonCheckedIcon
                                    sx={{ mr: "6px" }}
                                  />{" "}
                                  Multiple choice
                                </MenuItem>
                                <MenuItem
                                  sx={{ pt: "16.5px", pb: "16.5px" }}
                                  value={"Checkboxes"}
                                >
                                  {" "}
                                  <CheckBoxIcon sx={{ mr: "6px" }} /> Checkboxes
                                </MenuItem>
                                <MenuItem
                                  sx={{ pt: "16.5px", pb: "16.5px" }}
                                  value={"Drop-down"}
                                >
                                  {" "}
                                  <ArrowDropDownCircleIcon
                                    sx={{ mr: "6px" }}
                                  />{" "}
                                  Drop-down
                                </MenuItem>
                                <Divider
                                  sx={{
                                    borderBottomWidth: 2,
                                    bgcolor: "black",
                                  }}
                                />
                                <MenuItem
                                  sx={{ pt: "16.5px", pb: "16.5px" }}
                                  value={"Linear Scale"}
                                >
                                  {" "}
                                  <LinearScaleIcon sx={{ mr: "6px" }} /> Linear
                                  scale
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          {q.questionType === "Multiple Choice"
                            ? MultipleOpen(q.options, i)
                            : ""}
                          {q.questionType === "Linear Scale"
                            ? LinearScaleOpen(q.options, i)
                            : ""}
                          {q.questionType === "Checkboxes"
                            ? CheckBoxOpen(q.options, i)
                            : ""}
                          {q.questionType === "Short Answer"
                            ? ShortAnswer()
                            : ""}
                          {q.questionType === "Paragraph" ? Paragraph() : ""}
                          {q.questionType === "Drop-down"
                            ? DropdownOpen(q.options, i)
                            : ""}
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionActions>
                      {questions.length > 1 ? (
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteQuestion(i);
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </AccordionActions>
                  </Accordion>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

export default QuestionCard;
