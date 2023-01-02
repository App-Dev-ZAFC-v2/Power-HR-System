import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export function MultipleChoiceEdit(props){
    const {index} = props;
    const option = useSelector(state => state.forms.form.questions[index].options);
    const dispatch = useDispatch();
    
    return(
        <div style={{ width: '100%' }}>
            {option?.map((op, j) => (
                <div key={j}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px' }}>
                        <Radio disabled />
                        <TextField
                            fullWidth={true}
                            placeholder="Option text"
                            sx={{ mr: 1}}
                            value={op.optionText}
                        />
                        {(option.length > 1) ? (
                            <IconButton aria-label="delete" sx={{ ml: "12px" }}>
                                <CloseIcon sx={{ m: "6px" }} />
                            </IconButton>)
                            : ""}
                    </div>
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', paddingTop: '5px', paddingBottom: '5px' }}>
                <Radio disabled />
                <Button size="small" style={{ textTransform: 'none', marginLeft: "-5px" }}>
                    Add Option
                </Button>
            </div>
        </div>)
}

export function MultipleChoice(props){
    const {index, disable} = props;
    const question = useSelector(state => state.forms.form.questions[index]);
    const option = useSelector(state => state.forms.form.questions[index].options);

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px', width: "100%"}}>
            <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{question.questionText}</Typography>
            {(question.questionImage !== "") ? (
                <div>
                    <img src={question.questionImage} width="400px" height="auto" /><br></br><br></br>
                </div>
            ) : ""}
            <FormControl sx={{mt: "6px"}}>
                <RadioGroup>
                    {option.map((op, i) => (
                        <FormControlLabel disabled={disable} value={op._id} control={<Radio style={{ marginRight: '3px', }} />} label={<Typography style={{ color: '#000000' }}>
                            {op.optionText}
                        </Typography>} />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    )
}
