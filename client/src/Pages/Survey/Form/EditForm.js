import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../Components/Navbar';
import FormAPI from '../../../API/form';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, LinearProgress, MenuItem, Paper, Radio, Select, Stack, TextField, Typography  } from '@mui/material';
import { Container } from '@mui/system';
import FormBar from '../../../Components/Survey/FormBar';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import Question from '../../../Components/Survey/Question';


function EditForm(){
    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState([])
    const [form, setForm] = useState([]);
    const [loadingForm, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(()=>{
        FormAPI.getFormByID(id)
        .then((data) => {
            if(data.questions !== undefined){
                if (data.questions.length === 0){
                    setQuestions([{
                        questionText: "Untitled Question",
                        questionType: "Multiple Choice",
                        questionImage: "",
                        required: false,
                        options: [{optionText: "Option 1", optionImage: ""}]
                    }])
                    setOpen([true]);
                } else {
                    setQuestions(data.questions)
                }
            }
            setForm(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })

    }, [])

    

    function onDragEnd(result) {
        if (!result.destination) {
          return;
        }
        var tempOneQuestion = [...questions];
      
        const tempQuestions = reorder(
            tempOneQuestion,
            result.source.index,
            result.destination.index
        );
      
        setQuestions(tempQuestions);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    function handleExpand(i){
        var tempOpen = [...open];
        for (let j = 0; j < tempOpen.length; j++) {
            if(i === j ){
                tempOpen[j] = true;
            }else{
                tempOpen[j] = false;
            }
        }
         setOpen(tempOpen);
      }

    function handleQuestionValue(qtext, i){
        var tempQuestion = [...questions];
        tempQuestion[i].questionText = qtext;
        setQuestions(tempQuestion);
    }

    function handleOptionValue(otext,i, j){
        var tempQuestion = [...questions];
        tempQuestion[i].options[j].optionText = otext;
        setQuestions(tempQuestion);
    }

    function removeOption(i, j){
        var tempQuestion = [...questions];
        if(tempQuestion[i].options.length > 1){
            tempQuestion[i].options.splice(j, 1);
          setQuestions(tempQuestion)
        }   
    }

    function addOption(i){
        var tempQuestion = [...questions];
        tempQuestion[i].options.push({optionText: "Option " + (tempQuestion[i].options.length + 1)});
        setQuestions(tempQuestion);
    }

    function addMoreQuestionField(){
        var tempQuestion = [...questions];
        var tempOpen = [...open];

        for (let j = 0; j < tempOpen.length; j++) {  
            tempOpen[j] = false;
        }

        tempQuestion.push({
            questionText: "Untitled Question",
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}]
        })
        tempOpen.push(true);
        setQuestions(tempQuestion);
        setOpen(tempOpen);
    }

    function deleteQuestion(i){
        let tempQuestions = [...questions];
        let tempOpen = [...open];
        if(questions.length > 1){
            tempQuestions.splice(i, 1);
            tempOpen.splice(i,1);
        }
        tempOpen[i-1] = true;
        setQuestions(tempQuestions)
        setOpen(tempOpen);
      }


    function question(){
        return questions.map((q, i) => (
            <Draggable key={i} draggableId={i + 'id'} index={i}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div>
                            <div style={{marginBottom: "15px"}}>
                                <div style={{width:'100%', marginBottom: '-10px' }}>
                                    <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2'}} fontSize="small"/>
                                </div>
                                <Accordion onChange={()=>{handleExpand(i)}} expanded={open[i]}>
                                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{width:'100%'}}>
                                        { !open[i]? (
                                            <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', paddingTop: '15px', paddingBottom: '15px'}}>
                                                <Typography variant="subtitle1" style={{marginLeft: '0px'}}>{q.questionText}</Typography>
                                                {q.questionImage !==""?(
                                                    <div>
                                                        <img src={q.questionImage} width="400px" height="auto" /><br></br><br></br>
                                                    </div>
                                                ): "" }

                                                { q.options.map((op, j)=>(
                                                    <div key={j}>
                                                        <div style={{display: 'flex'}}>
                                                            <FormControlLabel disabled control={<Radio style={{marginRight: '3px', }} />} label={
                                                                <Typography style={{color: '#555555'}}>
                                                                    {op.optionText}
                                                                </Typography>
                                                            } />
                                                        </div>

                                                        <div>
                                                            {op.optionImage !==""?(
                                                                <img src={op.optionImage} width="160px" height="auto" />
                                                            ): "" }
                                                        </div>
                                                    </div>
                                                ))} 
                                            </div>
                                        ): ""}
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginTop:'-15px'}}>
                                            <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                                                <TextField 
                                                        fullWidth={true} 
                                                        placeholder="Question Text" 
                                                        rowsMax={20}
                                                        multiline={true}
                                                        value={q.questionText}
                                                        variant="filled"
                                                        sx={{m: 1}}
                                                    onChange={(e)=>{handleQuestionValue(e.target.value, i)}}
                                                />
                                                <FormControl sx={{ m: 1, minWidth: 230 }} >
                                                    <Select value={q.questionType} displayEmpty inputProps={{ 'aria-label': 'Without label' }} >
                                                        <MenuItem sx={{pt:"16.5px", pb:"16.5px" }} value={"Short Answer"}> <ShortTextIcon sx={{mr: "6px"}}/> Short answer</MenuItem>
                                                        <MenuItem sx={{pt:"16.5px", pb:"16.5px" }} value={"Paragraph"}> <SubjectIcon sx={{mr: "6px"}}/> Paragraph</MenuItem>
                                                        <Divider sx={{ borderBottomWidth: 2, bgcolor: "black"}}/>
                                                        <MenuItem sx={{pt:"16.5px", pb:"16.5px" }} value={"Multiple Choice"}> <RadioButtonCheckedIcon sx={{mr: "6px"}}/> Multiple choice</MenuItem>
                                                        <MenuItem sx={{pt:"16.5px", pb:"16.5px" }} value={"Checkboxes"}> <CheckBoxIcon sx={{mr: "6px"}}/> Checkboxes</MenuItem>
                                                        <MenuItem sx={{pt:"16.5px", pb:"16.5px" }} value={"Drop-down"}> <ArrowDropDownCircleIcon sx={{mr: "6px"}}/> Drop-down</MenuItem>
                                                        <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }}/>
                                                        <MenuItem sx={{pt:"16.5px", pb:"16.5px" }} value={"Linear Scale"}> <LinearScaleIcon sx={{mr: "6px"}}/> Linear scale</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div style={{width: '100%'}}>
                                                {q.options.map((op, j) => (
                                                    <div key={j}>
                                                        <div  style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px'}}>
                                                            <Radio disabled />
                                                            <TextField 
                                                                fullWidth={true} 
                                                                placeholder="Option text" 
                                                                value={op.optionText}
                                                                onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                                                            />
                                                            {(q.options.length > 1)? (
                                                                <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}} sx={{ml:"12px"}}>
                                                                    <CloseIcon sx={{m:"6px"}}/>
                                                                </IconButton>)
                                                            : ""}
                                                        </div>

                                                        
                                                    </div>
                                                ))}
                                                <div style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', paddingTop: '5px', paddingBottom: '5px'}}>
                                                    <Radio disabled />
                                                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none', marginLeft:"-5px"}}>
                                                        Add Option
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                    <AccordionActions>
                                        {(questions.length > 1)? (
                                            <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                                                <DeleteOutlineIcon />
                                            </IconButton>): ""}               
                                    </AccordionActions>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        ))
    }

    return(
        <><Navbar/><Container>
            <Grid container direction="column" justify="center" alignItems="center" sx={{ mt: 5 }}>
                {loadingForm ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : ""}
                <Grid item xs={12} sm={5} sx={{ width: '100%' }}>
                    <FormBar dataform ={form}/>

                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {question()}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div>                       
                        <Button
                          variant="contained"
                          onClick={addMoreQuestionField}
                          endIcon={<AddCircleIcon />}
                          style={{margin: '5px'}}
                        >Add Question </Button>

                    </div>
                </Grid>
            </Grid>
        </Container></>
    )
}

export default EditForm;