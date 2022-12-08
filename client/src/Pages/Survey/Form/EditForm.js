import { useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../Components/Navbar';
import FormAPI from '../../../API/form';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Divider, Fab, FormControl, FormControlLabel, Grid, IconButton, LinearProgress, MenuItem, Paper, Radio, Select, TextField, Typography  } from '@mui/material';
import { Container } from '@mui/system';
import FormBar from '../../../Components/Survey/FormBar';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import SaveIcon from '@mui/icons-material/Save';
import Question from '../../../Components/Survey/Question';



function EditForm(){
    const scrollRef = useRef(null);
    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState([]);
    const [openBar, setOpenBar] = useState(true);
    const [form, setForm] = useState({});
    const [loadingForm, setLoading] = useState(true);
    const { id } = useParams();
    const [save, setSave] = useState(true);
    const [bottom, setBottom] = useState(false);
    
    var timer = null;

    const SavingState = Object.freeze({
        NOT_SAVED: 0,
        SAVING: 1,
        SAVED: 2
    })

    const [savingState, setSavingState] = useState(SavingState.SAVED);

    useEffect(()=>{
        FormAPI.getFormByID(id)
        .then((data) => {
            setQuestions(data.questions)
            var tempOpen = [...open];
            for (let i = 0; i < data.questions.length; i++) {
                tempOpen.push(false);
            }
            setOpen(tempOpen);
            setForm(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })

    }, [])

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [questions]);

    async function onDragEnd(result) {
        setBottom(false);
        if (!result.destination) {
          return;
        }
        var tempOneQuestion = [...questions];
      
        const tempQuestion = await reorder(
            tempOneQuestion,
            result.source.index,
            result.destination.index
        );

        var tempOpen = [...open];

        if((tempOpen[result.destination.index] === false && tempOpen[result.source.index] === true) || (tempOpen[result.destination.index] === true && tempOpen[result.source.index] === false)){
            var swapOpen = tempOpen[result.destination.index];
            tempOpen[result.destination.index] = tempOpen[result.source.index];
            tempOpen[result.source.index] = swapOpen;
        }
        else if((tempOpen[result.destination.index] === false && tempOpen[result.source.index] === false)){
            for(let i = 0; i < tempOpen.length; i++){
                if(tempOpen[i] === true){
                    tempOpen[i] = false;
                    tempOpen[i-1] = true;
                }
            }
        }
        
        setOpen(tempOpen);
        setQuestions(tempQuestion);
        setSave(false);
    };

     const reorder = async (list, startIndex, endIndex) => {
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
        setOpenBar(false);
    }

    function handleExpandBar(){
        var tempOpen = [...open];
        for (let j = 0; j < tempOpen.length; j++) {
            tempOpen[j] = false;
        }
        setOpen(tempOpen);
        setOpenBar(true);
    }

    function handleQuestionValue(qtext, i){
        setBottom(false);
        var tempQuestion = [...questions];
        tempQuestion[i].questionText = qtext;
        setQuestions(tempQuestion)
        setSave(false);
    }

    function handleOptionValue(otext,i, j){
        setBottom(false);
        var tempQuestion = [...questions];
        tempQuestion[i].options[j].optionText = otext;
        setQuestions(tempQuestion)
        setSave(false);
    }

    function handleNameValue(textname){
        setBottom(false);
        var tempForm = form;
        tempForm.name = textname;
        setForm(tempForm)
        setSave(false);
    }

    function handleDescriptionValue(textdescription){
        setBottom(false);
        var tempForm = form;
        tempForm.description = textdescription;
        setForm(tempForm)
        setSave(false);
    }

    function removeOption(i, j){
        setBottom(false);
        var tempQuestion = [...questions];
        if(tempQuestion[i].options.length > 1){
            tempQuestion[i].options.splice(j, 1);
            setQuestions(tempQuestion)
            setSave(false);
        }  
    }

    function addOption(i){
        setBottom(false);
        var tempQuestion = [...questions];
        tempQuestion[i].options.push({optionText: "Option " + (tempQuestion[i].options.length + 1), optionImage: ""});
        setQuestions(tempQuestion);
        setSave(false);
    }

    function addMoreQuestion(){
        var tempQuestion = [...questions];
        var tempOpen = [...open];

        for (let j = 0; j < tempOpen.length; j++) {  
            tempOpen[j] = false;
        }

        tempQuestion.push({
            questionText: "Untitled Question " + (tempQuestion.length + 1),
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}]
        })
        tempOpen.push(true);
        setOpen(tempOpen);
        setQuestions(tempQuestion);
        setSave(false);
        setBottom(true);
    }

    function deleteQuestion(i){
        setBottom(false);
        var tempQuestion = [...questions];
        var tempOpen = [...open];
        if(questions.length > 1){
            tempQuestion.splice(i, 1);
            tempOpen.splice(i,1);
        }
        if(i === 0){
            tempOpen[i] = true;
        }
        else{
            tempOpen[i-1] = true;
        }
        
        setQuestions(tempQuestion);
        setOpen(tempOpen);
        setSave(false);
    }

    function saveForm(){
        var data = {
          name: form.name,
          description: form.description,
          questions: questions
        }
        setLoading(true);
        FormAPI.updateForm(id, data)
        .then((result) => {     
             setQuestions(result.questions);
             setLoading(false);
             setSave(true);
            },
        ).catch(err => {console.log(err)});

        // clearTimeout(timer);
        // setSavingState(SavingState.NOT_SAVED);
        // timer = setTimeout(() => {
        //     setSavingState(SavingState.SAVING);
        //     FormAPI.updateForm(id, data).then((result) => {
        //         setQuestions(result.questions);
        //         setForm(result);
        //         setLoading(false);
        //         setSavingState(SavingState.SAVED);
        //     }).catch(err => {console.log(err)})
        // }, 10000);
    }

    // function saveState(){
    //     if(savingState === SavingState.SAVED){
    //         return <Typography variant='subtitle' style={{color: "green"}}>Saved</Typography>
    //     }else{
    //         return <Typography variant='subtitle' style={{color: "blue"}}>Saving...</Typography>
    //     }
    // }


    function question(){
        return questions.map((q, i) => (
            <Draggable key={i} draggableId={i + " id"} index={i}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div>
                            <div style={{marginTop: "15px"}}>
                                <Accordion onChange={()=>{handleExpand(i)}} expanded={open[i] || false}>
                                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{width:'100%'}}>
                                        { !open[i]? (
                                            <>
                                                <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px"}}>
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
                                        ): ""}
                                    </AccordionSummary>

                                    <AccordionDetails >
                                        <div style={{display: "flex"}}>
                                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "12px"}}>
                                                    <DragIndicatorIcon style={{ color: '#DAE0E2' }} fontSize="small" />
                                            </div>
                                            <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginTop:'-15px', width: '100%'}}>
                                                <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                                                    <TextField 
                                                            fullWidth={true} 
                                                            placeholder="Question Text" 
                                                            rowsmax={20}
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
        <>
            <Navbar/>
            {loadingForm ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
            <Container>
                <Grid container direction="column" justify="center" alignItems="center" sx={{ mt: 5, mb:'64px' }}>
                    <Grid item xs={12} sm={5} sx={{ width: '100%' }}>
                        <Grid sx={{ borderTop: '10px solid black', borderRadius: 2 }}>
                        <Accordion onChange={handleExpandBar} expanded={openBar || false}>
                            <AccordionSummary aria-controls="panel1a-content" id="formBar" elevation={1} style={{width:'100%'}}>
                                { !openBar? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px' }}>
                                        <Typography variant="h4" sx={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>{form.name}</Typography>
                                        <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{form.description}</Typography>
                                    </div>) : "" 
                                }
                            </AccordionSummary>

                            <AccordionDetails sx={{mt:"-48px"}}>
                                <div style={{display:'flex', width: '100%', flexWrap: "wrap"}}>
                                    <TextField onChange={(e)=>{handleNameValue(e.target.value)}} fullWidth={true} placeholder="Form Text" rowsmax={3} multiline={true} defaultValue={form.name} variant="standard" sx={{m: 1}} inputProps={{style: {fontSize: 40, fontFamily: 'sans-serif Roboto', lineHeight:"50px"}}} margin="normal"/>
                                    <TextField onChange={(e)=>{handleDescriptionValue(e.target.value)}} fullWidth={true} placeholder="Form Text" rowsmax={3} multiline={true} defaultValue={form.description} variant="standard" sx={{m: 1}} inputProps={{style: {fontFamily: 'sans-serif Roboto'}}} margin="normal"/>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    {/* <FormBar onChange={handleExpandBar}  dataform={form} opened={openBar}/> */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div className='droppable' {...provided.droppableProps} ref={provided.innerRef}>
                                    {question()}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                        {bottom? (<div ref={scrollRef}/>) : ""}
                    </Grid>
                </Grid>
                <Paper elevation={2} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
                    {loadingForm ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
                    <Box sx={{ '& > :not(style)': { m: 1 }}} display="flex" justifyContent="center" alignItems="center">
                        <Fab variant="extended" onClick={addMoreQuestion}>
                            <AddIcon sx={{ mr: 1 }} />
                            Add Question
                        </Fab>
                        <Fab variant="extended" onClick={saveForm} disabled={save && true}>
                            <SaveIcon sx={{ mr: 1 }} />
                            {loadingForm? "Saving..." : (save? "Saved" : "Save")}
                        </Fab>
                    </Box>

                </Paper>
            </Container></>
    )
}

export default EditForm;