import { FormControl, FormControlLabel, Grid, MenuItem, Paper, Radio, Select, Stack, TextField, Typography } from '@mui/material';
import { editOptionScale, editOptionText } from "../../../../Redux/slices/form";
import { useDispatch, useSelector } from 'react-redux';

export function LinearScaleEdit(props){
    const {index} = props;
    const option = useSelector(state => state.forms.form.questions[index].options);
    const dispatch = useDispatch();

    function handleOptionText(value, j){
        let i = index;
        dispatch(editOptionText({value, i, j}));
    }

    function handleOptionScale(value, j){
        let i = index;
        dispatch(editOptionScale({value, i, j}));
    }
    
    return(
        <div>
        <div style={{display:"flex", flexWrap: 'wrap'}}>
            <FormControl sx={{ m: 1, minWidth: 50 }} size="small" nowrap="true">
                <Select
                value={option[0]?.optionScale}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                displayEmpty
                onChange={(e) => { handleOptionScale(e.target.value, 0); } }
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <Paper elevation={0} component={Stack} nowrap="true" direction="column" justifyContent="center">
                <Typography>to</Typography>
            </Paper>
            <FormControl sx={{ m: 1, minWidth: 50 }} size="small" nowrap="true">
                <Select
                value={option[1]?.optionScale}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                displayEmpty
                onChange={(e) => { handleOptionScale(e.target.value, 1); } }
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div>
            {option?.map((op, j) => (
                <div style={{display:"flex", flexWrap: 'wrap'}}>
                    <Paper elevation={0} sx={{ml:"12px", mt:"7px"}} component={Stack} nowrap="true" direction="column" justifyContent="center">
                        <Typography width="10px">{op.optionScale}</Typography>
                    </Paper>
                    <TextField onChange={(e) => { handleOptionText(e.target.value, j); } } placeholder="Label (optional)" defaultValue={op.optionText} nowrap="true" variant="standard" sx={{ml: "24px"}} inputProps={{style: {fontFamily: 'sans-serif Roboto'}}} margin="normal"/>
                </div>
            ))}
        </div>
    </div>
    )
}

export function LinearScale(props){
    const {index, disable} = props;
    const question = useSelector(state => state.forms.form.questions[index]);
    const option = useSelector(state => state.forms.form.questions[index].options);

    const list = []
    for (let i=option[0].optionScale; i <= option[1].optionScale; i++) {
        list.push(<FormControlLabel
            value={i}
            disabled = {disable}
            control={<Radio/>}
            label={i}
            labelPlacement="top"
            style={{margin: 0}}
            sx={{
                "& .MuiFormControlLabel-label.Mui-disabled": {
                    color: "#000000",
                }
            }}
        />)
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px', width: "100%"}}>
            <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{question.questionText}</Typography>
            {(question.questionImage !== "") ? (
                <div>
                    <img src={question.questionImage} width="400px" height="auto" /><br></br><br></br>
                </div>
            ) : ""}
            <Grid wrap="nowrap" container style={{ marginTop: '12px', justifyContent: "center"}}>
                <Grid item xs sx={{mt:"34px"}}>
                    <Paper elevation={0}>
                        <Typography align="right">
                            {option[0].optionText}
                        </Typography>
                </Paper></Grid>
                <Grid item xs="auto">
                    {list}
                </Grid>
                <Grid item xs sx={{mt:"34px"}}>
                    <Paper elevation={0}>
                        <Typography>
                            {option[1].optionText}
                        </Typography>
                </Paper></Grid>
            </Grid>
        </div>
    )
}