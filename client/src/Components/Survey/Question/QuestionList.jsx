import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteQuestion, setSaving, updateForm } from '../../../Redux/slices/form';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Divider, FormControl, MenuItem, Select, TextField, IconButton, Stack, Switch, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Paper, Grid } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import { MultipleChoice, MultipleChoiceEdit } from './QuestionType/MultipleChoice';
import ShortAnswer from './QuestionType/ShortAnswer';
import Paragraph from './QuestionType/Paragraph';
import { CheckBox, CheckBoxEdit } from './QuestionType/Checkboxes';
import { DropDownEdit, DropDownList } from './QuestionType/DropDown';
import { LinearScale, LinearScaleEdit } from './QuestionType/LinearScale';
import { useEffect, useState } from 'react';

function QuestionList(){
    const rform = useSelector(state => state.forms.form);
    const saved = useSelector(state => state.forms.saved);
    const dispatch = useDispatch();

    // //Retrieve form from database
    // const retrieveForm = useCallback(() => {
    //     dispatch(getFormByID(id));
    // }, [dispatch]);

    // useEffect(() => {
    //     retrieveForm();
    // }, [retrieveForm]);

    //local state
    const [questions, setQuestions] = useState([]);
    const [localSave, setLocalSave] = useState(true);
    const [load, setLoad] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if( questions !== rform.questions && localSave === true){
            setQuestions(rform.questions);
        }
            
    }, [rform]);

    //auto save
    useEffect(() => {
        if(saved === "SAVING" && localSave === false || saved === "FAILED" && localSave === false){
            const getData = setTimeout(() => {
                var tempForm = {...rform, questions: questions};
                dispatch(updateForm(tempForm));
                if( saved !== "FAILED")
                    setLocalSave(true);
                }, 2000)
                return () => clearTimeout(getData)
        }
    }, [questions, saved, dispatch]);

    useEffect(() => {
        if(expanded.length === 0){
            var handleOpen = [];
            for(var i = 0; i < rform.questions.length; i++){
                handleOpen.push(false);
            }
            handleOpen[0] = true;
            setExpanded(handleOpen);
        }

        if(questions.length > expanded.length){
            var handleOpen = [];
            for(var i = 0; i < questions.length; i++){
                handleOpen.push(false);
            }
            handleOpen[questions.length - 1] = true;
            setExpanded(handleOpen);
        }
    }, [questions]);


    async function onDragEnd(result){

        if (!result.destination) {
            return;
        }

        if(result.destination.index === result.source.index){
            return;
        }
        
        var temp = JSON.parse(JSON.stringify(questions));
        temp = await reorder(
            temp,
            result.source.index,
            result.destination.index
        );

        var tempExpanded = expanded;
        tempExpanded = await reorder(
            tempExpanded,
            result.source.index,
            result.destination.index
        );
        
        dispatch(updateForm({...rform, questions: temp}));
        setExpanded(tempExpanded);
    }

    const reorder = async (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    function handleExpand(i){

        if(expanded[i] === false){
            let handleOpen = [];
            for(var j = 0; j < expanded.length; j++){
                handleOpen.push(false);
            }
            handleOpen[i] = true;
            setExpanded(handleOpen);
        }
    }

    function handleQuestionText(value, i){
        if(saved === "SAVED"){
            dispatch(setSaving());
        }
        var tempQuestion = JSON.parse(JSON.stringify(questions));
        tempQuestion[i].questionText = value;
        setQuestions(tempQuestion);
        setLocalSave(false);
    }

    function handleQuestionType(value, i){
        // if(saved === "SAVED"){
        //     dispatch(setSaving());
        // }
        var tempQuestion = JSON.parse(JSON.stringify(questions));
        var prev = tempQuestion[i].questionType;
        tempQuestion[i].questionType = value;
        if(value === "Linear Scale"){
            tempQuestion[i].options = [
                { optionText: "", optionImage: "", optionScale: 1 },
                { optionText: "", optionImage: "", optionScale: 5 }];
        }
        else if(value === "Multiple Choice" || value === "Checkboxes" || value === "Drop-down"){
            if(prev !== "Multiple Choice" && prev !== "Checkboxes" && prev !== "Drop-down"){
                tempQuestion[i].options = [{ optionText: "Option 1", optionImage: "" }];
            }
        }
        else{
            if(prev !== "Paragraph" && prev !== "Short Answer"){
                tempQuestion[i].options = [];
            }
        }
        dispatch(updateForm({...rform, questions: tempQuestion}));
        // setQuestions(tempQuestion);
        // setLocalSave(false);
    }

    function handleDeleteQuestion(i){
        if(saved === "SAVED"){
            dispatch(setSaving());
        }
        var tempQuestion = JSON.parse(JSON.stringify(questions));
        var tempExpanded = expanded;
        if(questions.length > 1){
            tempQuestion.splice(i, 1);
            tempExpanded.splice(i, 1);
        }
        if(i === 0){
            tempExpanded[i] = true;
        }
        else{
            tempExpanded[i-1] = true;
        }
        setQuestions(tempQuestion);
        setExpanded(tempExpanded);
        setLocalSave(false);
    }

    function handleRequired(i){
        
        var tempQuestion = JSON.parse(JSON.stringify(questions));
        
        //if form is required all and question is required, alert user that they cannot uncheck required and need to turn off required all
        if(rform.requiredAll === true && tempQuestion[i].required === true){
            handleClickOpen();
            return;
        }
        if(saved === "SAVED"){
            dispatch(setSaving());
        }


        tempQuestion[i].required = !tempQuestion[i].required;
        setQuestions(tempQuestion);
        setLocalSave(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleAllRequired = () => {
        if(saved === "SAVED"){
            dispatch(setSaving());
            
        }
        
        if(!rform.requiredAll === true){
            var formTemp = JSON.parse(JSON.stringify(rform));
            formTemp.requiredAll = !rform.requiredAll;
            //set all question required to true
            formTemp.questions.forEach(question => {
                question.required = true;
            });
            dispatch(updateForm(formTemp));
        }
        else{
            dispatch(updateForm({...rform, requiredAll: !rform.requiredAll}));
        }
        setLocalSave(false);
    }

    return(
        <><DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div className='droppable' {...provided.droppableProps} ref={provided.innerRef}>
                        {questions?.map((q, i) => (
                            <Draggable key={i} draggableId={i + " id"} index={i}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div style={{ marginTop: "15px" }}>
                                            <Accordion onChange={() => { handleExpand(i); } } expanded={expanded[i] || false} sx={{boxShadow: 12 }}>
                                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{ width: '100%' }}>
                                                    {!expanded[i] ? (
                                                        <>
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px" }}>
                                                                <DragIndicatorIcon style={{ color: '#DAE0E2' }} fontSize="small" />
                                                            </div>
                                                            {(q.questionType === "Multiple Choice") ? <MultipleChoice index={i} disable={true} /> : ""}
                                                            {(q.questionType === "Short Answer") ? <ShortAnswer index={i} disable={true} /> : ""}
                                                            {(q.questionType === "Paragraph") ? <Paragraph index={i} disable={true} /> : ""}
                                                            {(q.questionType === "Checkboxes") ? <CheckBox index={i} disable={true} /> : ""}
                                                            {(q.questionType === "Drop-down") ? <DropDownList index={i} /> : ""}
                                                            {(q.questionType === "Linear Scale") ? <LinearScale index={i} disable={true} /> : ""}

                                                        </>
                                                    ) : ""}
                                                </AccordionSummary>

                                                <AccordionDetails>
                                                    <div style={{ display: "flex" }}>
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px" }}>
                                                            <DragIndicatorIcon style={{ color: '#DAE0E2' }} fontSize="small" />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '-15px', width: '100%' }}>
                                                            <Grid container>
                                                                <Grid item sm={8} xs={12} >
                                                                    <TextField
                                                                        fullWidth={true}
                                                                        placeholder="Question Text"
                                                                        rowsmax={20}
                                                                        multiline={true}
                                                                        value={q.questionText}
                                                                        variant="filled"
                                                                        sx={{ mt: 1, mb: 1, mr: 1 }}
                                                                        onChange={(e) => { handleQuestionText(e.target.value, i); } } />
                                                                </Grid>
                                                                <Grid item sm={4} xs={12}>
                                                                    <FormControl sx={{ mt: 1, mb: 1, mr: 1, width: "100%"}}>
                                                                        <Select value={q.questionType} displayEmpty inputProps={{ 'aria-label': 'Without label' }} onChange={(e) => { handleQuestionType(e.target.value, i); } }>
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
                                                                </Grid>
                                                            </Grid>

                                                            {(q.questionType === "Multiple Choice") ? <MultipleChoiceEdit index={i} /> : ""}
                                                            {(q.questionType === "Checkboxes") ? <CheckBoxEdit index={i} /> : ""}
                                                            {(q.questionType === "Linear Scale") ? <LinearScaleEdit index={i} /> : ""}
                                                            {(q.questionType === "Drop-down") ? <DropDownEdit index={i} /> : ""}

                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                                <AccordionActions>
                                                    {/* {(questions.length > 1) ? (
                                <Stack direction="row" spacing={2}>
                                    <IconButton aria-label="delete" onClick={() => { handleDeleteQuestion(i); } }>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                    <Switch checked={q.required} onChange={() => { handleRequired(i); } } />
                                </Stack>
                                ) : ""} */}
                                                    <Stack direction="row" spacing={2}>
                                                        {(questions.length > 1) ? (
                                                            <IconButton aria-label="delete" onClick={() => { handleDeleteQuestion(i); } }>
                                                                <DeleteOutlineIcon />
                                                            </IconButton>
                                                        ) : ""}
                                                        <Divider orientation="vertical" flexItem />
                                                        <Typography variant="body2" sx={{ mt: 1, mr: 1 }}>Required <Switch checked={q.required} onChange={() => { handleRequired(i); } } /> </Typography>
                                                    </Stack>
                                                </AccordionActions>
                                            </Accordion>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Setting</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You cannot uncheck required if the form is required all. Please turn off required all first
                </DialogContentText>
                <Paper sx={{p:4}}>
                <Box>
                    <Typography variant='h6'>Question defaults</Typography>
                    <Typography variant='h7'>Settings applied to all new questions</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 4, pt: 2}}>
                        <Box>
                            <Typography variant='h6'>Make questions required by default</Typography>
                        </Box>
                        <Box>
                            <Switch checked={rform.requiredAll} onChange={() => {handleAllRequired()}}/>
                        </Box>
                    </Box>
                </Box></Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Okay</Button>
            </DialogActions>
        </Dialog></>
    )
}

export default QuestionList;