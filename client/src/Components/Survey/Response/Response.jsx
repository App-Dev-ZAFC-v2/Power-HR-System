import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResponseByFormID } from "../../../Redux/slices/response";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { MultipleChoice } from "../Question/QuestionType/MultipleChoice";
import ShortAnswer from "../Question/QuestionType/ShortAnswer";
import Paragraph from "../Question/QuestionType/Paragraph";
import { CheckBox } from "../Question/QuestionType/Checkboxes";
import { DropDown } from "../Question/QuestionType/DropDown";
import { LinearScale } from "../Question/QuestionType/LinearScale";
import OneResponse from "./OneResponse";




function Response(){
    const { id } = useParams();
    const response = useSelector(state => state.responses.feedback);
    const form = useSelector((state) => state.forms.form);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.responses.loading);

    useEffect(() => {
        dispatch(getResponseByFormID(id))
    }, [dispatch, id])

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
      };

    return (
        <>{response.length === 0 ? <Typography variant="h6" sx={{ textAlign: "center", mt: "12px" }}>No responses yet</Typography> : 
            <><Box sx={{ width: "100%", display: "flex", justifyContent: 'center', mt: "12px" }}>
                <Pagination page={page} onChange={handleChange} count={response.length} variant="outlined" showFirstButton showLastButton shape="rounded" />
            </Box><Container maxWidth="md" sx={{ my: 4 }}>
                    <Grid
                        m={2}
                        p={2}
                        sx={{ borderTop: "10px solid black", borderRadius: 2, boxShadow: 12 }}
                    >
                        <Typography variant="caption">Responses cannot be edited</Typography>
                        <Typography variant="h4">{form?.name}</Typography>
                        <Typography variant="body" gutterBottom>
                            {form?.description}
                        </Typography>
                    </Grid>

                    {loading ? "" : <OneResponse index={page - 1} />}


                </Container></>
            }
        </>
    )
}

export default Response;