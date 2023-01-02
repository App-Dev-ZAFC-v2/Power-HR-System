import { TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Paragraph(props){
    const {index, disable} = props;
    const question = useSelector(state => state.forms.form.questions[index]);

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px', width: "100%"}}>
            <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{question.questionText}</Typography>
            {(question.questionImage !== "") ? (
                <div>
                    <img src={question.questionImage} width="400px" height="auto" /><br></br><br></br>
                </div>
            ) : ""}
            <div style={{width: "100%", paddingRight: 12, marginTop: 6}}>
                <TextField variant='standard' value={disable? "Long answer text" : "Your answer"} fullWidth disabled={disable}/>
            </div>
        </div>
    )
}

export default Paragraph;