import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addQuestion,
  getFormByID,
  setSaved,
  updateForm,
} from "../../../Redux/slices/form";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import {
  Box,
  Container,
  LinearProgress,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Tabs,
  Tab,
  Paper,
  Fab,
  Typography,
  Switch,
  Icon,
  IconButton,
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import QuestionList from "../../../Components/Survey/Question/QuestionList";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import ErrorIcon from "@mui/icons-material/Error";

function EditForm() {
  const { id } = useParams();
  //Redux
  const rform = useSelector((state) => state.forms.form);
  // const loading = useSelector(state => state.forms.loading);
  const rsaved = useSelector((state) => state.forms.saved);

  const dispatch = useDispatch();

  const retrieveForm = useCallback(() => {
    dispatch(getFormByID(id));
  }, [dispatch]);

  useEffect(() => {
    retrieveForm();
  }, [retrieveForm]);

  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(rform);
  const [saved, setSaved] = useState(rsaved);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (form !== "" && form !== rform) setForm(rform);
  }, [rform]);

  useEffect(() => {
    if (saved !== "" && saved !== rsaved) setSaved(rsaved);
  }, [rsaved]);

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleName = (value) => {
    setSaved("SAVING");
    setForm({ ...form, name: value });
  };

  const handleDescription = (value) => {
    setSaved("SAVING");
    setForm({ ...form, description: value });
  };

  useEffect(() => {
    if ((form !== "" && form !== rform) || saved === "SAVING") {
      const getData = setTimeout(() => {
        dispatch(updateForm(form));
      }, 2000);
      return () => clearTimeout(getData);
    }
  }, [form, dispatch, rform, saved]);

  const handleAddQuestion = () => {
    setSaved("SAVING");
    var length = form.questions.length;
    var required = form.requiredAll;
    dispatch(addQuestion({ length, required }));
  };

  const handleLimit = () => {
    setSaved("SAVING");
    setForm({ ...form, once: !form.once });
  };

  const handleAllRequired = () => {
    setSaved("SAVING");

    if (!form.requiredAll === true) {
      var formTemp = form;
      formTemp = { ...form, requiredAll: !form.requiredAll };
      formTemp.questions.forEach((question) => {
        formTemp = { ...formTemp, questions: { ...question, required: true } };
      });
      setForm(formTemp);
    } else {
      setForm({ ...form, requiredAll: !form.requiredAll });
    }
  };

  const handlePublished = () => {
    setSaved("SAVING");
    if (!form.published === false) {
      var date = {
        active: false,
        date: "",
      };
      setForm({ ...form, published: !form.published, dueDate: date });
    } else setForm({ ...form, published: !form.published });
  };

  const handleDueDateActive = () => {
    setSaved("SAVING");
    var date = {
      active: !form.dueDate.active,
      date: dayjs(),
    };
    setForm({ ...form, dueDate: date });
  };

  const handleDueDate = (e) => {
    setSaved("SAVING");
    setForm({ ...form, dueDate: e });
  };

  function HandleAvatar() {
    return user.map((u) => (
      <Tooltip title={u.name}>
        <Avatar key={u.name} alt={u.name} src={u.avatar} />
      </Tooltip>
    ));
  }

  const handleSave = () => {
    setSaved("SAVING");
    dispatch(updateForm(rform));
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{ width: "100%", bgcolor: "background.paper", pt: 2 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{ display: "flex", marginRight: "24px", marginLeft: "24px" }}
        >
          {saved === "SAVING" ? (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <BackupRoundedIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Saving...</Typography>
            </Box>
          ) : (
            ""
          )}
          {saved === "SAVED" ? (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <CloudDoneRoundedIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Saved</Typography>
            </Box>
          ) : (
            ""
          )}
          {saved === "ERROR" ? (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ErrorIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Error</Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box>
          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
            }}
          >
            <HandleAvatar />
          </AvatarGroup>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 0px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <Tabs value={tab} onChange={handleTab} centered>
          <Tab label="Questions" />
          <Tab label="Settings" />
          <Tab label="Responses" disabled />
        </Tabs>
      </Box>
      {/* {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>} */}
      <Container>
        {tab === 0 ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            sx={{ mt: 5, mb: "128px" }}
          >
            <Grid item xs={12} sm={5} sx={{ width: "75%" }}>
              <Grid sx={{ borderTop: "10px solid black", borderRadius: 2 }}>
                <Accordion expanded={true}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="formBar"
                    elevation={1}
                    style={{ width: "100%" }}
                  ></AccordionSummary>

                  <AccordionDetails sx={{ mt: "-48px" }}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      <TextField
                        onChange={(e) => {
                          handleName(e.target.value);
                        }}
                        fullWidth={true}
                        placeholder="Form Text"
                        rowsmax={3}
                        multiline={true}
                        defaultValue={form.name}
                        variant="standard"
                        sx={{ m: 1 }}
                        inputProps={{
                          style: {
                            fontSize: 40,
                            fontFamily: "sans-serif Roboto",
                            lineHeight: "50px",
                          },
                        }}
                        margin="normal"
                      />
                      <TextField
                        onChange={(e) => {
                          handleDescription(e.target.value);
                        }}
                        fullWidth={true}
                        placeholder="Form Description"
                        rowsmax={3}
                        multiline={true}
                        defaultValue={form.description}
                        variant="standard"
                        sx={{ m: 1 }}
                        inputProps={{
                          style: { fontFamily: "sans-serif Roboto" },
                        }}
                        margin="normal"
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <QuestionList />
            </Grid>
            <Paper
              elevation={2}
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            >
              {/* {loading ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>} */}
              <Box
                sx={{ "& > :not(style)": { m: 1 } }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Fab
                  variant="extended"
                  onClick={() => {
                    handleAddQuestion();
                  }}
                >
                  <AddIcon sx={{ mr: 1 }} />
                  Add Question
                </Fab>
                <Fab
                  variant="extended"
                  onClick={() => {
                    handleSave();
                  }}
                  disabled={saved && true}
                >
                  <SaveIcon sx={{ mr: 1 }} />
                  {!saved ? "Saving..." : saved ? "Saved" : "Save"}
                </Fab>
              </Box>
            </Paper>
          </Grid>
        ) : (
          ""
        )}
        {tab === 1 ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            sx={{ mt: 5, mb: "64px" }}
          >
            <Grid item xs={12} sm={5} sx={{ width: "75%" }}>
              <Paper sx={{ p: 4 }}>
                <Box sx={{ pb: 4, borderBottom: 1 }}>
                  <Typography variant="h3">Settings</Typography>
                </Box>

                <Box sx={{ pl: 4, pt: 4, pb: 4, borderBottom: 1 }}>
                  <Typography variant="h6">Form</Typography>
                  <Typography variant="h7">Manage form setting</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pl: 4,
                      pt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Collaborators</Typography>
                      <Typography variant="h7">
                        Add others people to edit this form
                      </Typography>
                    </Box>
                    <Box></Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pl: 4,
                      pt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Publish</Typography>
                      <Typography variant="h7">
                        Make sure the form are ready to published
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        checked={form.published}
                        onChange={() => {
                          handlePublished();
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ pl: 4, pt: 4, pb: 4, borderBottom: 1 }}>
                  <Typography variant="h6">Responses</Typography>
                  <Typography variant="h7">
                    Manage how responses are collected
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pl: 4,
                      pt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Limit to 1 response</Typography>
                    </Box>
                    <Box>
                      <Switch
                        checked={form.once}
                        onChange={() => {
                          handleLimit();
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pl: 4,
                      pt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Accepting responses</Typography>
                      <Typography variant="h7">
                        This will turn {!form.published ? "on" : "off"} publish
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        checked={form.published}
                        onChange={() => {
                          handlePublished();
                        }}
                      />
                    </Box>
                  </Box>
                  {form.published ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pl: 4,
                        pt: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6">
                          Accepting responses until
                        </Typography>
                        {form.dueDate.active ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              value={form.dueDate.date}
                              onChange={(e) => {
                                handleDueDate(e.target.value);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box>
                        <Switch
                          checked={form.dueDate.active}
                          onChange={() => {
                            handleDueDateActive();
                          }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>

                <Box sx={{ pl: 4, pt: 4 }}>
                  <Typography variant="h6">Question defaults</Typography>
                  <Typography variant="h7">
                    Settings applied to all new questions
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pl: 4,
                      pt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">
                        Make questions required by default
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        checked={form.requiredAll}
                        onChange={() => {
                          handleAllRequired();
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default EditForm;
