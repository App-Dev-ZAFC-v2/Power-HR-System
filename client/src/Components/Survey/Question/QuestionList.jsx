import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteQuestion, editQuestionText, editQuestionType, editView, reorderQuestion, setSaving, updateForm } from '../../../Redux/slices/form';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Divider, FormControl, MenuItem, Select, TextField, Typography, IconButton } from '@mui/material';
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

    useEffect(() => {
        if( questions !== rform.questions && localSave === true){
            setQuestions(rform.questions);
        }
            
    }, [rform]);

    //auto save
    useEffect(() => {
        if(saved === "SAVING" && localSave === false){
            const getData = setTimeout(() => {
                var tempForm = {...rform, questions: questions};
                dispatch(updateForm(tempForm));
                setLocalSave(true);
                }, 2000)
                return () => clearTimeout(getData)
        }
    }, [questions, saved, dispatch]);


    function onDragEnd(result){
        if (!result.destination) {
            return;
        }

        if(result.destination.index === result.source.index){
            return;
        }
        dispatch(reorderQuestion(result));
    }

    function handleExpand(i){
        if(questions[i].openView === false){
            let handleOpen = JSON.parse(JSON.stringify(questions));
            for (let j = 0; j < handleOpen.length; j++) {
                if (i === j) {
                    handleOpen[j].openView = true;
                } else {
                    handleOpen[j].openView = false;
                }
            }
            setQuestions(handleOpen);
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
        if(saved === "SAVED"){
            dispatch(setSaving());
        }
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
        setQuestions(tempQuestion);
        setLocalSave(false);
    }

    function handleDeleteQuestion(i){
        dispatch(deleteQuestion(i));
    }

    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div className='droppable' {...provided.droppableProps} ref={provided.innerRef}>
                        {questions?.map((q, i) => (
                            <Draggable key={i} draggableId={i + " id"} index={i}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div style={{ marginTop: "15px" }}>
                                            <Accordion onChange={() => { handleExpand(i); } } expanded={questions[i].openView || false}>
                                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{ width: '100%' }}>
                                                    {!questions[i].openView ? (
                                                        <>
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px" }}>
                                                                <DragIndicatorIcon style={{ color: '#DAE0E2' }} fontSize="small" />
                                                            </div>
                                                            {(q.questionType === "Multiple Choice") ? <MultipleChoice index={i} disable={true}/> : ""}
                                                            {(q.questionType === "Short Answer") ? <ShortAnswer index={i} disable={true}/> : ""}
                                                            {(q.questionType === "Paragraph") ? <Paragraph index={i} disable={true}/> : ""}
                                                            {(q.questionType === "Checkboxes") ? <CheckBox index={i} disable={true}/> : ""}
                                                            {(q.questionType === "Drop-down") ? <DropDownList index={i}/> : ""}
                                                            {(q.questionType === "Linear Scale") ? <LinearScale index={i} disable={true}/> : ""}
                                                            
                                                            </>
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
                                                                    sx={{ mt: 1, mb: 1, mr: 1}}
                                                                    onChange={(e) => { handleQuestionText(e.target.value, i); } } />
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

                                                            {(q.questionType === "Multiple Choice") ? <MultipleChoiceEdit index={i}/> : ""}
                                                            {(q.questionType === "Checkboxes") ? <CheckBoxEdit index={i}/> : ""}
                                                            {(q.questionType === "Linear Scale") ? <LinearScaleEdit index={i}/> : ""}
                                                            {(q.questionType === "Drop-down") ? <DropDownEdit index={i}/> : ""}
                                                            
                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                                <AccordionActions>
                                                    {(questions.length > 1) ? (
                                                        <IconButton aria-label="delete" onClick={() => { handleDeleteQuestion(i); } }>
                                                            <DeleteOutlineIcon />
                                                        </IconButton>) : ""}
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
    )
}

export default QuestionList;