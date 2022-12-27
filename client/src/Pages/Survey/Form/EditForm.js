import { useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../Components/Navbar';
import FormAPI from '../../../API/form';
import { Accordion, AccordionDetails, AccordionSummary, Box, Fab, Grid, LinearProgress, Paper, TextField, Typography  } from '@mui/material';
import { Container } from '@mui/system';
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import QuestionCard from '../../../Components/Survey/Question/QuestionCard';


function EditForm(){
    const scrollRef = useRef(null);
    const [questions, setQuestions] = useState([]);
    // const [openBar, setOpenBar] = useState(true);
    const [form, setForm] = useState({});
    const [loadingForm, setLoading] = useState(true);
    const { id } = useParams();
    const [save, setSave] = useState(true);

    useEffect(()=>{
        FormAPI.getFormByID(id)
        .then((data) => {
            data.questions[0].openView = true;
            for(let i = 1; i < data.questions.length; i++){
                data.questions[i].openView = false;
            }
            setQuestions(data.questions)
            setForm(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })

    }, [])

    useEffect(()=>{
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [questions.length])


    function handleSave(){
        setSave(false);
    }

    async function onDragEnd(result) {
        if (!result.destination) {
          return;
        }
        var tempOneQuestion = [...questions];
      
        const tempQuestion = await reorder(
            tempOneQuestion,
            result.source.index,
            result.destination.index
        );

        setQuestions(tempQuestion);
        setSave(false);
    };

     const reorder = async (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    function handleNameValue(textname){
        var tempForm = form;
        tempForm.name = textname;
        setForm(tempForm)
        setSave(false);
    }

    function handleDescriptionValue(textdescription){
        var tempForm = form;
        tempForm.description = textdescription;
        setForm(tempForm)
        setSave(false);
    }

    function addMoreQuestion(){
        var tempQuestion = [...questions];

        for(let i = 0; i < tempQuestion.length; i++){
            tempQuestion[i].openView = false;
        }

        tempQuestion.push({
            questionText: "Untitled Question " + (tempQuestion.length + 1),
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}],
            openView: true,
        })

        setQuestions(tempQuestion);
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

    }

    function deleteQuestion(i){
        var tempQuestion = [...questions];
        if(questions.length > 1){
            tempQuestion.splice(i, 1);
        }
        if(i === 0){
            tempQuestion[i].openView = true;
        }
        else{
            tempQuestion[i-1].openView = true;
        }
        
        setQuestions(tempQuestion);
        handleSave();
    }

    return(
        <>
            <Navbar/>
            {loadingForm ? (<Box sx={{ width: '100%' }}> <LinearProgress color="secondary" /></Box>) : <Box sx={{ width: '100%', height: '4px' }}></Box>}
            <Container>
                <Grid container direction="column" justify="center" alignItems="center" sx={{ mt: 5, mb:'64px' }}>
                    <Grid item xs={12} sm={5} sx={{ width: '75%' }}>
                        <Grid sx={{ borderTop: '10px solid black', borderRadius: 2 }}>
                        <Accordion expanded={true}>
                            <AccordionSummary aria-controls="panel1a-content" id="formBar" elevation={1} style={{width:'100%'}}>
                                {/* { !openBar? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px' }}>
                                        <Typography variant="h4" sx={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>{form.name}</Typography>
                                        <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{form.description}</Typography>
                                    </div>) : "" 
                                } */}
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
                                    {/* {question()} */}
                                    <QuestionCard key={form._id} dataquestions={questions} onChangeSave={handleSave} delete={deleteQuestion}/>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    </Grid>
                </Grid>
                <div style={{paddingBottom:120}} />
                <div ref={scrollRef}/>
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