import { useEffect,  useState} from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Divider, Fab, FormControl, FormControlLabel, Grid, IconButton, LinearProgress, MenuItem, Paper, Radio, Select, TextField, Typography  } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';

function Multiple(props){
    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        let temp = props.dataquestions;

        setQuestions(temp);
    }, [props.dataquestions])

    function handleSave(){
        props.onChangeSave();
    }

    function handleExpand(i){
        let handleOpen = [...questions];
        for (let j = 0; j < handleOpen.length; j++) {
            if(i === j ){
                handleOpen[j].openView = true;
            }else{
                handleOpen[j].openView = false;
            }
        }
        setQuestions(handleOpen);
    }

    function handleQuestionValue(qtext, i){
        var tempQuestion = [...questions];
        tempQuestion[i].questionText = qtext;
        setQuestions(tempQuestion)
        handleSave();
    }

    function handleQuestionType(qtype, i){
        var tempQuestion = [...questions];
        tempQuestion[i].questionType = qtype;
        setQuestions(tempQuestion)
        handleSave();
    }

    function handleOptionValue(otext,i, j){
        var tempQuestion = [...questions];
        tempQuestion[i].options[j].optionText = otext;
        setQuestions(tempQuestion)
        handleSave();
    }

    function removeOption(i, j){
        var tempQuestion = [...questions];
        if(tempQuestion[i].options.length > 1){
            tempQuestion[i].options.splice(j, 1);
            setQuestions(tempQuestion)
            handleSave();
        }  
    }

    function addOption(i){
        var tempQuestion = [...questions];
        tempQuestion[i].options.push({optionText: "Option " + (tempQuestion[i].options.length + 1), optionImage: ""});
        setQuestions(tempQuestion);
        handleSave();
    }

    function deleteQuestion(i){
        props.delete(i);
    }

    return(
        <div>
        {questions.map((q, i) => (
        <Draggable key={i} draggableId={i + " id"} index={i}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div>
                        <div style={{ marginTop: "15px" }}>
                            <Accordion onChange={() => { handleExpand(i); } } expanded={questions[i].openView || false}>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{ width: '100%' }}>
                                    {!questions[i].openView ? (
                                        <>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px" }}>
                                                <DragIndicatorIcon style={{ color: '#DAE0E2' }} fontSize="small" />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px' }}>
                                                <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{q.questionText}</Typography>
                                                {(q.questionImage !== "") ? (
                                                    <div>
                                                        <img src={q.questionImage} width="400px" height="auto" /><br></br><br></br>
                                                    </div>
                                                ) : ""}

                                                {q.options.map((op, j) => (
                                                    <div key={j}>
                                                        <div style={{ display: 'flex' }}>
                                                            <FormControlLabel disabled control={<Radio style={{ marginRight: '3px', }} />} label={<Typography style={{ color: '#555555' }}>
                                                                {op.optionText}
                                                            </Typography>} />
                                                        </div>

                                                        <div>
                                                            {(op.optionImage !== "") ? (
                                                                <img src={op.optionImage} width="160px" height="auto" />
                                                            ) : ""}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div></>
                                    ) : ""}
                                </AccordionSummary>

                                <AccordionDetails>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px" }}>
                                            <DragIndicatorIcon style={{ color: '#DAE0E2' }} fontSize="small" />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '-15px', width: '100%' }}>
                                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                                <TextField
                                                    fullWidth={true}
                                                    placeholder="Question Text"
                                                    rowsmax={20}
                                                    multiline={true}
                                                    value={q.questionText}
                                                    variant="filled"
                                                    sx={{ m: 1 }}
                                                    onChange={(e) => { handleQuestionValue(e.target.value, i); } } />
                                                <FormControl sx={{ m: 1, minWidth: 230 }}>
                                                    <Select value={q.questionType} displayEmpty inputProps={{ 'aria-label': 'Without label' }} onChange={(e) => {handleQuestionType(e.target.value, i);}}>
                                                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={"Short Answer"}> <ShortTextIcon sx={{ mr: "6px" }} /> Short answer</MenuItem>
                                                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={"Paragraph"}> <SubjectIcon sx={{ mr: "6px" }} /> Paragraph</MenuItem>
                                                        <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
                                                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={"Multiple Choice"}> <RadioButtonCheckedIcon sx={{ mr: "6px" }} /> Multiple choice</MenuItem>
                                                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={"Checkboxes"}> <CheckBoxIcon sx={{ mr: "6px" }} /> Checkboxes</MenuItem>
                                                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={"Drop-down"}> <ArrowDropDownCircleIcon sx={{ mr: "6px" }} /> Drop-down</MenuItem>
                                                        <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
                                                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={"Linear Scale"}> <LinearScaleIcon sx={{ mr: "6px" }} /> Linear scale</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div style={{ width: '100%' }}>
                                                {q.options.map((op, j) => (
                                                    <div key={j}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px' }}>
                                                            <Radio disabled />
                                                            <TextField
                                                                fullWidth={true}
                                                                placeholder="Option text"
                                                                value={op.optionText}
                                                                onChange={(e) => { handleOptionValue(e.target.value, i, j); } } />
                                                            {(q.options.length > 1) ? (
                                                                <IconButton aria-label="delete" onClick={() => { removeOption(i, j); } } sx={{ ml: "12px" }}>
                                                                    <CloseIcon sx={{ m: "6px" }} />
                                                                </IconButton>)
                                                                : ""}
                                                        </div>


                                                    </div>
                                                ))}
                                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', paddingTop: '5px', paddingBottom: '5px' }}>
                                                    <Radio disabled />
                                                    <Button size="small" onClick={() => { addOption(i); } } style={{ textTransform: 'none', marginLeft: "-5px" }}>
                                                        Add Option
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                                <AccordionActions>
                                    {(questions.length > 1) ? (
                                        <IconButton aria-label="delete" onClick={() => { deleteQuestion(i); } }>
                                            <DeleteOutlineIcon />
                                        </IconButton>) : ""}
                                </AccordionActions>
                            </Accordion>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    ))}</div>)
}

export default Multiple;
