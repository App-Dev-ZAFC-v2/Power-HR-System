import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CheckBoxResponse, DropDownResponse, LinearScaleResponse, MultipleChoiceResponse, ParagraphResponse, ShortAnswerResponse } from "./QuestionType";

function OneResponse(prop){
    const {index} = prop;
    const [listResponse, setListResponse] = useState([]);
    const [load, setLoad] = useState(true);

    const response = useSelector(state => state.responses.feedback[index]?.response);
    const questions = useSelector((state) => state.forms.form.questions);

    useEffect(() => {
        //check if response array  is in the form questions array based on question id
        //if yes, push to response to listResponse
        var temp = [];
        if(response){
            response?.forEach((res) => {
                questions?.forEach((q) => {
                    if(res.questionID === q._id){
                        temp.push({response: res, question: q})
                    }
                })
            })
        }
        setListResponse(temp)
        setLoad(false)
    },[index])
        


    return load? "" : (listResponse.map((item, index) => {
            return(
                <Grid m={2} p={2} sx={{borderRadius: 2, boxShadow: 12}}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",paddingRight: "12px"}}></div>
                        <div key={index}>
                            {item.question.questionType === "Multiple Choice" ? <MultipleChoiceResponse  response={item.response} question={item.question} /> : ""}
                            {item.question.questionType === "Short Answer" ? <ShortAnswerResponse response={item.response} question={item.question} /> : ""}
                            {item.question.questionType === "Paragraph" ? <ParagraphResponse response={item.response} question={item.question} /> : ""}
                            {item.question.questionType === "Checkboxes" ? <CheckBoxResponse response={item.response} question={item.question} /> : ""}
                            {item.question.questionType === "Drop-down" ? <DropDownResponse response={item.response} question={item.question} /> : ""}
                            {item.question.questionType === "Linear Scale" ? <LinearScaleResponse response={item.response} question={item.question} /> : ""}
                        </div>
                </Grid>
            )
        }))
};

export default OneResponse;