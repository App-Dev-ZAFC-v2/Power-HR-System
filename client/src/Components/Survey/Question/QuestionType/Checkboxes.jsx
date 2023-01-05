import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { setSaving, updateForm } from "../../../../Redux/slices/form";
import { useState, useEffect } from "react";


export function CheckBoxEdit(props){
  const { index } = props;
  const rform = useSelector(state => state.forms.form);
  const saved = useSelector(state => state.forms.saved);

  const [option, setOption] = useState([]);
  const [localSave, setLocalSave] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if(rform.questions[index].options !== undefined){
      if(option !== rform.questions[index].options && localSave === true) {
        setOption(rform.questions[index].options);
      }
    }
  }, [rform]);

  //auto save
  useEffect(() => {
    if(saved === "SAVING" && localSave === false || saved === "FAILED" && localSave === false){
      const getData = setTimeout(() => {
        var tempForm = JSON.parse(JSON.stringify(rform));
        tempForm.questions[index].options = option;
        dispatch(updateForm(tempForm));
        if(saved !== "FAILED")
            setLocalSave(true);
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [option, saved]);

  function handleOptionText(value, j) {
    if(saved === "SAVED"){
        dispatch(setSaving());
    }
    var temp = JSON.parse(JSON.stringify(option));
    temp[j].optionText = value;
    setOption(temp);
    setLocalSave(false);
  }

  function handleOptionDelete(j) {
    if(saved === "SAVED"){
      dispatch(setSaving());
    }

    var temp = JSON.parse(JSON.stringify(option));
    temp.splice(j, 1);
    setOption(temp);

    setLocalSave(false);
    // let i = index;
    // dispatch(deleteOption({ i, j }));
  }

  function handleOptionAdd() {
    if(saved === "SAVED"){
      dispatch(setSaving());
    }

    var temp = JSON.parse(JSON.stringify(option));
    temp.push({
      optionText: "Option " + (option.length + 1),
      optionImage: "",
    });

    setOption(temp);

    setLocalSave(false);


    // let i = index;
    // let j = option.length - 1;
    // dispatch(addOption({ i, j }));
  }
    
    return(
        <div style={{ width: '100%' }}>
            {option?.map((op, j) => (
                <div key={j}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px' }}>
                        <Checkbox disabled />
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
                <Checkbox disabled />
                <Button size="small" style={{ textTransform: 'none', marginLeft: "-5px" }} onClick={() => {handleOptionAdd()}}>
                    Add Option
                </Button>
            </div>
        </div>)
}

export function CheckBox(props){
    const {index, disable} = props;
    const question = useSelector(state => state.forms.form.questions[index]);
    const option = useSelector(state => state.forms.form.questions[index].options);

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '15px', paddingBottom: '15px', width: "100%"}}>
            <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{question?.questionText}</Typography>
            {(question.questionImage !== "") ? (
                <div>
                    <img src={question.questionImage} width="400px" height="auto" /><br></br><br></br>
                </div>
            ) : ""}
            <FormControl sx={{mt: "6px"}}>
                    {option?.map((op, i) => (
                        <FormControlLabel disabled={disable} value={op._id} control={<Checkbox style={{ marginRight: '3px', }} />} label={<Typography style={{ color: '#000000' }}>
                            {op.optionText}
                        </Typography>} />
                    ))}
            </FormControl>
        </div>
    )
}


