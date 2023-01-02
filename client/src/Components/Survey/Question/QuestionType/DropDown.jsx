import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, FormControl, IconButton, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { addOption, deleteOption, editOptionText } from "../../../../Redux/slices/form";
import { Stack } from "@mui/material";


export function DropDownEdit(props){
    const {index} = props;
    const option = useSelector(state => state.forms.form.questions[index].options);
    const dispatch = useDispatch();

    function handleOptionText(value, j){
        let i = index;
        dispatch(editOptionText({value, i, j}));
    }

    function handleOptionDelete(j){
        let i = index;
        dispatch(deleteOption({i, j}));
    }

    function handleOptionAdd(){
        let i = index;
        let j = option.length - 1;
        dispatch(addOption({i, j}));
    }
    
    return(
        <div style={{ width: '100%' }}>
            {option?.map((op, j) => (
                <div key={j}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px' }}>
                        <Paper elevation={0} component={Stack} nowrap="true" direction="column" justifyContent="center">
                            <Typography sx={{mr: 2, ml: "16px"}}>{j+1}.</Typography>
                        </Paper>
                        <TextField
                            fullWidth={true}
                            placeholder="Option text"
                            sx={{ mr: 1}}
                            value={op.optionText}
                            onChange={(e) => {handleOptionText(e.target.value, j)}}
                        />
                        {(option.length > 1) ? (
                            <IconButton aria-label="delete" sx={{ ml: "12px" }} onClick={() => {handleOptionDelete(j)}}>
                                <CloseIcon sx={{ m: "6px" }} />
                            </IconButton>)
                            : ""}
                    </div>
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', paddingTop: '5px', paddingBottom: '5px' }}>
                <Paper elevation={0} component={Stack} nowrap="true" direction="column" justifyContent="center">
                    <Typography sx={{mr: 2, ml: "16px"}}>{option.length+1}.</Typography>
                </Paper>
                <Button size="small" style={{ textTransform: 'none', marginLeft: "-5px" }} onClick={() => {handleOptionAdd()}}>
                    Add Option
                </Button>
            </div>
        </div>)
}

export function DropDown(props){
    const {index} = props;
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
            <FormControl sx={{mt: "6px", minWidth: 230 }}>
                <Select value={""} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem sx={{ pt: "16.5px", pb: "16.5px" }} value={""}> Choose </MenuItem>
                    <Divider sx={{ borderBottomWidth: 2, bgcolor: "black" }} />
                    {option?.map((op, j) => (
                        <MenuItem sx={{ pt: "16.5px", pb: "16.5px"}} key={j} value={op.optionText}>{op.optionText}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export function DropDownList(props){
    const {index} = props;
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
            <Box sx={{mt: "6px"}}>
            {option?.map((op, j) => (
                <div key={j}>
                    <div style={{ display: 'flex', marginTop: 6 }}>
                        <Typography style={{ color: '#555555' }}>
                            {j+1}. {op.optionText}
                        </Typography>
                    </div>

                    <div>
                        {(op.optionImage !== "") ? (
                            <img src={op.optionImage} width="160px" height="auto" />
                        ) : ""}
                    </div>
                </div>
            ))}
            </Box>
        </div>
    )
}
