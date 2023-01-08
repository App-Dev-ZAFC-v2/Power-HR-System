import { Container, Grid, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { MultipleChoice } from "./QuestionType/MultipleChoice";
import ShortAnswer from "./QuestionType/ShortAnswer";
import Paragraph from "./QuestionType/Paragraph";
import { CheckBox } from "./QuestionType/Checkboxes";
import { DropDown } from "./QuestionType/DropDown";
import { LinearScale } from "./QuestionType/LinearScale";


function QuestionPageReview(){
    const form = useSelector((state) => state.forms.form);
    const questions = useSelector((state) => state.forms.form.questions);

    return(
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Grid
            m={2}
            p={2}
            sx={{
                borderTop: "10px solid black",
                borderRadius: 2,
                boxShadow: 12,
            }}
            >
            <Typography variant="h4">{form?.name}</Typography>
            <Typography variant="body" gutterBottom>
                {form?.description}
            </Typography>
            </Grid>
            {/* map the questions here */}
            {questions?.map((q, i) => {
            return (
                <Grid
                m={2}
                p={2}
                sx={{
                    borderRadius: 2,
                    boxShadow: 12,
                }}
                >
                <>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingRight: "12px",
                    }}
                    ></div>
                    {q.questionType === "Multiple Choice" ? (
                    <MultipleChoice index={i} />
                    ) : (
                    ""
                    )}
                    {q.questionType === "Short Answer" ? (
                    <ShortAnswer index={i} />
                    ) : (
                    ""
                    )}
                    {q.questionType === "Paragraph" ? (
                    <Paragraph index={i} />
                    ) : (
                    ""
                    )}
                    {q.questionType === "Checkboxes" ? (
                    <CheckBox index={i} />
                    ) : (
                    ""
                    )}
                    {q.questionType === "Drop-down" ? (
                    <DropDown index={i} />
                    ) : (
                    ""
                    )}
                    {q.questionType === "Linear Scale" ? (
                    <LinearScale index={i} />
                    ) : (
                    ""
                    )}
                </>
                </Grid>
            );
            })}
            <Grid m={2} p={2}>
            <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
            >
                Submit
            </Button>
            <Button
                variant="contained"
                color="error"
                sx={{ mt: 2, ml: 2 }}
            >
                Clear
            </Button>
            </Grid>
        </Container>
    )
}

export default QuestionPageReview;